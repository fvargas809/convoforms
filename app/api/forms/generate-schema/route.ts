import { NextRequest, NextResponse } from 'next/server'
import { generateSchemaFromDescription } from '@/lib/schemaGenerator'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const description: string = body.description

  if (!description || description.trim().length < 10) {
    return NextResponse.json({ error: 'Please provide a more detailed description' }, { status: 400 })
  }

  try {
    const schema = await generateSchemaFromDescription(description)
    return NextResponse.json({ schema })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Schema generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}