export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Store {
  id: string;
  name: string;
  slug?: string;
  categoryId: string;
  floor: string;
  location?: string;
  description: string;
  image?: string;
  logo?: string;
  isPremium?: boolean;
  phone?: string;
  hours?: string;
  website?: string;
}

export interface Event {
  id: string;
  title: string;
  slug?: string;
  date: string;
  endDate?: string;
  description: string;
  image?: string;
  location?: string;
  status?: 'Upcoming' | 'Ongoing' | 'Past';
}

export interface Vacancy {
  id: string;
  storeName: string;
  position: string;
  type: string;
  status: 'Active' | 'Closed' | string;
  postedDate: string;
  salary?: string;
  description?: string;
}

export interface Premise {
  id: string;
  floor: string;
  area: string;
  type: string;
  status: 'Available' | 'Rented' | 'Reserved' | string;
  tenant?: string | null;
  price: string;
  images: string[];
  description?: string;
}

export interface AdminUser {
  email: string;
  password?: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface MallSettings {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  announcement: {
    enabled: boolean;
    text: string;
    type: string;
  };
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

