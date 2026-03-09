import Anthropic from "@anthropic-ai/sdk";
import { RawArticle } from "./feeds";
import { NewsItem } from "./types";

const client = new Anthropic();

interface SummarizeResult {
  vibeSummary: string;
  items: NewsItem[];
}

export async function summarizeArticles(
  articles: RawArticle[]
): Promise<SummarizeResult> {
  const articleList = articles
    .map(
      (a, i) =>
        `[${i + 1}] "${a.title}" (${a.sourceName})\nURL: ${a.link}\n${a.snippet}`
    )
    .join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 6000,
    system: `You are a chronically online Gen Z news reporter who covers AI. Your job is to write TLDRs, summaries, and technical breakdowns of AI news articles.

Rules:
- vibeSummary: A 3-4 word vibe check for the entire day's news (e.g., "privacy is cooked lol", "robots ate today fr", "OpenAI chose violence")
- tldr: ONE sentence per article, under 120 characters, Gen Z speak. Unhinged but accurate.
- summary: 2 sentences max. Casual Gen Z voice but actually informative.
- deepLore: 2-3 sentences of technical details. What actually happened technically? Be specific with model names, benchmarks, etc. This part can be more serious.
- sources: 2-3 related links. Include the original article plus 1-2 related sources if you can infer them from context. Use the article URL provided as the first source.
- Keep it real — don't make stuff up, stick to what the article says.
- Return ONLY valid JSON, no markdown code fences.

Return JSON in this exact format:
{
  "vibeSummary": "3-4 word day vibe",
  "items": [
    {
      "index": 1,
      "tldr": "short genZ tldr",
      "summary": "2 sentence casual summary",
      "deepLore": "2-3 sentence technical breakdown",
      "sources": [
        { "label": "Original Article - SourceName", "url": "the article url" }
      ]
    }
  ]
}`,
    messages: [
      {
        role: "user",
        content: `Here are today's AI news articles. Write the vibe summary, TLDRs, summaries, deep lore, and sources for each:\n\n${articleList}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  let parsed: {
    vibeSummary: string;
    items: Array<{
      index: number;
      tldr: string;
      summary: string;
      deepLore: string;
      sources: { label: string; url: string }[];
    }>;
  };
  try {
    parsed = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error("Failed to parse Claude response as JSON");
    }
  }

  const items = articles.map((article, i) => {
    const match = parsed.items.find((p) => p.index === i + 1) || parsed.items[i];
    return {
      id: `${Date.now()}-${i}`,
      title: article.title,
      tldr: match?.tldr || article.title,
      summary: match?.summary || article.snippet,
      deepLore: match?.deepLore || "",
      sources: match?.sources || [
        { label: `${article.sourceName}`, url: article.link },
      ],
      sourceName: article.sourceName,
      publishedAt: article.publishedAt,
    };
  });

  return {
    vibeSummary: parsed.vibeSummary || "AI did stuff today",
    items,
  };
}
