import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversational Intake Form — Convoforms',
  description: 'Replace your static intake form with an AI-powered conversation. Collect patient, client, or employee information naturally, one question at a time. No long forms, no dropoffs.',
  alternates: { canonical: 'https://convoforms.app/solutions/conversational-intake-form' },
  openGraph: {
    title: 'Conversational Intake Form — Convoforms',
    description: 'Replace your static intake form with an AI-powered conversation.',
    url: 'https://convoforms.app/solutions/conversational-intake-form',
  },
}

export default function ConversationalIntakeFormPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Intake forms
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          A conversational intake form your clients actually finish.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Traditional intake forms are long, cold, and easy to abandon. Convoforms
          replaces them with a friendly AI conversation that collects the same
          information, one natural question at a time. Higher completion rates,
          cleaner data, better first impressions.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Build your intake form
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
            { stat: '3×', label: 'Higher completion rate than static forms' },
            { stat: '< 1 min', label: 'To build and publish your first form' },
            { stat: '100%', label: 'Of answers validated before they reach you' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-[#6D28D9] mb-2">{item.stat}</p>
              <p className="text-sm text-[#52525B]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">Why intake forms fail</h2>
          <p className="text-[#52525B] leading-relaxed">
            Most intake forms were designed for filing cabinets, not the web. They ask
            for everything upfront, in a format that feels clinical and impersonal.
            People abandon them, fill them out incorrectly, or skip fields entirely.
            You end up chasing missing information before you can even start helping.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            A conversational intake form works differently. Instead of presenting a
            wall of fields, it asks one question at a time, acknowledges what the
            person just said, and adapts based on their answers. If an answer is
            vague, it asks a natural follow-up. By the end, you have complete,
            validated data, and the person feels like they had a real interaction,
            not a bureaucratic hurdle.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold">Use cases</h2>
          <ul className="space-y-3">
            {[
              'Patient intake for healthcare providers',
              'Client onboarding for professional services',
              'Employee onboarding and HR intake',
              'Legal intake for law firms',
              'Insurance intake and claims collection',
              'School enrollment and student intake',
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
            Replace your intake form today.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            Describe what you need to collect. Convoforms generates the conversation,
            validates every answer, and hands you clean data.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Build your intake form
          </Link>
        </div>
      </div>
    </div>
  )
}