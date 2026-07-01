import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversational Event Registration Form — Convoforms',
  description: 'Replace your event registration form with an AI conversation. Collect dietary needs, session preferences, and contact details in a way that feels effortless rather than administrative.',
  alternates: { canonical: 'https://convoforms.app/solutions/event-registration' },
  openGraph: {
    title: 'Conversational Event Registration Form — Convoforms',
    description: 'Collect dietary needs, session preferences, and contact details through natural AI chat.',
    url: 'https://convoforms.app/solutions/event-registration',
  },
}

export default function EventRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Event registration
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          Event registration that sets the right tone.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Your event registration form is the first thing attendees interact with.
          Make it feel like an invitation, not a bureaucratic checklist. Convoforms
          collects everything you need through a warm, natural conversation that
          gets people excited before they even arrive.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Build your registration form
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
            { stat: 'Higher', label: 'Registration completion vs multi-page forms' },
            { stat: 'Zero', label: 'Missing dietary or accessibility requirements' },
            { stat: '< 1 min', label: 'To build and share your registration link' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-[#6D28D9] mb-2">{item.stat}</p>
              <p className="text-sm text-[#52525B]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">First impressions start at registration</h2>
          <p className="text-[#52525B] leading-relaxed">
            A long registration form with fifteen fields and three dropdowns signals
            that your event is going to be just as tedious. People abandon them,
            skip optional fields that you actually need, or rush through without
            reading the questions properly.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            Convoforms turns registration into a brief, friendly exchange. It asks
            about session preferences, dietary needs, accessibility requirements,
            and anything else you need, one thing at a time, in a tone that matches
            your event. You get complete, accurate attendee data and your guests
            arrive already feeling looked after.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold">What to collect at registration</h2>
          <ul className="space-y-3">
            {[
              'Name, email, and contact details',
              'Session or workshop preferences',
              'Dietary requirements and allergies',
              'Accessibility needs',
              'T-shirt size and swag preferences',
              'Networking interests and job title',
              'How they heard about the event',
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
            Start your event on the right note.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            Describe what you need from attendees. Convoforms handles the
            conversation and hands you complete, validated registration data.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Build your registration form
          </Link>
        </div>
      </div>
    </div>
  )
}