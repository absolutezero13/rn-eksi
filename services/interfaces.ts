export interface Topic {
  entry_count: string;
  id: number;
  slug: string;
  title: string;
}

export interface IEntry {
  author: string;
  author_id: string;
  body: string;
  created_at: string;
  id: string;
  updated_at: string | null;
  fav_count: number;
}
