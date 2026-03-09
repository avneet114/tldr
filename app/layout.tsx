import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i ain't reading all that — AI News TLDR",
  description:
    "ur daily AI news, but make it unhinged. Gen-Z flavored TL;DRs of everything happening in AI.",
  openGraph: {
    title: "i ain't reading all that",
    description: "ur daily AI news, but make it unhinged.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#FFFDF7] font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
