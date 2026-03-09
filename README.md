# i ain't reading all that

**ur daily AI news, but make it unhinged.** A Gen-Z flavored AI news aggregator that drops every morning at 8 AM EST.

## What is this?

A daily AI news site that scrapes RSS feeds from top tech sources, sends them through Claude to get unhinged Gen-Z summaries, and publishes them as a static site on GitHub Pages. Every article gets a TLDR, a deep lore section, and sound effects.

**Live at:** [iaintreadingallthat.com](https://avneet114.github.io/tldr/)

## Features

- **Daily AI news TLDRs** in Gen-Z speak
- **Neo-Brutalism UI** — bold borders, bright colors, offset shadows
- **Nested accordions** — click a date, then click a story to expand
- **Sound effects** — each article plays a sound on expand (bruh, faah, thud, error, niceshot)
- **Deep lore** — technical breakdowns for the nerds
- **Source links** — always links back to original articles

## Tech Stack

- **Next.js 16** (App Router, static export)
- **Tailwind CSS v4** (Neo-Brutalism theme)
- **Claude API** for AI summarization
- **GitHub Actions** for daily automation
- **GitHub Pages** for hosting

## News Sources (RSS)

- Ben's Bites
- TechCrunch AI
- The Verge AI
- MIT Technology Review
- OpenAI Blog
- Google AI Blog
- Ars Technica AI
- VentureBeat AI

## Getting Started

### Prerequisites

- Node.js 18+
- Anthropic API key

### Local Development

```bash
npm install
npm run dev
```

### Generate News Locally

```bash
ANTHROPIC_API_KEY=your_key npx tsx scripts/generate.ts
npm run build
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude |

> **Never commit your API key to the repo.** Store it in a `.env` file (already in `.gitignore`) or as a GitHub Actions secret.

## How It Works

1. **GitHub Actions** runs a cron job daily at 8 AM EST
2. `scripts/generate.ts` fetches RSS feeds from 8 sources
3. Articles are deduplicated and the top 12 are sent to **Claude**
4. Claude returns Gen-Z summaries, deep lore, and sound assignments
5. Output is saved as `data/news/YYYY-MM-DD.json`
6. Next.js builds a static site and deploys to **GitHub Pages**

## Project Structure

```
app/                   — Next.js pages
components/            — React components (Header, Footer, DaySection, NewsItemAccordion)
lib/                   — Core logic (feeds, summarize, sounds, types)
scripts/               — Daily generation script
data/news/             — Generated JSON files
public/sounds/         — Sound effect MP3s
.github/workflows/     — GitHub Actions automation
```

## Cost

~$0.02-0.04/day in Claude API credits. Since it's a static site, visitor count doesn't affect API cost.
