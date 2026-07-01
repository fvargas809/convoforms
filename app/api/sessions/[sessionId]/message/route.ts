import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/app/generated/prisma'
import { extractFieldValue } from '@/lib/extraction'
import { checkConfirmation } from '@/lib/confirmation'
import { getNextMessage } from '@/lib/conversation'

const MAX_RETRIES = 4

type FieldDef = {
  id: string
  type: string
  label: string
  description: string
  options?: string[]
  required: boolean
}

type Rule = {
  if: { field: string; equals: unknown }
  then: { ask: string }
}

type FormSchema = {
  formName: string
  fields: FieldDef[]
  rules: Rule[]
}

type PendingConfirmation = {
  fieldId: string
  value: unknown
  confidence: 'low'
}

function computePendingFields(
  allFields: FieldDef[],
  rules: Rule[],
  collected: Record<string, unknown>,
  skipped: string[]
): string[] {
  const baseRequired = allFields.filter((f) => f.required).map((f) => f.id)
  const conditionallyAdded = rules
    .filter((r) => collected[r.if.field] === r.if.equals)
    .map((r) => r.then.ask)

  const allPending = [...new Set([...baseRequired, ...conditionallyAdded])]
  return allPending.filter((id) => !(id in collected) && !skipped.includes(id))
}

