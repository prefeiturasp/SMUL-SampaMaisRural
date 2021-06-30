import { Category } from './category.model';

export interface Filters {
  categories: Category[];
  total?: number;
  category?: string;
}

export interface categories {
  title: string;
  cat: string;
}
