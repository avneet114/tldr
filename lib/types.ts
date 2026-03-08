export interface NewsItem {
  id: string;
  title: string;
  tldr: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
}

export interface DailyDigest {
  date: string;
  generatedAt: string;
  items: NewsItem[];
}