function validateValue(field: FieldDef, value: unknown): boolean {
  if (field.type === 'single_choice' && field.options) {
    return field.options.includes(value as string)
  }
  if (field.type === 'email') {
    return typeof value === 'string' && /\S+@\S+\.\S+/.test(value)
  }
  if (field.type === 'number') {
    return typeof value === 'number' || !isNaN(Number(value))
  }
  return value !== null && value !== undefined && value !== ''
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const body = await req.json()
  const userMessage: string = body.message

  const session = await prisma.formSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      collectedData: true,
      pendingConfirmation: true,
      retryCounts: true,
      skippedFields: true,
      needsReview: true,
      form: {
        select: {
          id: true,
          name: true,
          schema: true,
        },
      },
    },
  })

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const schema = session.form.schema as unknown as FormSchema
  const collected = { ...(session.collectedData as Record<string, unknown>) }
  let pendingConfirmation = session.pendingConfirmation as PendingConfirmation | null
  const retryCounts: Record<string, number> = { ...((session.retryCounts as Record<string, number>) || {}) }
  const skippedFields: string[] = [...session.skippedFields]
  let needsReview = session.needsReview

  function incrementRetry(fieldId: string) {
    retryCounts[fieldId] = (retryCounts[fieldId] || 0) + 1
  }

  function hasMaxedOut(fieldId: string) {
    return (retryCounts[fieldId] || 0) >= MAX_RETRIES
  }

  function handleMaxedOutField(field: FieldDef) {
  if (field.required) {
    // reset retry count so the agent keeps trying naturally
    retryCounts[field.id] = 0
    needsReview = true
  } else {
    if (!skippedFields.includes(field.id)) skippedFields.push(field.id)
  }
}

  await prisma.message.create({
    data: { sessionId, role: 'USER', content: userMessage },
  })

  if (pendingConfirmation) {
    const result = await checkConfirmation(
      pendingConfirmation.fieldId,
      pendingConfirmation.value,
      userMessage
    )

    const field = schema.fields.find((f) => f.id === pendingConfirmation!.fieldId)

    if (result.confirmed) {
      collected[pendingConfirmation.fieldId] = pendingConfirmation.value

      await prisma.fieldResult.upsert({
        where: { sessionId_fieldId: { sessionId, fieldId: pendingConfirmation.fieldId } },
        update: { finalValue: pendingConfirmation.value as Prisma.InputJsonValue, confidence: 'LOW', wasConfirmed: true },
        create: {
          sessionId,
          fieldId: pendingConfirmation.fieldId,
          finalValue: pendingConfirmation.value as Prisma.InputJsonValue,
          confidence: 'LOW',
          wasConfirmed: true,
          rawUserAnswers: [userMessage] as Prisma.InputJsonValue,
        },
      })

      pendingConfirmation = null
    } else if (result.correction && field) {
      const reExtracted = await extractFieldValue(field, 'Please clarify your answer', result.correction)

      if (reExtracted.found && validateValue(field, reExtracted.value)) {
        if (reExtracted.confidence === 'high') {
          collected[field.id] = reExtracted.value
          pendingConfirmation = null

          await prisma.fieldResult.upsert({
            where: { sessionId_fieldId: { sessionId, fieldId: field.id } },
            update: { finalValue: reExtracted.value as Prisma.InputJsonValue, confidence: 'HIGH', wasConfirmed: false },
            create: {
              sessionId,
              fieldId: field.id,
              finalValue: reExtracted.value as Prisma.InputJsonValue,
              confidence: 'HIGH',
              wasConfirmed: false,
              rawUserAnswers: [userMessage, result.correction] as Prisma.InputJsonValue,
            },
          })
        } else {
          incrementRetry(field.id)
          if (hasMaxedOut(field.id)) {
            pendingConfirmation = null
            handleMaxedOutField(field)
          } else {
            pendingConfirmation = { fieldId: field.id, value: reExtracted.value, confidence: 'low' }
          }
        }
      } else {
        incrementRetry(field.id)
        pendingConfirmation = null
        if (hasMaxedOut(field.id)) handleMaxedOutField(field)
      }
        } else if (field) {
        // denied with no usable correction text, clear confirmation and re-ask naturally
        // don't increment retry here since the user is engaged, just not correcting via text
        pendingConfirmation = null
        }
  } else {
    const lastAssistantMessage = await prisma.message.findFirst({
      where: { sessionId, role: 'ASSISTANT' },
      orderBy: { createdAt: 'desc' },
    })

    const pendingFieldsNow = computePendingFields(schema.fields, schema.rules, collected, skippedFields)
    const fieldToCheck = schema.fields.find((f) => f.id === pendingFieldsNow[0])

    if (fieldToCheck) {
      const extraction = await extractFieldValue(
        fieldToCheck,
        lastAssistantMessage?.content ?? '',
        userMessage
      )

      if (extraction.found && validateValue(fieldToCheck, extraction.value)) {
        if (extraction.confidence === 'high') {
          collected[fieldToCheck.id] = extraction.value

          await prisma.fieldResult.upsert({
            where: { sessionId_fieldId: { sessionId, fieldId: fieldToCheck.id } },
            update: { finalValue: extraction.value as Prisma.InputJsonValue, confidence: 'HIGH' },
            create: {
              sessionId,
              fieldId: fieldToCheck.id,
              finalValue: extraction.value as Prisma.InputJsonValue,
              confidence: 'HIGH',
              wasConfirmed: false,
              rawUserAnswers: [userMessage] as Prisma.InputJsonValue,
            },
          })
        } else {
          pendingConfirmation = { fieldId: fieldToCheck.id, value: extraction.value, confidence: 'low' }
        }
      } else {
        incrementRetry(fieldToCheck.id)
        if (hasMaxedOut(fieldToCheck.id)) handleMaxedOutField(fieldToCheck)
      }
    }
  }

  await prisma.formSession.update({
    where: { id: sessionId },
    data: {
      collectedData: collected as Prisma.InputJsonValue,
      pendingConfirmation: pendingConfirmation as Prisma.InputJsonValue,
      retryCounts: retryCounts as Prisma.InputJsonValue,
      skippedFields,
      needsReview,
    },
  })

  const finalPendingFields = computePendingFields(schema.fields, schema.rules, collected, skippedFields)

  const fullHistory = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  })

  const conversationHistory = fullHistory.map((m) => ({
    role: m.role.toLowerCase() as 'user' | 'assistant',
    content: m.content,
  }))

  const { reply, isComplete } = await getNextMessage(
  {
    formName: schema.formName,
    fields: schema.fields,
    rules: schema.rules,
    collected,
    pendingFields: finalPendingFields,
    pendingConfirmation,
  },
  conversationHistory
)

  await prisma.message.create({
    data: { sessionId, role: 'ASSISTANT', content: reply },
  })

  if (isComplete) {
    await prisma.formSession.update({
      where: { id: sessionId },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })
  }

  return NextResponse.json({ reply, isComplete })
}