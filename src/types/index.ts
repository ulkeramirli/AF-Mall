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

export type LeasingInquiryStatus = 'New' | 'Contacted' | 'Under Review' | 'Approved' | 'Declined';

export interface LeasingInquiry {
  id: string;
  premiseId?: string;
  fullName: string;
  companyOrBrand: string;
  phone: string;
  email: string;
  activityType: string;
  requiredArea?: string;
  budget?: string;
  notes?: string;
  status: LeasingInquiryStatus;
  adminNotes?: string;
  createdAt: string;
}

export type JobApplicationStatus = 'New' | 'Reviewed' | 'Interview' | 'Offered' | 'Rejected';

export interface JobApplication {
  id: string;
  vacancyId: string;
  position: string;
  storeName: string;
  fullName: string;
  phone: string;
  email: string;
  cvLink?: string;
  experience?: string;
  message?: string;
  status: JobApplicationStatus;
  adminNotes?: string;
  createdAt: string;
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
  requirements?: string[];
  responsibilities?: string[];
  experienceLevel?: string;
  department?: string;
  contactEmail?: string;
  contactPhone?: string;
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
  features?: string[];
  locationInMall?: string;
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

