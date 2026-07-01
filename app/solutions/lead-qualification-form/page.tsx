import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead Qualification Form — Convoforms',
  description: 'Qualify leads conversationally. Ask about team size, budget, and timeline through natural AI chat. Higher conversion rates than static forms, cleaner data for your sales team.',
  alternates: { canonical: 'https://convoforms.app/solutions/lead-qualification-form' },
  openGraph: {
    title: 'Lead Qualification Form — Convoforms',
    description: 'Qualify leads conversationally. Higher conversion rates, cleaner data for your sales team.',
    url: 'https://convoforms.app/solutions/lead-qualification-form',
  },
}

export default function LeadQualificationFormPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Lead qualification
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          A lead qualification form that actually converts.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Static qualification forms feel like job applications. Convoforms turns
          lead qualification into a natural conversation, asking about budget,
          team size, and timeline in a way that feels helpful rather than
          interrogative. More completions, better quality data, warmer leads.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Build your qualification form
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#6D28D9] bg-[#FAF5FF] px-6 py-3 text-sm font-medium text-[#6D28D9] hover:bg-[#EDE9FE] transition-colors"
          >
            See how it works
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { stat: 'Higher', label: 'Completion rates vs static qualification forms' },
            { stat: 'Cleaner', label: 'Data reaching your CRM or sales team' },
            { stat: 'Faster', label: 'Time from interest to qualified lead' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-[#6D28D9] mb-2">{item.stat}</p>
              <p className="text-sm text-[#52525B]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">Why qualification forms fail</h2>
          <p className="text-[#52525B] leading-relaxed">
            Long qualification forms with dropdowns for company size, budget ranges,
            and timeline selectors feel impersonal and easy to game. Prospects
            either abandon them or fill them in with whatever gets them to the
            next step fastest, not what's actually true.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            Convoforms asks the same questions conversationally. A prospect who
            types "we're a pretty small team, maybe a dozen people" gets a natural
            follow-up that confirms "so around 11-50 people?" before anything
            is recorded. You get accurate data without a dropdown in sight.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold">What to qualify</h2>
          <ul className="space-y-3">
            {[
              'Team size and company type',
              'Budget range and purchasing timeline',
              'Current solution and pain points',
              'Decision maker and buying process',
              'Use case and desired outcome',
              'Demo request or more information',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#52525B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-[#18181B] text-white p-10">
          <h2 className="text-2xl font-semibold mb-2">
            Better leads start with better conversations.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            Describe what you need to know about a prospect. Convoforms handles
            the rest, and hands you validated, structured data.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Build your qualification form
          </Link>
        </div>
      </div>
    </div>
  )
}