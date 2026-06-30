import anthropic from './anthropic'
import type { ContentBlock } from '@anthropic-ai/sdk/resources'

type FieldDef = {
  id: string
  type: string
  label: string
  description: string
  options?: string[]
}

type ExtractionResult =
  | { found: true; fieldId: string; value: unknown; confidence: 'high' | 'low' }
  | { found: false; fieldId: string; reason: string }

export async function extractFieldValue(
  field: FieldDef,
  questionAsked: string,
  userReply: string
): Promise<ExtractionResult> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: `You are a data extraction engine. You will be given a field definition, the question that was just asked, and the user's reply.

Your only task is to extract the value of that field from the user's reply, if present.

Rules:
- If the reply clearly answers the field, call submit_value with the parsed value and confidence "high".
- If the reply answers it ambiguously, still call submit_value with your best parse, and set confidence to "low".
- If the reply does not answer the field at all, call no_value_found with a one-line reason.
- Never invent information not present in the reply.
- For single_choice fields, only return one of the listed options, mapping loosely worded answers to the closest option.
- For number/date fields, normalize formatting.`,
    tools: [
      {
        name: 'submit_value',
        input_schema: {
          type: 'object',
          properties: {
            field_id: { type: 'string' },
            value: {},
            confidence: { type: 'string', enum: ['high', 'low'] },
          },
          required: ['field_id', 'value', 'confidence'],
        },
      },
      {
        name: 'no_value_found',
        input_schema: {
          type: 'object',
          properties: {
            field_id: { type: 'string' },
            reason: { type: 'string' },
          },
          required: ['field_id', 'reason'],
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Field: ${field.id} (${field.type})
Description: ${field.description}
${field.options ? `Options: ${field.options.join(', ')}` : ''}
Question asked: "${questionAsked}"
User reply: "${userReply}"`,
      },
    ],
  })

  const toolUse = response.content.find((block: ContentBlock) => block.type === 'tool_use')

  if (!toolUse || toolUse.type !== 'tool_use') {
    return { found: false, fieldId: field.id, reason: 'No tool call returned' }
  }

  if (toolUse.name === 'submit_value') {
    const input = toolUse.input as { field_id: string; value: unknown; confidence: 'high' | 'low' }
    return { found: true, fieldId: input.field_id, value: input.value, confidence: input.confidence }
  }

  const input = toolUse.input as { field_id: string; reason: string }
  return { found: false, fieldId: input.field_id, reason: input.reason }
}