import Anthropic from "@anthropic-ai/sdk";
import { RawArticle } from "./feeds";
import { NewsItem } from "./types";

const client = new Anthropic();

export async function summarizeArticles(
  articles: RawArticle[]
): Promise<NewsItem[]> {
  const articleList = articles
    .map(
      (a, i) =>
        `[${i + 1}] "${a.title}" (${a.sourceName})\n${a.snippet}`
    )
    .join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    system: `You are a chronically online Gen Z news reporter who covers AI. Your job is to write TLDRs and summaries of AI news articles.

Rules:
- The TLDR must be ONE sentence, under 120 characters, in Gen Z speak. Be unhinged but accurate. Use slang naturally (not forced cringe).
- The summary is 2-3 sentences. Still casual and fun but actually informative so people learn something.
- Keep it real — don't make stuff up, stick to what the article says.
- Return ONLY valid JSON, no markdown code fences.

Return a JSON array in this exact format:
[
  {
    "index": 1,
    "tldr": "the short genZ tldr",
    "summary": "the 2-3 sentence casual summary"
  }
]`,
    messages: [
      {
        role: "user",
        content: `Here are today's AI news articles. Write a GenZ TLDR and summary for each one:\n\n${articleList}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  let parsed: Array<{ index: number; tldr: string; summary: string }>;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Try extracting JSON from the response
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error("Failed to parse Claude response as JSON");
    }
  }

  return articles.map((article, i) => {
    const match = parsed.find((p) => p.index === i + 1) || parsed[i];
    return {
      id: `${Date.now()}-${i}`,
      title: article.title,
      tldr: match?.tldr || article.title,
      summary: match?.summary || article.snippet,
      sourceUrl: article.link,
      sourceName: article.sourceName,
      publishedAt: article.publishedAt,
    };
  });
}
