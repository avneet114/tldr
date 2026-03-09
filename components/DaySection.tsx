"use client";

import { useState } from "react";
import { DailyDigest } from "@/lib/types";
import NewsItemAccordion from "./NewsItemAccordion";

const BAR_COLORS = ["#5ebaff", "#a3f635", "#ff5edf", "#ffe156"];

export default function DaySection({
  digest,
  index = 0,
}: {
  digest: DailyDigest;
  index?: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const barColor = BAR_COLORS[index % BAR_COLORS.length];

  const dateStr = new Date(digest.date + "T12:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div>
      {/* Day Bar */}
      <button
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: barColor }}
        className="flex w-full items-center gap-3 border-4 border-black p-3 shadow-[4px_4px_0px_#000] transition-all hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 sm:p-4"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-sm font-black transition-transform ${
            open ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
        <span className="text-base font-black uppercase tracking-tight text-black sm:text-lg">
          {dateStr}
        </span>
        <span className="ml-auto text-sm font-bold text-black/60 sm:text-base">
          {digest.vibeSummary || "AI did stuff today"}
        </span>
      </button>

      {/* Expanded News Items */}
      {open && (
        <div className="ml-2 border-l-4 border-black pl-4 pt-3 sm:ml-4 sm:pl-6">
          <div className="space-y-3">
            {digest.items.map((item, i) => (
              <NewsItemAccordion key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
