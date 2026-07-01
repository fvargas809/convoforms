import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Support Request Form — Convoforms',
  description: 'Collect support requests through natural conversation instead of static forms. Your AI agent gathers every detail before the ticket lands in your queue. Faster triage, cleaner data.',
  alternates: { canonical: 'https://convoforms.app/solutions/ai-support-request-form' },
  openGraph: {
    title: 'AI Support Request Form — Convoforms',
    description: 'Collect support requests through natural conversation instead of static forms.',
    url: 'https://convoforms.app/solutions/ai-support-request-form',
  },
}

export default function AiSupportRequestFormPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Support forms
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          An AI support request form that does the triage for you.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Support tickets with missing information slow your team down. Convoforms
          collects everything you need upfront through a natural AI conversation,
          so every ticket that lands in your queue is complete, categorized,
          and ready to action.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Build your support form
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
            { stat: '0', label: 'Back-and-forth emails to gather missing info' },
            { stat: '100%', label: 'Of required fields collected before submission' },
            { stat: '< 1 min', label: 'To set up and share your support form' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-[#6D28D9] mb-2">{item.stat}</p>
              <p className="text-sm text-[#52525B]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">The problem with standard support forms</h2>
          <p className="text-[#52525B] leading-relaxed">
            Most support request forms collect a subject line and a text box. The
            customer writes a vague paragraph, submits it, and your team spends the
            next hour emailing back and forth trying to understand what actually
            happened, what they tried, and what they need.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            Convoforms asks the right follow-up questions automatically. If someone
            says their account is broken, the agent asks what they were trying to do,
            what error they saw, and when it started. By the time the ticket reaches
            your team, it reads like a well-written bug report, not a one-liner.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold">Built for any support team</h2>
          <ul className="space-y-3">
            {[
              'SaaS customer support and bug reporting',
              'IT helpdesk and internal support',
              'E-commerce order issues and returns',
              'Field service and maintenance requests',
              'Facilities and operations requests',
              'HR and employee support tickets',
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
            Stop chasing missing information.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            Build a support intake form in under a minute. Share the link and let
            the AI handle the triage.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Build your support form
          </Link>
        </div>
      </div>
    </div>
  )
}