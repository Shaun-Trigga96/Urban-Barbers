export type ServiceCategory = 'haircuts' | 'beard' | 'combos' | 'kids-extras';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryName: string;
  durationMinutes: number;
  priceZAR: number;
  description: string;
  featured?: boolean;
  image?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'fades' | 'beards' | 'classics' | 'combos';
  categoryLabel: string;
  description: string;
  image: string;
  barber: string;
  serviceId: string;
}

export interface Barber {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  daysOff: number[]; // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc.
  image: string;
}

export interface Booking {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  createdAt: string;
}

export interface TimeSlot {
  time: string; // HH:mm
  available: boolean;
  barberId?: string;
  barberName?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}
