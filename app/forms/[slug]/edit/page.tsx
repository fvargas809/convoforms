'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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
  'short_text', 'long_text', 'email', 'phone', 'number',
  'single_choice', 'multi_choice', 'date', 'boolean',
]

export default function EditFormPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [schema, setSchema] = useState<Schema | null>(null)
  const [formName, setFormName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [showRegenerate, setShowRegenerate] = useState(false)

  useEffect(() => {
    fetch(`/api/forms/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const s = data.form.schema as Schema
        setSchema(s)
        setFormName(s.formName)
      })
      .finally(() => setIsLoading(false))
  }, [slug])

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

  async function handleRegenerate() {
    if (description.trim().length < 10) return
    setIsRegenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/forms/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not generate schema')
      setSchema(data.schema)
      setFormName(data.schema.formName)
      setShowRegenerate(false)
      setDescription('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsRegenerating(false)
    }
  }

  async function handleSave() {
    if (!schema) return
    setIsSaving(true)
    setError(null)
    try {
      const updatedSchema = { ...schema, formName }
      const res = await fetch(`/api/forms/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, schema: updatedSchema }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not save changes')
      router.push('/forms')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <p className="text-sm text-[#71717A]">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/forms"
              className="font-mono text-xs text-[#71717A] hover:text-[#18181B] transition-colors"
            >
              ← all forms
            </Link>
            <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mt-3 mb-1">
              Editing
            </p>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="text-3xl font-semibold text-[#18181B] bg-transparent focus:outline-none border-b-2 border-transparent focus:border-[#6D28D9] w-full"
            />
          </div>
        </div>

        {/* Regenerate toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowRegenerate(!showRegenerate)}
            className="font-mono text-xs text-[#6D28D9] hover:underline"
          >
            {showRegenerate ? '− cancel regenerate' : '+ regenerate from description'}
          </button>

          {showRegenerate && (
            <div className="mt-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe a new version of this form…"
                rows={3}
                className="w-full rounded-2xl border border-[#E4E4E7] bg-white p-4 text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/30 focus:border-[#6D28D9] resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating || description.trim().length < 10}
                  className="font-mono text-xs rounded-full bg-[#18181B] text-white px-5 py-2.5 hover:bg-[#27272A] disabled:opacity-50 transition-colors"
                >
                  {isRegenerating ? 'Regenerating…' : 'Regenerate fields'}
                </button>
              </div>
            </div>
          )}
        </div>

        {schema && (
          <>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-base font-medium text-[#18181B]">Fields</h2>
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
                            <option key={t} value={t}>{t}</option>
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

            {error && <p className="text-sm text-red-600 mt-6">{error}</p>}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="mt-8 w-full rounded-full bg-[#6D28D9] text-white px-5 py-3 text-sm font-medium hover:bg-[#5B21B6] disabled:opacity-50 transition-colors"
            >
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}