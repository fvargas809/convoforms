import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

type FormSchema = {
  formName: string
  fields: Array<{ id: string; description: string; [key: string]: unknown }>
  [key: string]: unknown
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const form = await prisma.conversationalForm.findUnique({
    where: { slug },
  })

  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  if (form.status !== 'PUBLISHED') {
    return NextResponse.json({ error: 'Form is not published' }, { status: 400 })
  }

  const session = await prisma.formSession.create({
    data: {
      formId: form.id,
      resumeToken: nanoid(),
    },
  })

  const schema = form.schema as unknown as FormSchema
  const openingMessage = `Hi! I'll help you with "${schema.formName}". Let's get started, ${schema.fields[0]?.description ?? 'first question'}.`

  await prisma.message.create({
    data: { sessionId: session.id, role: 'ASSISTANT', content: openingMessage },
  })

  return NextResponse.json({
    sessionId: session.id,
    resumeToken: session.resumeToken,
    message: openingMessage,
  })
}