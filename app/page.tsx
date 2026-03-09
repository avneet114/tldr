import fs from "fs";
import path from "path";
import { DailyDigest } from "@/lib/types";
import Header from "@/components/Header";
import DaySection from "@/components/DaySection";
import Footer from "@/components/Footer";

function getDigests(): DailyDigest[] {
  const newsDir = path.join(process.cwd(), "data", "news");

  if (!fs.existsSync(newsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse()
    .slice(0, 7);

  return files
    .map((file) => {
      try {
        const content = fs.readFileSync(path.join(newsDir, file), "utf-8");
        return JSON.parse(content) as DailyDigest;
      } catch {
        return null;
      }
    })
    .filter((d): d is DailyDigest => d !== null);
}

export default function Home() {
  const digests = getDigests();

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {digests.length === 0 ? (
          <div className="border-4 border-black bg-[#ffe156] p-8 text-center shadow-[6px_6px_0px_#000]">
            <p className="text-2xl font-black uppercase text-black">
              no news yet bestie
            </p>
            <p className="mt-2 font-bold text-black/60">
              the first digest drops tomorrow morning at 8am est. come back
              then!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {digests.map((digest, i) => (
              <DaySection key={digest.date} digest={digest} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
