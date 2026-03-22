export type WikiCategory =
  | 'muscles'
  | 'terminology'
  | 'methodology'
  | 'supplements'
  | 'health'
  | 'nutrition'
  | 'equipment';

export interface WikiArticle {
  id: string;
  title: string;
  slug: string;
  category: WikiCategory;
  summary: string;
  content: WikiSection[];
  tags: string[];
  readTime: number; // minutes
  youtubeId?: string;
  relatedSlugs: string[];
}

export interface WikiSection {
  heading: string;
  body: string;
}
