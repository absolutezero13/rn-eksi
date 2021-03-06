export interface Topic {
  entry_count: string;
  id: number;
  slug: string;
  title: string;
}

export interface IEntry {
  author: string;
  author_id?: string;
  body: string;
  created_at: string;
  id: string | number;
  updated_at: string | null;
  fav_count: number;
}

export interface TopicEntriesResponse {
  title: string;
  entries: IEntry[];
  current_page: number;
  disambiguation_links: string[];
  disambiguation_titles: string[];
  total_page: number;
  id: string;
  slug: string;
  tags: string[];
}
export interface IUser {
  nick: string;
  quote_entry_title: string;
  quote_entry_body: string;
  quote_entry_date: string;
  quote_entry_url: string;
  entry_count_total: string;
  entry_count_lastmonth: string;
  entry_count_lastweek: string;
  entry_count_today: string;
  last_entry_time: string;
}

export interface AutoCompleteResults {
  Nicks: string[];
  Query: string;
  Titles: string[];
}

export interface SearchResults {
  thread_count: number;
  threads: Thread[];
}

interface Thread {
  id: number;
  title: string;
  slug: string;
  entry_count_total: number;
}

export interface Debe {
  id: number;
  title: string;
  body: string;
  author: string;
  fav_count: number;
  created_at: string;
  updated_at: string;
}

export interface DebeResponse {
  entries: Debe[];
}
