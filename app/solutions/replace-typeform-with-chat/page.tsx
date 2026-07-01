import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Replace Typeform with Chat — Convoforms',
  description: 'Convoforms is the conversational alternative to Typeform. No rigid form logic, no monthly limits. Describe what you need, publish in seconds, get validated data through natural AI chat.',
  alternates: { canonical: 'https://convoforms.app/solutions/replace-typeform-with-chat' },
  openGraph: {
    title: 'Replace Typeform with Chat — Convoforms',
    description: 'The conversational alternative to Typeform. No rigid form logic, no monthly limits.',
    url: 'https://convoforms.app/solutions/replace-typeform-with-chat',
  },
}

export default function ReplaceTypeformPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Typeform alternative
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          Replace Typeform with a real AI conversation.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Typeform made forms friendlier. Convoforms makes them actually intelligent.
          Instead of pre-scripted question sequences, you get a live AI agent that
          listens, adapts, and validates, without monthly response limits or
          complex logic builders.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Try Convoforms free
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#6D28D9] bg-[#FAF5FF] px-6 py-3 text-sm font-medium text-[#6D28D9] hover:bg-[#EDE9FE] transition-colors"
          >
            See how it works
          </Link>
        </div>

        <div className="rounded-2xl border border-[#E4E4E7] bg-white overflow-hidden mb-16">
          <div className="grid grid-cols-3 border-b border-[#E4E4E7]">
            <div className="p-4 font-mono text-xs text-[#A1A1AA] uppercase tracking-wide" />
            <div className="p-4 font-mono text-xs text-[#A1A1AA] uppercase tracking-wide border-l border-[#E4E4E7]">Typeform</div>
            <div className="p-4 font-mono text-xs text-[#6D28D9] uppercase tracking-wide border-l border-[#E4E4E7]">Convoforms</div>
          </div>
          {[
            ['Setup', 'Drag and drop builder', 'Describe in plain language'],
            ['Logic', 'Manual conditional rules', 'AI adapts automatically'],
            ['Follow-ups', 'Pre-scripted only', 'Dynamic, based on answers'],
            ['Validation', 'Basic field types', 'AI confirms vague answers'],
            ['Response limits', 'Capped by plan', 'Unlimited'],
            ['Time to publish', '30+ minutes', 'Under 1 minute'],
          ].map(([feature, typeform, convoforms]) => (
            <div key={feature} className="grid grid-cols-3 border-b border-[#E4E4E7] last:border-b-0">
              <div className="p-4 text-sm font-medium text-[#18181B]">{feature}</div>
              <div className="p-4 text-sm text-[#71717A] border-l border-[#E4E4E7]">{typeform}</div>
              <div className="p-4 text-sm text-[#18181B] border-l border-[#E4E4E7] bg-[#FAF5FF]">{convoforms}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">Beyond one question at a time</h2>
          <p className="text-[#52525B] leading-relaxed">
            Typeform pioneered the one-question-at-a-time format and made forms
            feel less overwhelming. But it's still a fixed script. The questions
            are pre-written, the logic is manually configured, and if someone
            gives an unexpected answer, the form has no way to adapt.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            Convoforms goes further. The AI reads what the person actually wrote,
            asks natural follow-ups when answers are vague, confirms low-confidence
            responses before recording them, and handles conditional logic without
            you configuring a single rule. You describe what you need to know,
            and the agent figures out how to ask.
          </p>
        </div>

        <div className="rounded-2xl bg-[#18181B] text-white p-10">
          <h2 className="text-2xl font-semibold mb-2">
            Make the switch in under a minute.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            No builder, no logic rules, no response caps. Just describe your form
            and let the AI do the rest.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Try Convoforms free
          </Link>
        </div>
      </div>
    </div>
  )
}