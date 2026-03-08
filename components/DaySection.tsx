import { DailyDigest } from "@/lib/types";
import NewsCard from "./NewsCard";

export default function DaySection({ digest }: { digest: DailyDigest }) {
  const dateStr = new Date(digest.date + "T12:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="space-y-3">
      <h2 className="sticky top-0 z-10 bg-zinc-950/80 py-2 text-sm font-medium uppercase tracking-wider text-violet-400 backdrop-blur-sm">
        {dateStr}
      </h2>
      <div className="space-y-3">
        {digest.items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
