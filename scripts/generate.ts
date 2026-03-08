import { fetchAllFeeds } from "../lib/feeds";
import { summarizeArticles } from "../lib/summarize";
import { DailyDigest } from "../lib/types";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Fetching AI news from RSS feeds...");
  const articles = await fetchAllFeeds();

  if (articles.length === 0) {
    console.log("No articles found in the last 36 hours.");
    process.exit(0);
  }

  console.log(`Found ${articles.length} articles. Generating GenZ summaries...`);
  const items = await summarizeArticles(articles);

  const today = new Date().toISOString().split("T")[0];
  const digest: DailyDigest = {
    date: today,
    generatedAt: new Date().toISOString(),
    items,
  };

  const outDir = path.join(process.cwd(), "data", "news");
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${today}.json`);
  fs.writeFileSync(outPath, JSON.stringify(digest, null, 2));

  console.log(`Saved ${items.length} items to ${outPath}`);
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
