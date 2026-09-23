import { Booking } from '../types';
import { doIntervalsOverlap, timeStringToMinutes } from '../utils/dateTime';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, type Firestore } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'urban_barbers_bookings_v1';

// Seed realistic future appointments so the calendar feels active and realistic
function getInitialSeedBookings(): Booking[] {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const y1 = tomorrow.getFullYear();
  const m1 = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const d1 = String(tomorrow.getDate()).padStart(2, '0');
  const tomorrowStr = `${y1}-${m1}-${d1}`;

  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const y2 = dayAfter.getFullYear();
  const m2 = String(dayAfter.getMonth() + 1).padStart(2, '0');
  const d2 = String(dayAfter.getDate()).padStart(2, '0');
  const dayAfterStr = `${y2}-${m2}-${d2}`;

  return [
    {
      id: 'seed-1',
      reference: 'BK-582910',
      serviceId: 'skin-fade',
      serviceName: 'Skin Fade',
      serviceDuration: 45,
      servicePrice: 190,
      barberId: 'sipho-dlamini',
      barberName: 'Sipho "Shaz" Dlamini',
      date: tomorrowStr,
      time: '11:00',
      customerName: 'Kgosi M.',
      customerEmail: 'kgosi.m@example.com',
      customerPhone: '082 555 9812',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-2',
      reference: 'BK-739104',
      serviceId: 'cut-beard-combo',
      serviceName: 'Cut + Beard Combo',
      serviceDuration: 60,
      servicePrice: 260,
      barberId: 'ryan-adams',
      barberName: 'Ryan Adams',
      date: tomorrowStr,
      time: '14:30',
      customerName: 'Liam Van Zyl',
      customerEmail: 'liam.vz@example.com',
      customerPhone: '083 444 1290',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-3',
      reference: 'BK-918234',
      serviceId: 'hot-towel-shave',
      serviceName: 'Hot Towel Shave',
      serviceDuration: 30,
      servicePrice: 150,
      barberId: 'lebo-mokoena',
      barberName: 'Lebo Mokoena',
      date: dayAfterStr,
      time: '10:00',
      customerName: 'Tshepo Nkosi',
      customerEmail: 'tshepo.n@example.com',
      customerPhone: '071 333 4567',
      createdAt: new Date().toISOString(),
    },
  ];
}

// Check Firebase configuration
let firestoreDb: Firestore | null = null;

try {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    firestoreDb = getFirestore(app);
  }
} catch {
  // Silent fallback to local storage
  firestoreDb = null;
}

/**
 * Reads bookings from LocalStorage
 */
function getLocalBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialSeedBookings();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialSeedBookings();
  }
}

/**
 * Saves bookings to LocalStorage
 */
function saveLocalBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // localStorage full or restricted
  }
}

/**
 * Generates an alphanumeric reference like "BK-849201"
 */
export function generateBookingReference(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `BK-${randomDigits}`;
}

/**
 * Retrieves all bookings from Firestore (or LocalStorage fallback)
 */
export async function getBookings(): Promise<Booking[]> {
  if (firestoreDb) {
    try {
      const colRef = collection(firestoreDb, 'bookings');
      const snapshot = await getDocs(colRef);
      const bookings: Booking[] = [];
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...(doc.data() as Omit<Booking, 'id'>) });
      });
      if (bookings.length > 0) {
        return bookings;
      }
    } catch {
      // If Firestore fails, fall back smoothly
    }
  }

  return getLocalBookings();
}

/**
 * Saves a new booking
 */
export async function saveBooking(bookingData: Omit<Booking, 'id' | 'reference' | 'createdAt'>): Promise<Booking> {
  const reference = generateBookingReference();
  const newBooking: Booking = {
    ...bookingData,
    id: `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference,
    createdAt: new Date().toISOString(),
  };

  if (firestoreDb) {
    try {
      const colRef = collection(firestoreDb, 'bookings');
      const docRef = await addDoc(colRef, newBooking);
      newBooking.id = docRef.id;
    } catch {
      // Fallback to local storage if firestore write fails
      const local = getLocalBookings();
      local.push(newBooking);
      saveLocalBookings(local);
      return newBooking;
    }
  }

  const local = getLocalBookings();
  local.push(newBooking);
  saveLocalBookings(local);
  return newBooking;
}

/**
 * Re-checks availability immediately before submission to prevent double-booking
 */
export async function checkSlotAvailability(
  dateStr: string,
  timeStr: string,
  durationMinutes: number,
  barberId: string
): Promise<boolean> {
  const allBookings = await getBookings();
  const bookingsOnDate = allBookings.filter(
    (b) => b.date === dateStr && b.barberId === barberId
  );

  const reqStart = timeStringToMinutes(timeStr);

  const hasOverlap = bookingsOnDate.some((b) => {
    const bStart = timeStringToMinutes(b.time);
    return doIntervalsOverlap(reqStart, durationMinutes, bStart, b.serviceDuration);
  });

  return !hasOverlap;
}
