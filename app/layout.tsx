import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Convoforms — Conversational Forms for Support, Leads & Intake',
  description: 'Replace static forms with AI-powered conversations. Collect support requests, qualify leads, run surveys, manage intake, and gather feedback — all through natural chat. No form builder needed.',
  keywords: [
    'conversational forms',
    'AI form builder',
    'support request form',
    'intake form',
    'lead qualification form',
    'event registration form',
    'feedback collection',
    'survey tool',
    'replace contact forms',
    'chat form',
    'online form alternative',
  ],
  openGraph: {
    title: 'Convoforms — Conversational Forms for Support, Leads & Intake',
    description: 'Replace static forms with AI-powered conversations. Collect support requests, qualify leads, run surveys, and gather feedback through natural chat.',
    url: 'https://convoforms.app',
    siteName: 'Convoforms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convoforms — Conversational Forms for Support, Leads & Intake',
    description: 'Replace static forms with AI-powered conversations. No form builder needed.',
  },
  alternates: {
    canonical: 'https://convoforms.app',
  },
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#FAFAF9]`}
      >
      <body className="min-h-full flex flex-col bg-[#FAFAF9] pt-safe">
        <Nav />
        {children}
      </body>
    </html>
  );
}