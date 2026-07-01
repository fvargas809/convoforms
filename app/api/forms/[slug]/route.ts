import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await req.json()
  const { name, schema, status } = body

  const form = await prisma.conversationalForm.update({
    where: { slug },
    data: {
      ...(name !== undefined && { name }),
      ...(schema !== undefined && { schema }),
      ...(status !== undefined && { status }),
    },
  })

  return NextResponse.json({ form })
}

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

  return NextResponse.json({ form })
}