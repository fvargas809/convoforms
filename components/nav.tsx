'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  // Public form pages are for respondents only, no nav
  if (pathname?.startsWith('/f/')) return null

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6">
      <nav className="mx-auto max-w-6xl flex items-center justify-between bg-white border border-[#E4E4E7] rounded-full px-5 py-2">
        <Link
          href="/"
          className="font-mono text-sm font-medium text-[#18181B] hover:text-[#6D28D9] transition-colors tracking-tight"
        >
          convo<span className="text-[#6D28D9]">forms</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/forms"
            className="font-mono text-xs text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F5] px-4 py-2 rounded-full transition-colors"
          >
            my forms
          </Link>
          <Link
            href="/forms/new"
            className="font-mono text-xs font-medium bg-[#6D28D9] text-white px-4 py-2 rounded-full hover:bg-[#5B21B6] transition-colors"
          >
            build a form →
          </Link>
        </div>
      </nav>
    </div>
  )
}