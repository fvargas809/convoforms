import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
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

  const sessions = await prisma.formSession.findMany({
    where: { formId: form.id },
    orderBy: { startedAt: 'desc' },
    select: {
      id: true,
      status: true,
      collectedData: true,
      skippedFields: true,
      needsReview: true,
      startedAt: true,
      completedAt: true,
    },
  })

  return NextResponse.json({ form: { name: form.name, slug: form.slug }, sessions })
}