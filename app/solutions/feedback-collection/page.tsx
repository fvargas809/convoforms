import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversational Feedback Collection — Convoforms',
  description: 'Collect honest, detailed feedback through natural AI conversation. No rating scales, no text boxes nobody fills in. Just real answers from real people, validated and ready to act on.',
  alternates: { canonical: 'https://convoforms.app/solutions/feedback-collection' },
  openGraph: {
    title: 'Conversational Feedback Collection — Convoforms',
    description: 'Collect honest, detailed feedback through natural AI conversation. Real answers, ready to act on.',
    url: 'https://convoforms.app/solutions/feedback-collection',
  },
}

export default function FeedbackCollectionPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Feedback collection
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          Feedback people actually give you.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-8 max-w-2xl">
          Most feedback forms get ignored, skipped, or filled in with a 3-star
          rating and nothing else. Convoforms asks for feedback the way a person
          would, in a natural conversation that draws out honest, specific answers
          you can actually learn from and act on.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Build your feedback form
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
            { stat: 'More', label: 'Detailed responses than star ratings or NPS alone' },
            { stat: 'Honest', label: 'Answers drawn out through natural follow-ups' },
            { stat: 'Actionable', label: 'Data validated and structured before it reaches you' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-[#6D28D9] mb-2">{item.stat}</p>
              <p className="text-sm text-[#52525B]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-semibold">Why feedback forms produce bad data</h2>
          <p className="text-[#52525B] leading-relaxed">
            A five-star rating and a comment box is not a feedback system. It is
            a hope that people will voluntarily write a paragraph about their
            experience after the fact. Most do not. Those who do tend to be either
            very happy or very unhappy, leaving you with a skewed picture of
            what is actually happening.
          </p>
          <p className="text-[#52525B] leading-relaxed">
            Convoforms structures the conversation so feedback is easy to give
            and hard to skip. It acknowledges what the person said, asks a
            natural follow-up when an answer is vague, and confirms anything
            ambiguous before recording it. You get complete, structured feedback
            from a much broader range of people, not just the extremes.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold">Where it works</h2>
          <ul className="space-y-3">
            {[
              'Post-purchase product feedback',
              'Service and support experience follow-up',
              'Post-event and post-workshop feedback',
              'Employee experience and pulse checks',
              'Course and training evaluation',
              'App and product usability feedback',
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
            Feedback worth reading.
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6">
            Describe what you want to learn. Convoforms builds a conversation
            that draws out honest, specific answers every time.
          </p>
          <Link
            href="/forms/new"
            className="inline-block rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors"
          >
            Build your feedback form
          </Link>
        </div>
      </div>
    </div>
  )
}