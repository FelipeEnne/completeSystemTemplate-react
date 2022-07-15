export interface UserInterface {
  id?: number;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface StatsInterface {
  categories: number;
  articles: number;
  users: number;
}

export interface StatsComponetInterface {
  icon: JSX.Element;
  color: string;
  title: string;
  value: number;
}

export interface ArticleInterface {
  content: string;
  id: number;
  name: string;
  descriptionname: string;
  description: string;
  author: string;
  imageUrl: string;
  categoryId: number;
}

export interface CategoryInterface {
  id: string;
  path: string;
  name: string;
}

export interface DataArticleInterface {
  mode: string;
  article?: ArticleInterface;
  articles: Array<ArticleInterface>;
  category?: CategoryInterface;
  categories: Array<CategoryInterface>;
  user?: UserInterface;
  users: Array<UserInterface>;
  page: number;
  limit: number;
  count: number;
  fields: Array<{ key: string; label: string; sortable?: boolean }>;
}

export interface HeaderProps {
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
}

export type CommunicationType = {
  id?: number;
  sender: string;
  receiver: string;
  communicationMessage: string;
  deliveryDate: string;
  communicationFormat: string[];
  communicationStatus?: string;
};
