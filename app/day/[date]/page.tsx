import fs from "fs";
import path from "path";
import { DailyDigest } from "@/lib/types";
import Header from "@/components/Header";
import DaySection from "@/components/DaySection";
import Footer from "@/components/Footer";
import Link from "next/link";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ date: string }>;
}

function getDigest(date: string): DailyDigest | null {
  const filePath = path.join(process.cwd(), "data", "news", `${date}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as DailyDigest;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const newsDir = path.join(process.cwd(), "data", "news");
  if (!fs.existsSync(newsDir)) return [];

  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ date: f.replace(".json", "") }));
}

export default async function DayPage({ params }: PageProps) {
  const { date } = await params;
  const digest = getDigest(date);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-violet-400"
        >
          &larr; back to all days
        </Link>

        {digest ? (
          <DaySection digest={digest} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-2xl font-bold text-white">
              nothing here fam
            </p>
            <p className="mt-2 text-zinc-500">
              no digest for {date}. maybe the robots took a day off idk
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
