import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B]">
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
          Describe what you need to know in plain language. An AI agent asks for it
          naturally, one question at a time, and hands you back clean, validated data.
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
            <h2 className="text-2xl font-semibold mb-2">Ready to retire your forms?</h2>
            <p className="text-[#A1A1AA] text-sm">
              Describe one, publish it, share the link. Takes about a minute.
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

      <footer className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-mono text-xs text-[#A1A1AA]">convoforms</p>
      </footer>
    </div>
  )
}