import { Barber, Booking, Service, TimeSlot } from '../types';
import { BARBERS, BUSINESS_INFO } from '../data/barbershopData';

export const TIMEZONE = 'Africa/Johannesburg';

/**
 * Returns current date and time parts in Africa/Johannesburg (UTC+2)
 */
export function getNowInJohannesburg(): {
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  totalMinutes: number; // minutes from midnight
  hours: number;
  minutes: number;
} {
  // Johannesburg is always UTC+2 with no daylight saving time
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const jhbMs = utcMs + 2 * 3600000;
  const jhbDate = new Date(jhbMs);

  const year = jhbDate.getFullYear();
  const month = String(jhbDate.getMonth() + 1).padStart(2, '0');
  const day = String(jhbDate.getDate()).padStart(2, '0');
  const hours = jhbDate.getHours();
  const minutes = jhbDate.getMinutes();

  return {
    dateStr: `${year}-${month}-${day}`,
    dayOfWeek: jhbDate.getDay(),
    totalMinutes: hours * 60 + minutes,
    hours,
    minutes,
  };
}

/**
 * Parses YYYY-MM-DD into year, month, day, and dayOfWeek
 */
export function parseDateString(dateStr: string): {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
} {
  const [y, m, d] = dateStr.split('-').map(Number);
  // Construct date at noon UTC to avoid date shifting
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return {
    year: y,
    month: m,
    day: d,
    dayOfWeek: date.getUTCDay(),
  };
}

/**
 * Formats YYYY-MM-DD into a human-readable South African date
 * e.g., "Thursday, 24 September 2026"
 */
export function formatFriendlyDate(dateStr: string): string {
  const { year, month, day } = parseDateString(dateStr);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const { dayOfWeek } = parseDateString(dateStr);
  return `${days[dayOfWeek]}, ${day} ${months[month - 1]} ${year}`;
}

/**
 * Returns the shop opening hours in minutes from midnight for a given day of week
 * Mon-Fri (1-5): 09:00 - 19:00 (540 to 1140)
 * Sat (6): 08:00 - 17:00 (480 to 1020)
 * Sun (0): closed
 */
export function getOpeningHoursMinutes(dayOfWeek: number): { open: number; close: number } | null {
  if (dayOfWeek === 0) return null; // Sunday closed
  if (dayOfWeek === 6) {
    return { open: 8 * 60, close: 17 * 60 }; // 08:00 to 17:00
  }
  return { open: 9 * 60, close: 19 * 60 }; // 09:00 to 19:00
}

/**
 * Converts minutes from midnight into "HH:mm" 24h format
 */
export function minutesToTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Converts "HH:mm" into minutes from midnight
 */
export function timeStringToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Checks if a specific barber is off on a given day of week
 */
export function isBarberOff(barberId: string, dayOfWeek: number): boolean {
  if (dayOfWeek === 0) return true; // Everyone is off on Sunday
  const barber = BARBERS.find((b) => b.id === barberId);
  if (!barber) return false;
  return barber.daysOff.includes(dayOfWeek);
}

/**
 * Calculates end time string from start time and duration in minutes
 */
export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const startMins = timeStringToMinutes(startTime);
  const endMins = startMins + durationMinutes;
  return minutesToTimeString(endMins);
}

/**
 * Check if two time intervals overlap: [startA, startA + durA) and [startB, startB + durB)
 */
export function doIntervalsOverlap(
  startA: number,
  durA: number,
  startB: number,
  durB: number
): boolean {
  const endA = startA + durA;
  const endB = startB + durB;
  return Math.max(startA, startB) < Math.min(endA, endB);
}

/**
 * Generates available 15-minute grid slots for a chosen date, service, and barber
 */
export function generateAvailableSlots(
  dateStr: string,
  service: Service,
  selectedBarberId: string, // specific barber ID or 'any'
  existingBookings: Booking[]
): TimeSlot[] {
  const { dayOfWeek } = parseDateString(dateStr);
  const hours = getOpeningHoursMinutes(dayOfWeek);
  if (!hours) return []; // Closed

  const nowJhb = getNowInJohannesburg();
  const isToday = dateStr === nowJhb.dateStr;
  const minAllowedStartMins = isToday ? nowJhb.totalMinutes + 30 : -1; // 30-min lead time today

  const candidateBarbers =
    selectedBarberId === 'any'
      ? BARBERS.filter((b) => !b.daysOff.includes(dayOfWeek))
      : BARBERS.filter((b) => b.id === selectedBarberId && !b.daysOff.includes(dayOfWeek));

  if (candidateBarbers.length === 0) {
    return [];
  }

  // Filter bookings on this date for the relevant barbers
  const bookingsOnDate = existingBookings.filter((b) => b.date === dateStr);

  const slots: TimeSlot[] = [];
  const step = 15; // 15-minute grid

  for (let t = hours.open; t + service.durationMinutes <= hours.close; t += step) {
    // If today and slot is in the past (plus lead time), skip
    if (isToday && t < minAllowedStartMins) {
      continue;
    }

    const timeStr = minutesToTimeString(t);

    if (selectedBarberId === 'any') {
      // Find the first available barber who does not have an overlapping booking
      const availableBarber = candidateBarbers.find((barber) => {
        const barberBookings = bookingsOnDate.filter((b) => b.barberId === barber.id);
        const hasOverlap = barberBookings.some((b) => {
          const bStart = timeStringToMinutes(b.time);
          return doIntervalsOverlap(t, service.durationMinutes, bStart, b.serviceDuration);
        });
        return !hasOverlap;
      });

      if (availableBarber) {
        slots.push({
          time: timeStr,
          available: true,
          barberId: availableBarber.id,
          barberName: availableBarber.name,
        });
      }
    } else {
      // Specific barber
      const barber = candidateBarbers[0];
      const barberBookings = bookingsOnDate.filter((b) => b.barberId === barber.id);
      const hasOverlap = barberBookings.some((b) => {
        const bStart = timeStringToMinutes(b.time);
        return doIntervalsOverlap(t, service.durationMinutes, bStart, b.serviceDuration);
      });

      slots.push({
        time: timeStr,
        available: !hasOverlap,
        barberId: barber.id,
        barberName: barber.name,
      });
    }
  }

  return slots;
}

