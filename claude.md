# Project: iaintreadingallthat.com
**Tagline:** ur daily AI news, but make it unhinged.

## 1. Vision
A daily AI news aggregator that cuts through the technical jargon and "hype-beast" LinkedIn posts to give users a Gen-Z flavored TL;DR of the last 24 hours in AI.

## 2. Core Features
- **The "Morning Drop":** A fresh list of top AI updates, published daily at 8:00 AM EST via GitHub Actions cron job.
- **Vibe-Check Summaries:** Headlines and TLDRs written in Gen-Z/Internet slang, with a daily "vibeSummary" (3-4 word vibe check for the day).
- **"Deep Lore" Sections:** Expandable accordion sections for each news item with technical breakdowns and links to original sources.
- **Sound Effects:** Each article has an assigned sound effect (bruh, faah, thud, error, niceshot) that plays on expand. Dates play a click sound.
- **Calendar/Archive:** Last 7 days shown on homepage, individual day permalink pages.

## 3. Tech Stack
- **Frontend:** Next.js 16 (App Router) with static export (`output: "export"`).
- **Styling:** Tailwind CSS v4 with Neo-Brutalism design system.
- **AI Summarization:** Claude API (`@anthropic-ai/sdk`, model `claude-sonnet-4-20250514`) for GenZ summaries, deep lore, and sound assignment.
- **Data Sources (RSS):** Ben's Bites, TechCrunch, The Verge, MIT Tech Review, OpenAI Blog, Google AI Blog, Ars Technica, VentureBeat.
- **Hosting:** GitHub Pages (static export deployed via GitHub Actions).
- **Automation:** GitHub Actions cron job at `0 13 * * *` (8 AM EST) runs `scripts/generate.ts` to fetch feeds → Claude API → write JSON to `data/news/`.

## 4. UI/UX — Neo-Brutalism
- **Design System:** Classic Neo-Brutalism — bold black borders (3px), bright offset shadows (`3px 3px 0px #000`), chunky uppercase fonts, no rounded corners.
- **Color Palette:**
  - Background: `#FFFDF7` (warm cream)
  - Borders/Shadows: `#000000` (black)
  - Accent 1: `#a3f635` (lime green) — badges
  - Accent 2: `#ff5edf` (hot pink) — links hover
  - Accent 3: `#5ebaff` (electric blue) — links, date bars
  - Accent 4: `#ffe156` (yellow) — header
- **Layout:** Vertical timeline with nested accordions (day → news items → details).
- **Mobile First:** Cards stack cleanly on mobile.

## 5. Key Architecture
- **Static Site:** All pages pre-rendered at build time. No server needed at runtime.
- **Data Flow:** RSS feeds → Claude API summarization → JSON files in `data/news/YYYY-MM-DD.json` → Next.js reads at build time.
- **Dynamic Tailwind Classes:** Use inline `style={{ backgroundColor }}` for dynamic colors (Tailwind v4 JIT doesn't compile classes in arrays/variables).

## 6. Data Schema
```typescript
interface NewsItem {
  id: string;
  title: string;
  tldr: string;        // GenZ one-liner, <120 chars
  summary: string;     // 2 sentence casual summary
  deepLore: string;    // Technical breakdown
  sound: SoundEffect;  // "bruh" | "faah" | "thud" | "error" | "niceshot"
  sources: { label: string; url: string }[];
  sourceName: string;
  publishedAt: string;
}

interface DailyDigest {
  date: string;
  generatedAt: string;
  vibeSummary: string;  // 3-4 word daily vibe
  items: NewsItem[];
}
```

## 7. File Structure
```
app/
  globals.css          — Tailwind v4 theme
  layout.tsx           — Root layout
  page.tsx             — Homepage (last 7 days)
  day/[date]/page.tsx  — Day permalink
components/
  Header.tsx           — Yellow Neo-Brutalism header
  Footer.tsx           — Simple footer
  DaySection.tsx       — Day-level accordion with sound
  NewsItemAccordion.tsx — News item accordion with sound effects
lib/
  types.ts             — TypeScript types
  feeds.ts             — RSS feed config & fetching
  summarize.ts         — Claude API summarization
  sounds.ts            — Sound playback utility
scripts/
  generate.ts          — Daily generation script
data/news/             — JSON files per day
public/sounds/         — MP3 sound effects
.github/workflows/
  daily-digest.yml     — Cron job workflow
```
