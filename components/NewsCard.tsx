"use client";

import { useState } from "react";
import { NewsItem } from "@/lib/types";

export default function NewsCard({ item }: { item: NewsItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-violet-500/50 hover:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold leading-snug text-white">
            {item.tldr}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-violet-400">
              {item.sourceName}
            </span>
            <span>
              {new Date(item.publishedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 shrink-0 rounded-lg border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-violet-500 hover:text-violet-400"
        >
          {expanded ? "less" : "more"}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-zinc-800 pt-3">
          <p className="text-sm font-medium text-zinc-300">{item.title}</p>
          <p className="text-sm leading-relaxed text-zinc-400">
            {item.summary}
          </p>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
          >
            read the full thing &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
