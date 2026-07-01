'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type WorkStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED'

type SessionRow = {
  id: string
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
  workStatus: WorkStatus
  notes: string | null
  collectedData: Record<string, unknown>
  skippedFields: string[]
  needsReview: boolean
  startedAt: string
  completedAt: string | null
}

const WORK_STATUS_STYLES: Record<WorkStatus, string> = {
  NEW: 'bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE]',
  IN_PROGRESS: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  COMPLETED: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
}

const WORK_STATUS_LABELS: Record<WorkStatus, string> = {
  NEW: 'New',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function shortId(id: string) {
  return id.slice(-8)
}

function getKeyInfo(data: Record<string, unknown>): string {
  return Object.entries(data)
    .slice(0, 2)
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join(' · ')
}

function downloadJSON(sessions: SessionRow[], formName: string) {
  const data = sessions.map((s) => ({
    id: s.id,
    submittedAt: s.startedAt,
    workStatus: s.workStatus,
    notes: s.notes,
    ...s.collectedData,
  }))
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${formName}-responses.json`
  a.click()
  URL.revokeObjectURL(url)
}

function downloadCSV(sessions: SessionRow[], formName: string) {
  if (sessions.length === 0) return
  const allKeys = Array.from(
    new Set(sessions.flatMap((s) => Object.keys(s.collectedData)))
  )
  const headers = ['id', 'submittedAt', 'workStatus', 'notes', ...allKeys]
  const rows = sessions.map((s) => [
    s.id,
    s.startedAt,
    s.workStatus,
    s.notes ?? '',
    ...allKeys.map((k) => String(s.collectedData[k] ?? '')),
  ])
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${formName}-responses.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function FormResponsesPage() {
  const params = useParams()
  const slug = params.slug as string

  const [formName, setFormName] = useState('')
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<WorkStatus | null>(null)

  const totalNew = sessions.filter((s) => (s.workStatus ?? 'NEW') === 'NEW').length
  const totalInProgress = sessions.filter((s) => s.workStatus === 'IN_PROGRESS').length
  const totalCompleted = sessions.filter((s) => s.workStatus === 'COMPLETED').length

  useEffect(() => {
    fetch(`/api/forms/${slug}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        setFormName(data.form?.name ?? slug)
        setSessions(data.sessions ?? [])
      })
      .finally(() => setIsLoading(false))
  }, [slug])

  async function updateSession(
    sessionId: string,
    updates: Partial<{ workStatus: WorkStatus; notes: string }>
  ) {
    setSavingId(sessionId)
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) return
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, ...updates } : s))
      )
    } finally {
      setSavingId(null)
    }
  }

  function handleNotesBlur(sessionId: string) {
    const notes = editingNotes[sessionId]
    if (notes !== undefined) {
      updateSession(sessionId, { notes })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link
              href="/forms"
              className="font-mono text-xs text-[#71717A] hover:text-[#18181B] transition-colors"
            >
              ← all forms
            </Link>
            <h1 className="text-3xl font-semibold text-[#18181B] mt-2">{formName}</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {sessions.length > 0 && (
              <>
                <button
                  onClick={() => downloadJSON(sessions, formName)}
                  className="font-mono text-xs rounded-full border border-[#E4E4E7] px-4 py-2 text-[#3F3F46] hover:bg-[#F4F4F5] transition-colors"
                >
                  ↓ JSON
                </button>
                <button
                  onClick={() => downloadCSV(sessions, formName)}
                  className="font-mono text-xs rounded-full border border-[#E4E4E7] px-4 py-2 text-[#3F3F46] hover:bg-[#F4F4F5] transition-colors"
                >
                  ↓ CSV
                </button>
              </>
            )}
            <Link
              href={`/f/${slug}`}
              className="font-mono text-xs rounded-full bg-[#6D28D9] text-white px-4 py-2 hover:bg-[#5B21B6] transition-colors"
            >
              open live form →
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total', value: sessions.length, color: '#18181B', filter: null },
            { label: 'New', value: totalNew, color: '#4338CA', filter: 'NEW' as WorkStatus },
            { label: 'In progress', value: totalInProgress, color: '#B45309', filter: 'IN_PROGRESS' as WorkStatus },
            { label: 'Completed', value: totalCompleted, color: '#16A34A', filter: 'COMPLETED' as WorkStatus },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setActiveFilter(activeFilter === stat.filter ? null : stat.filter)}
              className={`text-center bg-white rounded-2xl border px-5 py-4 transition-colors ${
                activeFilter === stat.filter
                  ? 'border-[#6D28D9] ring-2 ring-[#6D28D9]/20'
                  : 'border-[#E4E4E7] hover:border-[#6D28D9]/40'
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-wide text-[#52525B] mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-semibold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </button>
          ))}
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

        {/* Table */}
        {sessions.length > 0 && (() => {
          const filteredSessions = activeFilter
            ? sessions.filter((s) => (s.workStatus ?? 'NEW') === activeFilter)
            : sessions

          return (
          <div className="bg-white rounded-2xl border border-[#E4E4E7] overflow-hidden">

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[100px_1fr_1fr_130px_120px_80px] gap-0 px-5 py-3 border-b border-[#E4E4E7]">
              {['ID', 'Name / Email', 'Key info', 'Submitted', 'Work status', ''].map((h) => (
                <span key={h} className="font-mono text-[10px] uppercase tracking-wide text-[#A1A1AA]">
                  {h}
                </span>
              ))}
            </div>

            {filteredSessions.map((session) => {
              const isExpanded = expandedId === session.id
              const currentNotes = editingNotes[session.id] ?? session.notes ?? ''
              const workStatus = session.workStatus ?? 'NEW'
              const name = String(session.collectedData?.full_name ?? session.collectedData?.name ?? '')
              const email = String(session.collectedData?.email ?? '')

              return (
                <div key={session.id} className="border-b border-[#E4E4E7] last:border-b-0">

                  {/* Row */}
                  <div
                    className="grid grid-cols-1 sm:grid-cols-[100px_1fr_1fr_130px_120px_80px] gap-2 sm:gap-0 px-5 py-4 cursor-pointer hover:bg-[#FAFAF9] transition-colors items-start"
                    onClick={() => setExpandedId(isExpanded ? null : session.id)}
                  >
                    <div className="font-mono text-[11px] text-[#71717A] break-all">
                      {shortId(session.id)}
                    </div>
                    <div>
                      {name && (
                        <p className="text-sm font-medium text-[#18181B]">{name}</p>
                      )}
                      {email && (
                        <p className="font-mono text-[11px] text-[#71717A]">{email}</p>
                      )}
                      {!name && !email && (
                        <p className="text-sm text-[#A1A1AA]">No name or email</p>
                      )}
                    </div>
                    <div className="text-[12px] text-[#52525B]">
                      {getKeyInfo(session.collectedData)}
                    </div>
                    <div className="font-mono text-[11px] text-[#71717A]">
                      {formatDate(session.startedAt)}
                    </div>
                    <div>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wide rounded-full px-2.5 py-1 border ${WORK_STATUS_STYLES[workStatus]}`}
                      >
                        {WORK_STATUS_LABELS[workStatus]}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[#6D28D9]">
                      {isExpanded ? 'collapse ↑' : 'expand ↓'}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="bg-[#FAFAF9] border-t border-[#E4E4E7] px-5 py-5 space-y-5">

                      {/* Full ID */}
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wide text-[#A1A1AA] mb-1">
                          Full ID
                        </p>
                        <p className="font-mono text-xs text-[#52525B] break-all">{session.id}</p>
                      </div>

                      {/* All collected fields */}
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wide text-[#A1A1AA] mb-3">
                          Collected data
                        </p>
                        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                          {Object.entries(session.collectedData).map(([key, value]) => (
                            <div key={key} className="flex flex-col gap-0.5 min-w-0">
                              <dt className="font-mono text-[10px] text-[#A1A1AA]">{key}</dt>
                              <dd className="text-sm text-[#18181B] break-words whitespace-pre-wrap">
                                {String(value)}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {session.skippedFields.length > 0 && (
                        <p className="font-mono text-xs text-[#A1A1AA]">
                          skipped: {session.skippedFields.join(', ')}
                        </p>
                      )}

                      {session.needsReview && (
                        <span className="inline-block font-mono text-[10px] uppercase tracking-wide rounded-full px-2.5 py-1 border bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]">
                          needs review
                        </span>
                      )}

                      {/* Work status */}
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wide text-[#A1A1AA] mb-2">
                          Work status
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {(['NEW', 'IN_PROGRESS', 'COMPLETED'] as WorkStatus[]).map((ws) => (
                            <button
                              key={ws}
                              onClick={(e) => {
                                e.stopPropagation()
                                updateSession(session.id, { workStatus: ws })
                              }}
                              disabled={savingId === session.id}
                              className={`font-mono text-[10px] uppercase tracking-wide rounded-full px-3 py-1.5 border transition-colors ${
                                workStatus === ws
                                  ? WORK_STATUS_STYLES[ws]
                                  : 'bg-white text-[#71717A] border-[#E4E4E7] hover:bg-[#F4F4F5]'
                              }`}
                            >
                              {WORK_STATUS_LABELS[ws]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wide text-[#A1A1AA] mb-2">
                          Notes
                        </p>
                        <textarea
                          value={currentNotes}
                          onChange={(e) =>
                            setEditingNotes((prev) => ({
                              ...prev,
                              [session.id]: e.target.value,
                            }))
                          }
                          onBlur={() => handleNotesBlur(session.id)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Add notes about this response…"
                          rows={3}
                          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#6D28D9] resize-none"
                        />
                        <p className="font-mono text-[10px] text-[#A1A1AA] mt-1">
                          Auto-saves on blur
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          )
        })()}
      </div>
    </div>
  )
}