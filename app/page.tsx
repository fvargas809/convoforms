import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Convoforms',
            applicationCategory: 'BusinessApplication',
            description: 'Replace static forms with AI-powered conversational interfaces. Collect support requests, qualify leads, run surveys, manage intake, and gather feedback through natural chat.',
            url: 'https://convoforms.app',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            keywords: 'conversational forms, support request form, intake form, lead qualification, survey tool, feedback collection, event registration',
          }),
        }}
      />
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Forms, rebuilt as conversations
        </p>
        <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight max-w-3xl">
          Stop making people fill out forms.
          <br />
          <span className="text-[#6D28D9]">Let them talk instead.</span>
        </h1>
        <p className="mt-6 text-lg text-[#52525B] max-w-xl leading-relaxed">
          Convoforms replaces static forms with AI-powered conversations. Collect
          support requests, qualify leads, run intake forms, register event attendees,
          and gather survey feedback, all through natural chat. No form builder needed.
        </p>

        <div className="mt-9 flex items-center gap-4">
          <Link
            href="/forms/new"
            className="rounded-full bg-[#18181B] text-white px-6 py-3 text-sm font-medium hover:bg-[#27272A] transition-colors"
          >
            Create your first form
          </Link>
          
          <Link
            href="/forms"
            className="rounded-full border border-[#6D28D9] bg-[#FAF5FF] px-6 py-3 text-sm font-medium text-[#6D28D9] hover:bg-[#EDE9FE] transition-colors"
          >
            View existing forms
          </Link>
        
        </div>

        <div className="mt-20 grid sm:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6">
            <p className="font-mono text-[10px] uppercase tracking-wide text-[#A1A1AA] mb-5">
              The old way
            </p>
            <div className="space-y-4">
              {['Full Name', 'Email Address', 'Team Size'].map((label) => (
                <div key={label}>
                  <label className="block text-xs text-[#71717A] mb-1.5">{label}</label>
                  <div className="h-9 rounded-lg border border-[#E4E4E7] bg-[#FAFAF9]" />
                </div>
              ))}
              <div className="h-9 w-24 rounded-lg bg-[#E4E4E7]" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6 relative overflow-hidden">
            <p className="font-mono text-[10px] uppercase tracking-wide text-[#6D28D9] mb-5">
              The convoforms way
            </p>
            <div className="space-y-3">
              <div className="flex">
                <div className="rounded-2xl rounded-tl-sm bg-[#F4F4F5] px-4 py-2.5 text-sm text-[#18181B] max-w-[85%]">
                  Hi! Let&apos;s get your demo request started, what&apos;s your name?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-[#6D28D9] px-4 py-2.5 text-sm text-white max-w-[85%]">
                  Maria Chen
                </div>
              </div>
              <div className="flex">
                <div className="rounded-2xl rounded-tl-sm bg-[#F4F4F5] px-4 py-2.5 text-sm text-[#18181B] max-w-[85%]">
                  Great, Maria. And about how big is your team?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-[#6D28D9]/80 px-4 py-2.5 text-sm text-white max-w-[85%]">
                  maybe a dozen people
                </div>
              </div>
              <div className="flex">
                <div className="rounded-2xl rounded-tl-sm bg-[#F4F4F5] px-4 py-2.5 text-sm text-[#18181B] max-w-[85%]">
                  Got it, just to confirm, that&apos;s 1–10 people?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[#E4E4E7]">
        <p className="font-mono text-xs tracking-wide text-[#6D28D9] uppercase mb-4">
          Built for any team
        </p>
        <h2 className="text-2xl font-semibold mb-12 max-w-xl">
          Wherever you collect information, convoforms fits in.
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: '🎧',
              title: 'Support requests',
              body: 'Let customers describe their issue naturally. The agent gathers every detail you need before the ticket even lands in your queue.',
              href: '/solutions/ai-support-request-form',
            },
            {
              icon: '📋',
              title: 'Intake and onboarding',
              body: 'Replace long intake forms with a friendly conversation. New clients, patients, or employees feel heard from the very first interaction.',
              href: '/solutions/conversational-intake-form',
            },
            {
              icon: '🎯',
              title: 'Lead qualification',
              body: 'Qualify prospects conversationally. Ask about team size, budget, and timeline without the friction of a static form that kills conversions.',
              href: '/solutions/lead-qualification-form',
            },
            {
              icon: '🔍',
              title: 'Research and surveys',
              body: 'Go deeper than checkboxes. The agent follows up on interesting answers, giving you richer data without a longer form.',
              href: '/solutions/research-and-surveys',
            },
            {
              icon: '📅',
              title: 'Event registration',
              body: 'Collect dietary needs, session preferences, and contact details in a conversation that feels effortless rather than administrative.',
              href: '/solutions/event-registration',
            },
            {
              icon: '💬',
              title: 'Feedback collection',
              body: 'Ask for feedback in the moment. A conversational prompt gets more honest, detailed responses than a 1-to-5 rating scale ever will.',
              href: '/solutions/feedback-collection',
            },
          ].map((item) => {
            const inner = (
              <>
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="font-medium text-[#18181B] mb-2">{item.title}</h3>
                <p className="text-sm text-[#52525B] leading-relaxed">{item.body}</p>
                {item.href && (
                  <p className="font-mono text-xs text-[#6D28D9] mt-4">Learn more →</p>
                )}
              </>
            )

            return item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-[#E4E4E7] bg-white p-6 hover:border-[#6D28D9] hover:shadow-sm transition-all"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E4E4E7] bg-white p-6"
              >
                {inner}
              </div>
            )
          })}
        </div>
      </section>

      

      <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[#E4E4E7]">
        <h2 className="text-2xl font-semibold mb-12">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-10">
          <div>
            <p className="font-mono text-xs text-[#A1A1AA] mb-3">01</p>
            <h3 className="font-medium mb-2">Describe what you need</h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Write a sentence like you&apos;re briefing a teammate. No drag-and-drop
              builder, no field-by-field setup.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#A1A1AA] mb-3">02</p>
            <h3 className="font-medium mb-2">The agent asks, naturally</h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Your visitor has a real back-and-forth. Vague answers get a gentle
              follow-up before anything is recorded.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#A1A1AA] mb-3">03</p>
            <h3 className="font-medium mb-2">You get clean data</h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Every answer is validated and confirmed before it lands in your system,
              not just collected and hoped for.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[#E4E4E7]">
        <div className="rounded-2xl bg-[#18181B] text-white p-10 flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Start with your support queue.</h2>
            <p className="text-[#A1A1AA] text-sm">
              Build a support request form in under a minute. Share the link, and let
              the agent do the intake for you.
            </p>
          </div>
          <Link
            href="/forms/new"
            className="rounded-full bg-[#6D28D9] text-white px-6 py-3 text-sm font-medium hover:bg-[#5B21B6] transition-colors shrink-0"
          >
            Create your first form
          </Link>
        </div>
      </section>

      {/* Solutions links */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[#E4E4E7]">
        <p className="font-mono text-xs tracking-wide text-[#A1A1AA] uppercase mb-4">
          Solutions
        </p>
        <div className="flex flex-wrap gap-3">
          {[
              { label: 'Conversational intake form', href: '/solutions/conversational-intake-form' },
              { label: 'AI support request form', href: '/solutions/ai-support-request-form' },
              { label: 'Replace Typeform with chat', href: '/solutions/replace-typeform-with-chat' },
              { label: 'Lead qualification form', href: '/solutions/lead-qualification-form' },
              { label: 'Research and surveys', href: '/solutions/research-and-surveys' },
              { label: 'Event registration', href: '/solutions/event-registration' },
              { label: 'Feedback collection', href: '/solutions/feedback-collection' },
            ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs rounded-full border border-[#E4E4E7] px-4 py-2 text-[#52525B] hover:border-[#6D28D9] hover:text-[#6D28D9] transition-colors"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-mono text-xs text-[#A1A1AA]">convoforms</p>
      </footer>
    </div>
  )
}