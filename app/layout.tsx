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
    "Your daily AI news digest in Gen Z speak. Because AI moves too fast and you have better things to do.",
  openGraph: {
    title: "i ain't reading all that",
    description: "Daily AI news TLDRs — no cap",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
