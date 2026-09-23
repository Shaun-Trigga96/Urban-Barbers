import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Share2,
  CalendarPlus,
  Download,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import { BARBERS, BUSINESS_INFO, SERVICES } from '../data/barbershopData';
import { Barber, Booking, CustomerFormData, Service, TimeSlot } from '../types';
import {
  calculateEndTime,
  createGoogleCalendarUrl,
  downloadIcsFile,
  formatFriendlyDate,
  generateAvailableSlots,
  getNowInJohannesburg,
  isBarberOff,
  isValidEmail,
  isValidSAPhone,
  parseDateString,
} from '../utils/dateTime';
import { checkSlotAvailability, getBookings, saveBooking } from '../lib/bookingStorage';

type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 'confirmed';

export default function ContactBookingPage() {
  const [searchParams] = useSearchParams();

  // Current step state
  const [step, setStep] = useState<BookingStep>(1);

  // Selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedBarberId, setSelectedBarberId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [assignedBarber, setAssignedBarber] = useState<{ id: string; name: string } | null>(null);

  // Customer Form
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<{ [K in keyof CustomerFormData]?: string }>({});

  // Existing bookings for availability calculations
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Check if first-visit promo was claimed
  const hasPromo = useMemo(() => {
    try {
      return localStorage.getItem('urban_barbers_promo_claimed') === 'FIRST10';
    } catch {
      return false;
    }
  }, [step]);

  // Load existing bookings on mount
  useEffect(() => {
    setIsLoadingBookings(true);
    getBookings()
      .then((data) => setExistingBookings(data))
      .finally(() => setIsLoadingBookings(false));
  }, []);

  // Handle URL query parameters for pre-selection
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const barberParam = searchParams.get('barber');

    if (serviceParam && SERVICES.some((s) => s.id === serviceParam)) {
      setSelectedServiceId(serviceParam);
    }
    if (barberParam && (barberParam === 'any' || BARBERS.some((b) => b.id === barberParam))) {
      setSelectedBarberId(barberParam);
    }
  }, [searchParams]);

  // Derived objects
  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId) || null,
    [selectedServiceId]
  );

  const selectedBarber = useMemo(
    () => (selectedBarberId === 'any' ? null : BARBERS.find((b) => b.id === selectedBarberId) || null),
    [selectedBarberId]
  );

  // Generate 30 days of bookable dates
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; dayOfWeek: number; label: string; available: boolean; reason?: string }[] = [];
    const nowJhb = getNowInJohannesburg();
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const target = new Date();
      target.setDate(today.getDate() + i);

      const y = target.getFullYear();
      const m = String(target.getMonth() + 1).padStart(2, '0');
      const d = String(target.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      const dayOfWeek = target.getDay();

      let available = true;
      let reason: string | undefined;

      // Sundays are closed
      if (dayOfWeek === 0) {
        available = false;
        reason = 'Closed on Sundays';
      } else if (selectedBarberId !== 'any' && isBarberOff(selectedBarberId, dayOfWeek)) {
        available = false;
        const b = BARBERS.find((item) => item.id === selectedBarberId);
        reason = `${b?.nickname || b?.name || 'Barber'} is off`;
      }

      dates.push({
        dateStr,
        dayOfWeek,
        label: formatFriendlyDate(dateStr),
        available,
        reason,
      });
    }

    return dates;
  }, [selectedBarberId]);

  // Generate 15-minute grid slots for the selected date & service
  const availableSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return [];
    return generateAvailableSlots(selectedDate, selectedService, selectedBarberId, existingBookings);
  }, [selectedDate, selectedService, selectedBarberId, existingBookings]);

  // Form validation
  function validateForm(): boolean {
    const errors: { [K in keyof CustomerFormData]?: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!isValidSAPhone(formData.phone)) {
      errors.phone = 'Valid South African number required (e.g. 082 123 4567 or +27 82 123 4567).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Handle final submission
  async function handleConfirmBooking() {
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const barberToAssignId = assignedBarber?.id || (selectedBarber ? selectedBarber.id : BARBERS[0].id);
    const barberToAssignName = assignedBarber?.name || (selectedBarber ? selectedBarber.name : BARBERS[0].name);

    try {
      // Step 1: Re-check availability immediately before saving to prevent double-booking
      const isStillAvailable = await checkSlotAvailability(
        selectedDate,
        selectedTime,
        selectedService.durationMinutes,
        barberToAssignId
      );

      if (!isStillAvailable) {
        setSubmissionError(
          'We apologize, but this time slot was just taken by another client. Please choose another convenient time.'
        );
        // Refresh bookings and send user back to Step 4 (Time selection)
        const updated = await getBookings();
        setExistingBookings(updated);
        setStep(4);
        setIsSubmitting(false);
        return;
      }

      // Step 2: Save the booking
      const saved = await saveBooking({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        serviceDuration: selectedService.durationMinutes,
        servicePrice: selectedService.priceZAR,
        barberId: barberToAssignId,
        barberName: barberToAssignName,
        date: selectedDate,
        time: selectedTime,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        notes: formData.notes.trim() || undefined,
      });

      // Update local state and move to confirmation screen
      setConfirmedBooking(saved);
      setStep('confirmed');
    } catch {
      setSubmissionError('An unexpected error occurred while saving your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleResetBooking() {
    setSelectedServiceId('');
    setSelectedBarberId('any');
    setSelectedDate('');
    setSelectedTime('');
    setAssignedBarber(null);
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setFormErrors({});
    setSubmissionError(null);
    setConfirmedBooking(null);
    setStep(1);
    // Reload bookings
    getBookings().then(setExistingBookings);
  }

  return (
    <div className="w-full bg-[#0F0F0F] text-[#F5F1EA] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-2">
            Instant Online Appointments
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F1EA]">
            Book Your Chair
          </h1>
          <p className="text-sm text-[#9A9A9A] mt-3 font-light">
            Real-time availability on our 15-minute grid. Pay in-shop after your cut.
          </p>
        </div>

        {/* Main Content Layout: Booking Area (Left/Main) + Business Details (Right/Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Booking Area */}
          <div className="lg:col-span-8 bg-[#161616] border border-[#2B2B2B] rounded-2xl p-6 sm:p-8 shadow-xl">
            {step !== 'confirmed' && (
              <>
                {/* Step Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9A9A9A] mb-3">
                    <span className="text-[#C8A15A] font-semibold">
                      Step {step} of 6
                    </span>
                    <span className="text-[#9A9A9A]">
                      {step === 1 && 'Select Service'}
                      {step === 2 && 'Select Barber'}
                      {step === 3 && 'Select Date'}
                      {step === 4 && 'Select Time Slot'}
                      {step === 5 && 'Customer Information'}
                      {step === 6 && 'Review & Confirm'}
                    </span>
                  </div>
                  <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C8A15A] h-full transition-all duration-300"
                      style={{ width: `${(step / 6) * 100}%` }}
                    />
                  </div>
                </div>

                {submissionError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                    <span>{submissionError}</span>
                  </div>
                )}
              </>
            )}

            {/* STEP 1: CHOOSE SERVICE */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F5F1EA] mb-2">
                  1. Select a Service
                </h2>
                <p className="text-xs text-[#9A9A9A] mb-6">
                  Pick the grooming treatment or combination you require.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                  {SERVICES.map((s) => {
                    const isSelected = selectedServiceId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedServiceId(s.id)}
                        className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#C8A15A]/10 border-[#C8A15A] shadow-md shadow-[#C8A15A]/5'
                            : 'bg-[#1C1C1C] border-[#2E2E2E] hover:border-[#3D3D3D]'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="font-serif font-bold text-[#F5F1EA] text-base">
                              {s.name}
                            </span>
                            <span className="font-mono font-bold text-[#C8A15A] text-sm shrink-0">
                              R{s.priceZAR}
                            </span>
                          </div>
                          <p className="text-xs text-[#9A9A9A] line-clamp-2 mb-3">
                            {s.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#7A7A7A] pt-2 border-t border-[#262626]">
                          <span className="font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#C8A15A]" />
                            {s.durationMinutes} minutes
                          </span>
                          <span className="text-[#C8A15A] font-medium">
                            {isSelected ? '✓ Selected' : 'Select'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={!selectedServiceId}
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] disabled:opacity-40 disabled:cursor-not-allowed transition-all min-h-[44px]"
                  >
                    <span>Next: Select Barber</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE BARBER */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F5F1EA] mb-2">
                  2. Choose Your Barber
                </h2>
                <p className="text-xs text-[#9A9A9A] mb-6">
                  Select a specific craftsman or choose "Any available barber" for the widest appointment availability.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Any available option */}
                  <button
                    type="button"
                    onClick={() => setSelectedBarberId('any')}
                    className={`p-5 rounded-xl text-left border transition-all ${
                      selectedBarberId === 'any'
                        ? 'bg-[#C8A15A]/10 border-[#C8A15A]'
                        : 'bg-[#1C1C1C] border-[#2E2E2E] hover:border-[#3D3D3D]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#262626] border border-[#3A3A3A] flex items-center justify-center text-[#C8A15A]">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-[#F5F1EA] text-base">
                          Any Available Barber
                        </h3>
                        <span className="text-[11px] text-[#C8A15A]">Fastest booking</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed">
                      We'll automatically match you with the first free craftsman on your preferred date and time.
                    </p>
                  </button>

                  {/* Individual Barbers */}
                  {BARBERS.map((barber) => {
                    const isSelected = selectedBarberId === barber.id;
                    return (
                      <button
                        key={barber.id}
                        type="button"
                        onClick={() => setSelectedBarberId(barber.id)}
                        className={`p-5 rounded-xl text-left border transition-all flex items-start gap-4 ${
                          isSelected
                            ? 'bg-[#C8A15A]/10 border-[#C8A15A]'
                            : 'bg-[#1C1C1C] border-[#2E2E2E] hover:border-[#3D3D3D]'
                        }`}
                      >
                        <img
                          src={barber.image}
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#3A3A3A]"
                        />
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h3 className="font-serif font-bold text-[#F5F1EA] text-base">
                              {barber.name}
                            </h3>
                          </div>
                          <span className="text-xs text-[#C8A15A] block mb-1">
                            {barber.role} · {barber.experienceYears}y exp
                          </span>
                          <p className="text-[11px] text-[#9A9A9A] line-clamp-2">
                            Specialty: {barber.specialty}
                          </p>
                          <span className="text-[10px] text-[#7A7A7A] block mt-1">
                            {barber.daysOff.includes(1)
                              ? 'Off Mondays'
                              : barber.daysOff.includes(3)
                              ? 'Off Wednesdays'
                              : 'Mon – Sat'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#3A3A3A] text-sm text-[#F5F1EA] hover:border-[#C8A15A] min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] min-h-[44px]"
                  >
                    <span>Next: Choose Date</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE DATE */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F5F1EA] mb-2">
                  3. Select an Appointment Date
                </h2>
                <p className="text-xs text-[#9A9A9A] mb-6">
                  Appointments can be booked up to 30 days ahead. Sundays are closed.
                  {selectedBarber && (
                    <span>
                      {' '}Note: {selectedBarber.nickname || selectedBarber.name} is unavailable on{' '}
                      {selectedBarber.daysOff.includes(1) ? 'Mondays' : 'Wednesdays'}.
                    </span>
                  )}
                </p>

                {/* Calendar Date Picker Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    const { day, month, dayOfWeek } = parseDateString(item.dateStr);
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                    return (
                      <button
                        key={item.dateStr}
                        type="button"
                        disabled={!item.available}
                        onClick={() => {
                          setSelectedDate(item.dateStr);
                          setSelectedTime(''); // Reset time selection on date switch
                        }}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[78px] ${
                          isSelected
                            ? 'bg-[#C8A15A] border-[#C8A15A] text-[#0F0F0F] font-bold shadow-md'
                            : item.available
                            ? 'bg-[#1C1C1C] border-[#2E2E2E] hover:border-[#C8A15A]/60 text-[#F5F1EA]'
                            : 'bg-[#141414] border-[#222222] text-[#555555] opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <span className={`text-[11px] uppercase tracking-wider ${isSelected ? 'text-[#0F0F0F]/80' : 'text-[#9A9A9A]'}`}>
                          {dayNames[dayOfWeek]}
                        </span>
                        <span className="text-xl font-bold font-mono">
                          {day} {monthNames[month - 1]}
                        </span>
                        {!item.available && (
                          <span className="text-[10px] text-[#777777] mt-0.5">
                            {item.reason}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#3A3A3A] text-sm text-[#F5F1EA] hover:border-[#C8A15A] min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    disabled={!selectedDate}
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    <span>Next: Select Time</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CHOOSE TIME */}
            {step === 4 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-[#F5F1EA]">
                    4. Choose an Available Slot
                  </h2>
                  <span className="text-xs font-mono text-[#C8A15A]">
                    {formatFriendlyDate(selectedDate)}
                  </span>
                </div>
                <p className="text-xs text-[#9A9A9A] mb-6">
                  15-minute grid based on the {selectedService?.durationMinutes} min duration of {selectedService?.name}. Times shown in Africa/Johannesburg (UTC+2).
                </p>

                {availableSlots.length === 0 ? (
                  <div className="p-8 text-center bg-[#1A1A1A] border border-[#2B2B2B] rounded-2xl">
                    <Clock className="w-10 h-10 text-[#C8A15A] mx-auto mb-3" />
                    <h3 className="font-serif text-lg font-bold text-[#F5F1EA] mb-1">
                      No Slots Available On This Date
                    </h3>
                    <p className="text-xs text-[#9A9A9A] max-w-sm mx-auto mb-6">
                      All slots for {selectedBarber?.name || 'our team'} are currently occupied or outside operating hours on this date.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-lg border border-[#C8A15A] text-[#C8A15A] text-xs font-semibold hover:bg-[#C8A15A]/10 min-h-[44px]"
                    >
                      Choose Another Date
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      const endTime = selectedService
                        ? calculateEndTime(slot.time, selectedService.durationMinutes)
                        : '';

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => {
                            setSelectedTime(slot.time);
                            if (slot.barberId && slot.barberName) {
                              setAssignedBarber({ id: slot.barberId, name: slot.barberName });
                            }
                          }}
                          className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[64px] ${
                            isSelected
                              ? 'bg-[#C8A15A] border-[#C8A15A] text-[#0F0F0F] font-bold shadow-md'
                              : slot.available
                              ? 'bg-[#1C1C1C] border-[#2E2E2E] hover:border-[#C8A15A]/60 text-[#F5F1EA]'
                              : 'bg-[#141414] border-[#222222] text-[#555555] opacity-40 cursor-not-allowed'
                          }`}
                        >
                          <span className="font-mono text-base font-bold">
                            {slot.time}
                          </span>
                          <span className={`text-[10px] ${isSelected ? 'text-[#0F0F0F]/80' : 'text-[#7A7A7A]'}`}>
                            until {endTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#3A3A3A] text-sm text-[#F5F1EA] hover:border-[#C8A15A] min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    disabled={!selectedTime}
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    <span>Next: Customer Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CUSTOMER DETAILS */}
            {step === 5 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F5F1EA] mb-2">
                  5. Customer Details
                </h2>
                <p className="text-xs text-[#9A9A9A] mb-6">
                  Please provide your contact details for appointment confirmation and SMS/WhatsApp updates.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="customer-name" className="block text-xs font-medium text-[#F5F1EA] mb-1.5">
                      Full Name <span className="text-[#C8A15A]">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      placeholder="e.g. Siphesihle Zulu"
                      className="w-full px-4 py-3 rounded-xl bg-[#1C1C1C] border border-[#2E2E2E] text-[#F5F1EA] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A]"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-rose-400 font-medium">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customer-email" className="block text-xs font-medium text-[#F5F1EA] mb-1.5">
                        Email Address <span className="text-[#C8A15A]">*</span>
                      </label>
                      <input
                        id="customer-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                        }}
                        placeholder="name@domain.co.za"
                        className="w-full px-4 py-3 rounded-xl bg-[#1C1C1C] border border-[#2E2E2E] text-[#F5F1EA] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A]"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-rose-400 font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="customer-phone" className="block text-xs font-medium text-[#F5F1EA] mb-1.5">
                        South African Mobile Phone <span className="text-[#C8A15A]">*</span>
                      </label>
                      <input
                        id="customer-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                        }}
                        placeholder="e.g. 082 123 4567"
                        className="w-full px-4 py-3 rounded-xl bg-[#1C1C1C] border border-[#2E2E2E] text-[#F5F1EA] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A]"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-rose-400 font-medium">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customer-notes" className="block text-xs font-medium text-[#F5F1EA] mb-1.5">
                      Optional Notes or Styling Requests
                    </label>
                    <textarea
                      id="customer-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Skin sensitivity, low taper preference, or beard length notes"
                      className="w-full px-4 py-3 rounded-xl bg-[#1C1C1C] border border-[#2E2E2E] text-[#F5F1EA] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A] resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#3A3A3A] text-sm text-[#F5F1EA] hover:border-[#C8A15A] min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateForm()) {
                        setStep(6);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] min-h-[44px]"
                  >
                    <span>Next: Review & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & CONFIRM */}
            {step === 6 && selectedService && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F5F1EA] mb-2">
                  6. Review & Confirm
                </h2>
                <p className="text-xs text-[#9A9A9A] mb-6">
                  Please review your appointment summary before submitting.
                </p>

                <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-6 space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                    <div>
                      <span className="text-xs text-[#9A9A9A] uppercase tracking-wider block">Service</span>
                      <span className="font-serif text-lg font-bold text-[#F5F1EA]">{selectedService.name}</span>
                    </div>
                    <span className="font-mono text-xl font-bold text-[#C8A15A]">R{selectedService.priceZAR}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#9A9A9A] block mb-0.5">Barber</span>
                      <span className="font-medium text-[#F5F1EA]">
                        {assignedBarber?.name || selectedBarber?.name || 'Any Available Barber'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9A9A9A] block mb-0.5">Duration</span>
                      <span className="font-mono text-[#F5F1EA]">{selectedService.durationMinutes} minutes</span>
                    </div>
                    <div>
                      <span className="text-[#9A9A9A] block mb-0.5">Date</span>
                      <span className="font-medium text-[#F5F1EA]">{formatFriendlyDate(selectedDate)}</span>
                    </div>
                    <div>
                      <span className="text-[#9A9A9A] block mb-0.5">Time</span>
                      <span className="font-mono text-[#F5F1EA]">
                        {selectedTime} – {calculateEndTime(selectedTime, selectedService.durationMinutes)} (SAST)
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#9A9A9A] block mb-0.5">Location</span>
                      <span className="text-[#F5F1EA]">{BUSINESS_INFO.address}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#262626] text-xs">
                    <span className="text-[#9A9A9A] block mb-0.5">Client</span>
                    <span className="font-medium text-[#F5F1EA]">{formData.name}</span>
                    <span className="text-[#7A7A7A] block">{formData.email} · {formData.phone}</span>
                    {formData.notes && (
                      <p className="mt-1 text-[#9A9A9A] italic">Note: "{formData.notes}"</p>
                    )}
                  </div>
                </div>

                {/* Pay In Shop notice */}
                <div className="p-4 rounded-xl bg-[#C8A15A]/10 border border-[#C8A15A]/25 mb-6 text-xs text-[#F5F1EA] flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#C8A15A]">Payment is Pay-In-Shop:</strong> No payment is taken online. You can settle via Card, Cash, or SnapScan once your service is completed.
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#3A3A3A] text-sm text-[#F5F1EA] hover:border-[#C8A15A] min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleConfirmBooking}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-bold text-sm hover:bg-[#D8B268] active:scale-[0.98] transition-all shadow-xl shadow-[#C8A15A]/15 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>Reserving Chair...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* CONFIRMED SCREEN */}
            {step === 'confirmed' && confirmedBooking && (
              <div className="py-2 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h2 className="font-serif text-3xl font-bold text-[#F5F1EA] text-center mb-1">
                  Appointment Confirmed!
                </h2>
                <p className="text-xs text-[#9A9A9A] text-center mb-6">
                  We look forward to welcoming you at Urban Barbers on Kloof Street.
                </p>

                {/* Booking Reference Box */}
                <div className="bg-[#1C1C1C] border border-[#C8A15A]/40 rounded-2xl p-6 mb-6 text-center">
                  <span className="text-xs text-[#9A9A9A] uppercase tracking-wider block mb-1">
                    Booking Reference
                  </span>
                  <span className="font-mono text-3xl font-extrabold text-[#C8A15A] tracking-wider block mb-2">
                    {confirmedBooking.reference}
                  </span>
                  <p className="text-xs text-[#9A9A9A]">
                    A copy of your reservation details has been registered to{' '}
                    <strong className="text-[#F5F1EA]">{confirmedBooking.customerEmail}</strong>.
                  </p>
                </div>

                {/* Summary Table */}
                <div className="bg-[#181818] border border-[#2B2B2B] rounded-2xl p-6 space-y-3 mb-6 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#242424]">
                    <span className="text-[#9A9A9A]">Service</span>
                    <span className="font-bold text-[#F5F1EA]">{confirmedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#242424]">
                    <span className="text-[#9A9A9A]">Barber</span>
                    <span className="font-medium text-[#F5F1EA]">{confirmedBooking.barberName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#242424]">
                    <span className="text-[#9A9A9A]">Date</span>
                    <span className="font-medium text-[#F5F1EA]">{formatFriendlyDate(confirmedBooking.date)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#242424]">
                    <span className="text-[#9A9A9A]">Time</span>
                    <span className="font-mono text-[#F5F1EA]">
                      {confirmedBooking.time} (Duration: {confirmedBooking.serviceDuration} min)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#242424]">
                    <span className="text-[#9A9A9A]">Price & Payment</span>
                    <span className="font-mono font-bold text-[#C8A15A]">
                      R{confirmedBooking.servicePrice} · Pay In-Shop
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#9A9A9A]">Address</span>
                    <span className="text-right text-[#F5F1EA]">{BUSINESS_INFO.address}</span>
                  </div>
                </div>

                {/* Promo Code claimed reminder if user claimed FIRST10 */}
                {hasPromo && (
                  <div className="p-4 rounded-xl bg-[#C8A15A]/10 border border-[#C8A15A]/30 mb-6 flex items-start gap-3 text-xs text-[#F5F1EA]">
                    <Sparkles className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#C8A15A]">First-Visit Promo Code: FIRST10</span>
                      <p className="text-[#9A9A9A] mt-0.5">
                        Mention promo code <strong className="text-[#F5F1EA]">FIRST10</strong> when paying at the register in-shop for 10% off your introductory service.
                      </p>
                    </div>
                  </div>
                )}

                {/* Calendar Integration Buttons */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-semibold text-[#F5F1EA] uppercase tracking-wider text-center">
                    Add To Your Calendar
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={createGoogleCalendarUrl(confirmedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#262626] border border-[#3A3A3A] text-xs font-semibold text-[#F5F1EA] hover:border-[#C8A15A] hover:text-[#C8A15A] transition-colors min-h-[44px]"
                    >
                      <CalendarPlus className="w-4 h-4 text-[#C8A15A]" />
                      <span>Add to Google Calendar</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => downloadIcsFile(confirmedBooking)}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#262626] border border-[#3A3A3A] text-xs font-semibold text-[#F5F1EA] hover:border-[#C8A15A] hover:text-[#C8A15A] transition-colors min-h-[44px]"
                    >
                      <Download className="w-4 h-4 text-[#C8A15A]" />
                      <span>Apple / Outlook (.ics)</span>
                    </button>
                  </div>
                </div>

                {/* Book Another Appointment Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#262626]">
                  <button
                    type="button"
                    onClick={handleResetBooking}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#3A3A3A] text-xs font-semibold text-[#F5F1EA] hover:border-[#C8A15A] min-h-[44px]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Book Another Appointment</span>
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C8A15A] text-[#0F0F0F] text-xs font-semibold hover:bg-[#D8B268] min-h-[44px]"
                  >
                    <span>Return To Homepage</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Business Info & Map Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Shop Details Card */}
            <div className="bg-[#161616] border border-[#2B2B2B] rounded-2xl p-6">
              <h3 className="font-serif text-xl font-bold text-[#F5F1EA] mb-4">
                Shop Location & Hours
              </h3>

              <div className="space-y-4 text-xs text-[#9A9A9A]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F5F1EA] block mb-0.5">Address</strong>
                    <span>{BUSINESS_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F5F1EA] block mb-0.5">Phone & WhatsApp</strong>
                    <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="hover:text-[#F5F1EA] block">
                      {BUSINESS_INFO.phone}
                    </a>
                    <a
                      href={BUSINESS_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline block mt-0.5 font-medium"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F5F1EA] block mb-0.5">Email</strong>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#F5F1EA]">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#262626]">
                  <Clock className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                  <div className="space-y-1 w-full">
                    <strong className="text-[#F5F1EA] block">Operating Hours</strong>
                    <div className="flex justify-between">
                      <span>Mon – Fri</span>
                      <span className="font-mono text-[#F5F1EA]">09:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-mono text-[#F5F1EA]">08:00 – 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-[#C8A15A]">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-[#161616] border border-[#2B2B2B] rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-[#262626] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F5F1EA]">Find Us On Kloof Street</span>
                <span className="text-[10px] text-[#C8A15A]">Gardens, Cape Town</span>
              </div>
              <div className="aspect-[4/3] w-full bg-[#1A1A1A]">
                <iframe
                  title="Urban Barbers Google Map Location"
                  src={BUSINESS_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Fair Policy Card */}
            <div className="bg-[#161616] border border-[#2B2B2B] rounded-2xl p-5 text-xs text-[#9A9A9A]">
              <h4 className="font-serif font-bold text-[#F5F1EA] mb-2">
                Need to reschedule?
              </h4>
              <p className="leading-relaxed mb-3">
                Please notify us at least 12 hours prior to your scheduled time via phone or WhatsApp so we can accommodate others.
              </p>
              <Link to="/terms" className="text-[#C8A15A] hover:underline font-medium">
                View Shop Policies & Terms →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
