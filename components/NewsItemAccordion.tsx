"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";
import { playSound } from "@/lib/sounds";

const BADGE_COLORS = ["#a3f635", "#ff5edf", "#5ebaff", "#ffe156"];


export default function NewsItemAccordion({
  item,
  index,
}: {
  item: NewsItem;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];

  return (
    <div className="border-[3px] border-black bg-white shadow-[3px_3px_0px_#000]">
      <button
        onClick={() => {
          if (!open && item.sound) {
            playSound(item.sound);
          }
          setOpen(!open);
        }}
        className="flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-black/5"
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-xs font-black transition-transform ${
            open ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold leading-snug text-black">
            {item.tldr}
          </p>
          <span
            style={{ backgroundColor: badgeColor }}
            className="mt-1.5 inline-block border-2 border-black px-2 py-0.5 text-xs font-bold uppercase text-black"
          >
            {item.sourceName}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t-[3px] border-black">
          {/* Gen Z Summary */}
          <div className="border-b-2 border-black/20 bg-[#FFFDF7] p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-black/50">
              the tldr
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-black">
              {item.summary}
            </p>
          </div>

          {/* Deep Lore */}
          <div className="border-b-2 border-black/20 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-black/50">
              deep lore
            </p>
            <p className="mt-1 text-sm leading-relaxed text-black/80">
              {item.deepLore}
            </p>
          </div>

          {/* Receipts (Sources) */}
          <div className="bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-black/50">
              receipts
            </p>
            <div className="mt-1 flex flex-col gap-1">
              {item.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#5ebaff] underline decoration-2 underline-offset-2 hover:text-[#ff5edf]"
                >
                  {source.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
