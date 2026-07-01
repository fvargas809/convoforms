import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const body = await req.json()
  const { workStatus, notes } = body

  const session = await prisma.formSession.update({
    where: { id: sessionId },
    data: {
      ...(workStatus !== undefined && { workStatus }),
      ...(notes !== undefined && { notes }),
    },
  })

  return NextResponse.json({ session })
}