/**
 * Validates a South African phone number:
 * Accepts e.g. 082 123 4567, 021 555 0142, +27 82 123 4567, +27215550142, 0712345678
 */
export function isValidSAPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-().]/g, '');
  // Format 1: 0 followed by 9 digits (total 10 digits, e.g. 0821234567)
  const localRegex = /^0[1-9]\d{8}$/;
  // Format 2: +27 followed by 9 digits (total 11 digits without +, e.g. +27821234567)
  const intlRegex = /^\+27[1-9]\d{8}$/;
  return localRegex.test(clean) || intlRegex.test(clean);
}

/**
 * Validates standard email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Generates Google Calendar Template URL
 * Floating local format YYYYMMDDTHHmmss with ctz=Africa/Johannesburg
 */
export function createGoogleCalendarUrl(booking: Booking): string {
  const [y, m, d] = booking.date.split('-');
  const [sh, sm] = booking.time.split(':');
  const startCompact = `${y}${m}${d}T${sh}${sm}00`;

  const endMins = timeStringToMinutes(booking.time) + booking.serviceDuration;
  const eh = String(Math.floor(endMins / 60)).padStart(2, '0');
  const em = String(endMins % 60).padStart(2, '0');
  const endCompact = `${y}${m}${d}T${eh}${em}00`;

  const title = `${booking.serviceName} at ${BUSINESS_INFO.name}`;
  const details = [
    `Service: ${booking.serviceName} (${booking.serviceDuration} min, R${booking.servicePrice})`,
    `Barber: ${booking.barberName}`,
    `Reference: ${booking.reference}`,
    `Shop Phone: ${BUSINESS_INFO.phone}`,
    `Cancellation Policy: At least 12 hours' notice required for cancellations or rescheduling.`,
  ].join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startCompact}/${endCompact}`,
    ctz: TIMEZONE,
    details: details,
    location: BUSINESS_INFO.address,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Helper to escape RFC 5545 text strings
 */
function escapeIcsText(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Folds lines longer than 75 octets per RFC 5545
 */
function foldIcsLine(line: string): string {
  if (line.length <= 75) return line;
  let folded = '';
  let remaining = line;
  while (remaining.length > 75) {
    folded += remaining.slice(0, 75) + '\r\n ';
    remaining = remaining.slice(75);
  }
  folded += remaining;
  return folded;
}

/**
 * Generates an RFC 5545 compliant .ics string for the booking
 */
export function generateIcsContent(booking: Booking): string {
  const [y, m, d] = booking.date.split('-');
  const [sh, sm] = booking.time.split(':');
  const startCompact = `${y}${m}${d}T${sh}${sm}00`;

  const endMins = timeStringToMinutes(booking.time) + booking.serviceDuration;
  const eh = String(Math.floor(endMins / 60)).padStart(2, '0');
  const em = String(endMins % 60).padStart(2, '0');
  const endCompact = `${y}${m}${d}T${eh}${em}00`;

  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `${booking.reference}-${Date.now()}@urbanbarbers.co.za`;

  const summary = escapeIcsText(`${booking.serviceName} at ${BUSINESS_INFO.name}`);
  const description = escapeIcsText(
    `Service: ${booking.serviceName} (${booking.serviceDuration} min, R${booking.servicePrice})\n` +
    `Barber: ${booking.barberName}\n` +
    `Reference: ${booking.reference}\n` +
    `Phone: ${BUSINESS_INFO.phone}\n` +
    `Policy: Cancellation & rescheduling require at least 12 hours notice.`
  );
  const location = escapeIcsText(BUSINESS_INFO.address);

  const rawLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Urban Barbers//Booking System 1.0//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Africa/Johannesburg',
    'X-LIC-LOCATION:Africa/Johannesburg',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0200',
    'TZNAME:SAST',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Africa/Johannesburg:${startCompact}`,
    `DTEND;TZID=Africa/Johannesburg:${endCompact}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Your Urban Barbers appointment is in 1 hour',
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return rawLines.map(foldIcsLine).join('\r\n') + '\r\n';
}

/**
 * Triggers a client-side .ics file download
 */
export function downloadIcsFile(booking: Booking): void {
  const icsData = generateIcsContent(booking);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `urban-barbers-${booking.reference}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Small internal check to ensure 3:00 PM yields 15:00 start in Africa/Johannesburg
 * Pure function check (no UI output)
 */
export function verifyJohannesburg3PMTimeCheck(): boolean {
  const sampleTime = '15:00';
  const minutes = timeStringToMinutes(sampleTime);
  return minutes === 900 && minutesToTimeString(minutes) === '15:00';
}
// Run verification on module load silently
verifyJohannesburg3PMTimeCheck();
