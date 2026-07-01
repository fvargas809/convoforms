import anthropic from './anthropic'
import type { ContentBlock } from '@anthropic-ai/sdk/resources'

type FieldDef = {
  id: string
  type: string
  label: string
  description: string
  options?: string[]
}

type Rule = {
  if: { field: string; equals: unknown }
  then: { ask: string }
}

type ConversationState = {
  formName: string
  fields: FieldDef[]
  rules: Rule[]
  collected: Record<string, unknown>
  pendingFields: string[]
  pendingConfirmation: { fieldId: string; value: unknown } | null
}

type ConversationResult = {
  reply: string
  isComplete: boolean
}

export async function getNextMessage(
  state: ConversationState,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[]
): Promise<ConversationResult> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: `You are a friendly assistant collecting information for "${state.formName}".

Form fields (full schema): ${JSON.stringify(state.fields)}

Information collected so far: ${JSON.stringify(state.collected)}
Fields still needed: ${JSON.stringify(state.pendingFields)}
Pending confirmation (if any): ${JSON.stringify(state.pendingConfirmation)}
Conditional rules: ${JSON.stringify(state.rules)}

Guidelines:
- Ask about one pending field at a time, in whatever order feels conversational.
- Briefly acknowledge what the user just told you before moving to the next question.
- Never ask about a field already in "collected".
- If pendingConfirmation is set, ask the user to confirm in a natural, low-friction way before moving to other fields.
- If the last user message was vague, unclear, or a non-answer, rephrase the question a different way and give a concrete example of a good answer. Never repeat the exact same question twice.
- If you have asked the same field multiple times without success, try a completely different angle, offer examples, simplify the question, or break it into smaller parts.
- Keep messages short, 1-2 sentences, no bullet lists.
- When pendingFields is empty and there is no pendingConfirmation, write a brief closing message thanking the user, then call mark_complete.`,
    tools: [
      {
        name: 'mark_complete',
        input_schema: { type: 'object', properties: {} },
      },
    ],
    messages: conversationHistory,
  })

  const toolUse = response.content.find((block: ContentBlock) => block.type === 'tool_use')
  const textContent = response.content.find((block: ContentBlock) => block.type === 'text')

  const reply = textContent && textContent.type === 'text' ? textContent.text : ''
  const isComplete = toolUse?.type === 'tool_use' && toolUse.name === 'mark_complete'

  return { reply, isComplete }
}