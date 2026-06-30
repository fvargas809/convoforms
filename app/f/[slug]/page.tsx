'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export default function FormChatPage() {
  const params = useParams()
  const slug = params.slug as string

  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const startSession = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/forms/${slug}/start`, { method: 'POST' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to start session')
      }
      const data = await res.json()
      setSessionId(data.sessionId)
      setMessages([{ role: 'assistant', content: data.message }])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    startSession()
  }, [startSession])

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus()
    }
  }, [isLoading])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function sendMessage() {
    if (!input.trim() || !sessionId || isLoading || isComplete) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/sessions/${sessionId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
      if (data.isComplete) setIsComplete(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, fontFamily: 'sans-serif' }}>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 16,
          minHeight: 400,
          maxHeight: '70vh',
          overflowY: 'auto',
          marginBottom: 16,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === 'user' ? 'right' : 'left',
              margin: '8px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 12,
                background: m.role === 'user' ? '#0070f3' : '#f0f0f0',
                color: m.role === 'user' ? '#fff' : '#000',
                maxWidth: '80%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        {isLoading && <div style={{ color: '#888', fontSize: 14 }}>Thinking…</div>}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</div>
      )}

      {isComplete ? (
        <div style={{ textAlign: 'center', color: '#888' }}>This form is complete. Thanks!</div>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !sessionId}
            placeholder="Type your reply…"
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !sessionId}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#0070f3',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  )
}