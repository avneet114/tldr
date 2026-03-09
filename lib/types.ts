export interface NewsItem {
  id: string;
  title: string;
  tldr: string;
  summary: string;
  deepLore: string;
  sources: { label: string; url: string }[];
  sourceName: string;
  publishedAt: string;
}

export interface DailyDigest {
  date: string;
  generatedAt: string;
  vibeSummary: string;
  items: NewsItem[];
}
