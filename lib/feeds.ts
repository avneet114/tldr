import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
  {
    name: "Ben's Bites",
    url: "https://www.bensbites.com/feed",
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  },
  {
    name: "MIT Tech Review",
    url: "https://www.technologyreview.com/feed/",
  },
  {
    name: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
  },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
  },
  {
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
  },
  {
    name: "VentureBeat",
    url: "https://venturebeat.com/category/ai/feed/",
  },
];

export interface RawArticle {
  title: string;
  link: string;
  snippet: string;
  sourceName: string;
  publishedAt: string;
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function isDuplicate(title: string, existing: string[]): boolean {
  const norm = normalize(title);
  return existing.some((t) => {
    const n = normalize(t);
    return n.includes(norm) || norm.includes(n) || n === norm;
  });
}

export async function fetchAllFeeds(): Promise<RawArticle[]> {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - 36); // last 36 hours for safety

  const results: RawArticle[] = [];
  const seenTitles: string[] = [];

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items) {
        if (!item.title || !item.link) continue;

        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        if (pubDate < cutoff) continue;

        if (isDuplicate(item.title, seenTitles)) continue;

        seenTitles.push(item.title);
        results.push({
          title: item.title,
          link: item.link,
          snippet:
            item.contentSnippet?.slice(0, 500) ||
            item.content?.slice(0, 500) ||
            "",
          sourceName: feed.name,
          publishedAt: pubDate.toISOString(),
        });
      }
    } catch (err) {
      console.error(`Failed to fetch ${feed.name}: ${err}`);
    }
  }

  // Sort by date, most recent first, take top 12
  results.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return results.slice(0, 12);
}
