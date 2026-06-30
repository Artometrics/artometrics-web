export interface FeedReport {
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  tags: string[];
  heroImage: string | null;
  url: string;
}

export interface FeedEpisode {
  title: string;
  id: string;
  description: string;
  pubDate: string;
  author: string;
  isLocked: boolean;
  audioSrc: string | null;
  url: string;
}

export interface SiteFeed {
  updatedAt: string;
  reports: FeedReport[];
  episodes: FeedEpisode[];
}

export interface SavedArticle {
  slug: string;
  title: string;
  savedAt: string;
}

export interface ReadingProgress {
  slug: string;
  title: string;
  path: string;
  scrollY: number;
  progress: number;
  updatedAt: string;
}
