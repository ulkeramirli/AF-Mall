export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Store {
  id: string;
  name: string;
  categoryId: string;
  floor: string;
  description: string;
  image?: string;
  logo?: string;
  isPremium?: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}
