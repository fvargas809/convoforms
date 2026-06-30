import anthropic from './anthropic'
import type { ContentBlock } from '@anthropic-ai/sdk/resources'

export type GeneratedField = {
  id: string
  type: 'short_text' | 'long_text' | 'email' | 'phone' | 'number' | 'single_choice' | 'multi_choice' | 'date' | 'boolean'
  label: string
  description: string
  options?: string[]
  required: boolean
}

export type GeneratedRule = {
  if: { field: string; equals: unknown }
  then: { ask: string }
}

export type GeneratedSchema = {
  formName: string
  fields: GeneratedField[]
  rules: GeneratedRule[]
}

export async function generateSchemaFromDescription(description: string): Promise<GeneratedSchema> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: `You convert a plain-language description of a form into a structured JSON schema.

Allowed field types only: short_text, long_text, email, phone, number, single_choice, multi_choice, date, boolean.

Rules for generating fields:
- Each field needs a unique snake_case id derived from its meaning, a short label, and a one-sentence description written as an instruction for an AI agent asking about it conversationally.
- Use single_choice when the description implies a fixed set of options (e.g. "team size as small/medium/large/enterprise"). Extract the literal options given.
- Use boolean only for clear yes/no fields.
- - Mark a field required unless the description explicitly says it's optional, OR the field is only asked about conditionally via a rule (i.e. it appears as a "then.ask" target in your rules array). Conditionally-asked fields must always be marked required: false at the field level, since they are not required for every user, only for those matching the rule's condition.
- If the description implies conditional logic (e.g. "if enterprise, also ask about budget"), add a rule object instead of guessing, only add rules that are explicitly implied.
- Do not invent fields the description didn't ask for.
- formName should be a short, human-readable title for the form, inferred from context if not stated.

Call submit_schema with the result. Do not include any other text in your response.`,
    tools: [
      {
        name: 'submit_schema',
        input_schema: {
          type: 'object',
          properties: {
            formName: { type: 'string' },
            fields: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  type: {
                    type: 'string',
                    enum: ['short_text', 'long_text', 'email', 'phone', 'number', 'single_choice', 'multi_choice', 'date', 'boolean'],
                  },
                  label: { type: 'string' },
                  description: { type: 'string' },
                  options: { type: 'array', items: { type: 'string' } },
                  required: { type: 'boolean' },
                },
                required: ['id', 'type', 'label', 'description', 'required'],
              },
            },
            rules: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  if: {
                    type: 'object',
                    properties: { field: { type: 'string' }, equals: {} },
                    required: ['field', 'equals'],
                  },
                  then: {
                    type: 'object',
                    properties: { ask: { type: 'string' } },
                    required: ['ask'],
                  },
                },
                required: ['if', 'then'],
              },
            },
          },
          required: ['formName', 'fields', 'rules'],
        },
      },
    ],
    messages: [{ role: 'user', content: description }],
  })

  const toolUse = response.content.find((block: ContentBlock) => block.type === 'tool_use')

  if (!toolUse || toolUse.type !== 'tool_use' || toolUse.name !== 'submit_schema') {
    throw new Error('Schema generation failed, no valid schema returned')
  }

  return toolUse.input as GeneratedSchema
}