import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const forms = await prisma.conversationalForm.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { sessions: true } },
    },
  })

  return NextResponse.json({ forms })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, slug, schema } = body

  if (!name || !slug || !schema) {
    return NextResponse.json(
      { error: 'name, slug, and schema are all required' },
      { status: 400 }
    )
  }

  const existing = await prisma.conversationalForm.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: 'That slug is already taken' }, { status: 409 })
  }

  // No multi-org auth/switching built yet, use the first organization in the database.
  // Replace this once real org accounts and auth exist.
  const org = await prisma.organization.findFirst()
  if (!org) {
    return NextResponse.json(
      { error: 'No organization exists yet, run the seed script first' },
      { status: 400 }
    )
  }

  const form = await prisma.conversationalForm.create({
    data: {
      orgId: org.id,
      name,
      slug,
      schema,
      status: 'PUBLISHED',
    },
  })

  return NextResponse.json({ form })
}