import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convoforms Solutions',
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}