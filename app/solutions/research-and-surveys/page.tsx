import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversational Research and Survey Tool — Convoforms',
  description: 'Go deeper than checkboxes. Convoforms runs AI-powered surveys that follow up on interesting answers, giving you richer qualitative data without a longer form.',
  alternates: { canonical: 'https://convoforms.app/solutions/research-and-surveys' },
  openGraph: {
    title: 'Conversational Research and Survey Tool — Convoforms',
    description: 'AI-powered surveys that follow up on interesting answers, giving you richer data without a longer form.',
    url: 'https://convoforms.app/solutions/research-and-surveys',
  },
}

export default function ResearchAndSurveysPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Research and surveys
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          Surveys that actually go deeper.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Traditional surveys give you checkboxes and rating scales. Convoforms
          gives you a real conversation. When a respondent says something
          interesting, the AI follows up. When an answer is vague, it asks for
          more. You get qualitative depth at quantitative scale.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Build your survey
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
            { stat: 'Richer', label: 'Responses than checkbox or rating-scale surveys' },
            { stat: 'Natural', label: 'Follow-ups based on what respondents actually say' },
            { stat: '< 1 min', label: 'To build and publish your first survey' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-[#6D28D9] mb-2">{item.stat}</p>
              <p className="text-sm text-[#52525B]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">Why traditional surveys fall short</h2>
          <p className="text-[#52525B] leading-relaxed">
            A Likert scale tells you someone rated their experience a 3 out of 5.
            It does not tell you why, what specifically went wrong, or what would
            have made it a 5. To get that, you add an open text field and hope
            people fill it in, which most do not.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            Convoforms asks the follow-up automatically. If someone says their
            experience was average, the agent asks what could have been better.
            If they mention a specific product or feature, it probes further.
            You get the context you actually need to act on the data, not just
            the score.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold">What researchers use it for</h2>
          <ul className="space-y-3">
            {[
              'Customer satisfaction and NPS follow-up',
              'User research and product discovery',
              'Employee engagement surveys',
              'Market research and competitive analysis',
              'Academic and institutional research',
              'Post-event and post-purchase feedback',
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
            Get the answers behind the answers.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            Describe what you want to learn. Convoforms builds the conversation
            and follows up on what matters.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Build your survey
          </Link>
        </div>
      </div>
    </div>
  )
}