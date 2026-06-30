'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FieldType =
  | 'short_text'
  | 'long_text'
  | 'email'
  | 'phone'
  | 'number'
  | 'single_choice'
  | 'multi_choice'
  | 'date'
  | 'boolean'

type Field = {
  id: string
  type: FieldType
  label: string
  description: string
  options?: string[]
  required: boolean
}

type Rule = {
  if: { field: string; equals: unknown }
  then: { ask: string }
}

type Schema = {
  formName: string
  fields: Field[]
  rules: Rule[]
}

const FIELD_TYPES: FieldType[] = [
  'short_text',
  'long_text',
  'email',
  'phone',
  'number',
  'single_choice',
  'multi_choice',
  'date',
  'boolean',
]

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NewFormPage() {
  const router = useRouter()

  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [schema, setSchema] = useState<Schema | null>(null)
  const [slug, setSlug] = useState('')

  async function handleGenerate() {
    if (description.trim().length < 10) {
      setError('Describe the form in a bit more detail.')
      return
    }
    setError(null)
    setIsGenerating(true)
    try {
      const res = await fetch('/api/forms/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not generate the form')
      setSchema(data.schema)
      setSlug(slugify(data.schema.formName))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }

  function updateField(index: number, updates: Partial<Field>) {
    if (!schema) return
    const fields = [...schema.fields]
    fields[index] = { ...fields[index], ...updates }
    setSchema({ ...schema, fields })
  }

  function removeField(index: number) {
    if (!schema) return
    const fields = schema.fields.filter((_, i) => i !== index)
    setSchema({ ...schema, fields })
  }

  function isConditional(fieldId: string) {
    return schema?.rules.some((r) => r.then.ask === fieldId) ?? false
  }

  async function handleSave() {
    if (!schema || !slug.trim()) return
    setIsSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: schema.formName, slug: slug.trim(), schema }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not save the form')
      router.push('/forms')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-2">
          New form
        </p>
        <h1 className="text-3xl font-semibold text-[#18181B] mb-8">
          Describe what you need to know
        </h1>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="I need their full name, email, team size as small / medium / large / enterprise, and whether they want a demo…"
          rows={4}
          className="w-full rounded-2xl border border-[#E4E4E7] bg-white p-4 text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/30 focus:border-[#6D28D9] resize-none"
        />

        <div className="flex items-center justify-between mt-3">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#18181B] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#27272A] disabled:opacity-50 transition-colors"
          >
            {isGenerating ? 'Generating…' : 'Generate form'}
          </button>
        </div>

        {schema && (
          <div className="mt-14">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#18181B]">{schema.formName}</h2>
              <span className="font-mono text-xs text-[#71717A]">
                {schema.fields.length} field{schema.fields.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E4E4E7]" />

              <div className="space-y-4">
                {schema.fields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <div className="absolute -left-6 top-5 h-3 w-3 rounded-full bg-[#6D28D9] ring-4 ring-[#FAFAF9]" />

                    <div className="rounded-2xl rounded-tl-sm border border-[#E4E4E7] bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <input
                          value={field.label}
                          onChange={(e) => updateField(index, { label: e.target.value })}
                          className="font-medium text-[#18181B] bg-transparent focus:outline-none focus:bg-[#F4F4F5] rounded px-1 -mx-1 flex-1"
                        />
                        <button
                          onClick={() => removeField(index)}
                          className="text-[#A1A1AA] hover:text-red-500 text-xs font-mono shrink-0"
                          title="Remove field"
                        >
                          remove
                        </button>
                      </div>

                      <textarea
                        value={field.description}
                        onChange={(e) => updateField(index, { description: e.target.value })}
                        rows={1}
                        className="mt-1 w-full text-sm text-[#52525B] bg-transparent focus:outline-none focus:bg-[#F4F4F5] rounded px-1 -mx-1 resize-none"
                      />

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <select
                          value={field.type}
                          onChange={(e) => updateField(index, { type: e.target.value as FieldType })}
                          className="font-mono text-xs rounded-full border border-[#E4E4E7] bg-[#F4F4F5] px-3 py-1 text-[#3F3F46] focus:outline-none"
                        >
                          {FIELD_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => updateField(index, { required: !field.required })}
                          className={`font-mono text-xs rounded-full px-3 py-1 border transition-colors ${
                            field.required
                              ? 'bg-[#18181B] text-white border-[#18181B]'
                              : 'bg-white text-[#71717A] border-[#E4E4E7]'
                          }`}
                        >
                          {field.required ? 'required' : 'optional'}
                        </button>

                        {isConditional(field.id) && (
                          <span className="font-mono text-xs rounded-full px-3 py-1 bg-[#FAF5FF] text-[#6D28D9] border border-[#E9D5FF]">
                            conditional
                          </span>
                        )}
                      </div>

                      {(field.type === 'single_choice' || field.type === 'multi_choice') && (
                        <input
                          value={field.options?.join(', ') ?? ''}
                          onChange={(e) =>
                            updateField(index, {
                              options: e.target.value.split(',').map((o) => o.trim()).filter(Boolean),
                            })
                          }
                          placeholder="Comma-separated options"
                          className="mt-3 w-full font-mono text-xs rounded-lg border border-[#E4E4E7] px-3 py-2 text-[#3F3F46] focus:outline-none focus:border-[#6D28D9]"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[#E4E4E7] bg-white p-4">
              <label className="block font-mono text-xs text-[#71717A] mb-1.5">
                Hosted link slug
              </label>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-[#A1A1AA] font-mono">/f/</span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="font-mono text-[#18181B] bg-transparent focus:outline-none border-b border-transparent focus:border-[#6D28D9] flex-1"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || !slug.trim()}
              className="mt-6 w-full rounded-full bg-[#6D28D9] text-white px-5 py-3 text-sm font-medium hover:bg-[#5B21B6] disabled:opacity-50 transition-colors"
            >
              {isSaving ? 'Publishing…' : 'Publish form'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}