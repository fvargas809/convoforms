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
  title: "Convoforms",
  description: "Forms, rebuilt as conversations",
};

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