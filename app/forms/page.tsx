'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type FormSummary = {
  id: string
  name: string
  slug: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  createdAt: string
  _count: { sessions: number }
}

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
  DRAFT: 'bg-[#FAFAF9] text-[#71717A] border-[#E4E4E7]',
  ARCHIVED: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
}

export default function FormsListPage() {
  const [forms, setForms] = useState<FormSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/forms')
      .then((res) => res.json())
      .then((data) => setForms(data.forms))
      .finally(() => setIsLoading(false))
  }, [])

  function copyLink(slug: string) {
    const url = `${window.location.origin}/f/${slug}`
    navigator.clipboard.writeText(url)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 1500)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-2">
              Your forms
            </p>
            <h1 className="text-3xl font-semibold text-[#18181B]">Conversations in progress</h1>
          </div>
          <Link
            href="/forms/new"
            className="inline-flex items-center gap-2 rounded-full bg-[#18181B] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors shrink-0"
          >
            New form
          </Link>
        </div>

        {isLoading && <p className="text-sm text-[#71717A]">Loading…</p>}

        {!isLoading && forms.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#E4E4E7] p-12 text-center">
            <p className="text-[#18181B] font-medium mb-1">No forms yet</p>
            <p className="text-sm text-[#71717A] mb-6">
              Describe what you need to know, and let the agent ask the questions.
            </p>
            <Link
              href="/forms/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#6D28D9] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
            >
              Create your first form
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {forms.map((form) => (
            <div
              key={form.id}
              className="rounded-2xl border border-[#E4E4E7] bg-white p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-medium text-[#18181B] truncate">{form.name}</h2>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 border shrink-0 ${STATUS_STYLES[form.status]}`}
                  >
                    {form.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-[#71717A] truncate">/f/{form.slug}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {form._count.sessions} response{form._count.sessions !== 1 ? 's' : ''}
                </span>
                
                <button
                    onClick={() => copyLink(form.slug)}
                    className="font-mono text-xs rounded-full border border-[#E4E4E7] px-3 py-1.5 text-[#3F3F46] hover:bg-[#F4F4F5] transition-colors"
                    >
                    {copiedSlug === form.slug ? 'copied' : 'copy link'}
                    </button>
                    <Link
                    href={`/forms/${form.slug}/responses`}
                    className="font-mono text-xs rounded-full border border-[#E4E4E7] px-3 py-1.5 text-[#3F3F46] hover:bg-[#F4F4F5] transition-colors"
                    >
                    responses
                    </Link>
                    <Link
                    href={`/f/${form.slug}`}
                    className="font-mono text-xs rounded-full bg-[#18181B] text-white px-3 py-1.5 hover:bg-[#27272A] transition-colors"
                    >
                    open
                    </Link>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}