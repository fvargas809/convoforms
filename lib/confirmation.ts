import anthropic from './anthropic'
import type { ContentBlock } from '@anthropic-ai/sdk/resources'

type ConfirmationResult =
  | { confirmed: true; fieldId: string }
  | { confirmed: false; fieldId: string; correction?: string }

export async function checkConfirmation(
  fieldId: string,
  proposedValue: unknown,
  userReply: string
): Promise<ConfirmationResult> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    system: `You are checking whether a user confirmed, denied, or corrected a proposed value.

You will be given the field, the value that was proposed to them, and the user's reply.

Call confirm if they agreed.
Call deny if they disagreed or corrected, and include their correction text if given.`,
    tools: [
      {
        name: 'confirm',
        input_schema: {
          type: 'object',
          properties: { field_id: { type: 'string' } },
          required: ['field_id'],
        },
      },
      {
        name: 'deny',
        input_schema: {
          type: 'object',
          properties: {
            field_id: { type: 'string' },
            correction: { type: 'string' },
          },
          required: ['field_id'],
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Field: ${fieldId}
Proposed value: ${JSON.stringify(proposedValue)}
User reply: "${userReply}"`,
      },
    ],
  })

  const toolUse = response.content.find((block: ContentBlock) => block.type === 'tool_use')

  if (!toolUse || toolUse.type !== 'tool_use') {
    return { confirmed: false, fieldId }
  }

  if (toolUse.name === 'confirm') {
    return { confirmed: true, fieldId }
  }

  const input = toolUse.input as { field_id: string; correction?: string }
  return { confirmed: false, fieldId, correction: input.correction }
}