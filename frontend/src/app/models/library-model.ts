export interface ThemePosts{
  theme?: string;
  name?: string;
  posts?: Posts[];
  total_count?: number;
  total_pages?: number;
}

export interface Posts {
  description: string;
  file_url: string;
  id: number;
  link: string;
  photo_url: string;
  title: string;
}