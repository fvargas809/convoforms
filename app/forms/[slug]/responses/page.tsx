'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type SessionRow = {
  id: string
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
  collectedData: Record<string, unknown>
  skippedFields: string[]
  needsReview: boolean
  startedAt: string
  completedAt: string | null
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
  IN_PROGRESS: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  ABANDONED: 'bg-[#FAFAF9] text-[#71717A] border-[#E4E4E7]',
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function FormResponsesPage() {
  const params = useParams()
  const slug = params.slug as string

  const [formName, setFormName] = useState('')
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/forms/${slug}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        setFormName(data.form?.name ?? slug)
        setSessions(data.sessions ?? [])
      })
      .finally(() => setIsLoading(false))
  }, [slug])

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/forms"
              className="font-mono text-xs text-[#71717A] hover:text-[#18181B] transition-colors"
            >
              ← all forms
            </Link>
            <h1 className="text-3xl font-semibold text-[#18181B] mt-2">{formName}</h1>
          </div>
          <Link
            href={`/f/${slug}`}
            className="font-mono text-xs rounded-full border border-[#E4E4E7] px-4 py-2 hover:bg-white transition-colors shrink-0"
          >
            open live form →
          </Link>
        </div>

        {isLoading && <p className="text-sm text-[#71717A]">Loading…</p>}

        {!isLoading && sessions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#E4E4E7] p-12 text-center">
            <p className="text-[#18181B] font-medium mb-1">No responses yet</p>
            <p className="text-sm text-[#71717A]">
              Share the form link to start collecting answers.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl border border-[#E4E4E7] bg-white p-5"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 border ${STATUS_STYLES[session.status]}`}
                  >
                    {session.status.replace('_', ' ')}
                  </span>
                  {session.needsReview && (
                    <span className="font-mono text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 border bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]">
                      needs review
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {formatDate(session.startedAt)}
                </span>
              </div>

              {Object.keys(session.collectedData ?? {}).length === 0 ? (
                <p className="text-sm text-[#A1A1AA]">No data collected yet.</p>
              ) : (
                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {Object.entries(session.collectedData).map(([key, value]) => (
                    <div key={key} className="flex items-baseline gap-2 min-w-0">
                      <dt className="font-mono text-xs text-[#A1A1AA] shrink-0">{key}</dt>
                      <dd className="text-sm text-[#18181B] truncate">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {session.skippedFields.length > 0 && (
                <p className="font-mono text-xs text-[#A1A1AA] mt-3">
                  skipped: {session.skippedFields.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}