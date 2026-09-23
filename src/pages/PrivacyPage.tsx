import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#0F0F0F] text-[#F5F1EA] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8A15A] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <div className="border-b border-[#282828] pb-8 mb-12">
          <div className="w-12 h-12 rounded-xl bg-[#C8A15A]/15 border border-[#C8A15A]/30 flex items-center justify-center text-[#C8A15A] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F1EA] mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#9A9A9A]">
            Last updated: 1 September 2026 · South Africa POPIA Compliant
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-[#9A9A9A] text-sm sm:text-base leading-relaxed space-y-10">
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you book an appointment with Urban Barbers, we collect minimal personal information strictly necessary to deliver and confirm your service:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-[#F5F1EA]">Full Name:</strong> to identify your booking and seat you with your assigned barber.</li>
              <li><strong className="text-[#F5F1EA]">Email Address:</strong> to transmit booking confirmations, cancellation notices, and calendar files.</li>
              <li><strong className="text-[#F5F1EA]">Mobile Phone Number:</strong> to send SMS reminders or contact you in the event of an urgent schedule change.</li>
              <li><strong className="text-[#F5F1EA]">Appointment Notes & History:</strong> any optional notes you submit regarding hair preferences, allergies, or past services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              Your data is utilized exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Managing chair schedules, booking slots, and preventing double-reservations.</li>
              <li>Direct customer service communications (such as appointment confirmations or rescheduling requests).</li>
              <li>Providing optional introductory discount codes if you voluntarily subscribed to our first-visit offer.</li>
            </ul>
            <p className="mt-3">
              We <strong className="text-[#F5F1EA]">never sell, rent, lease, or monetize</strong> your personal contact details to third-party advertisers, data brokers, or marketing syndicates.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              3. Data Storage & Security
            </h2>
            <p>
              Your booking data is stored securely using cloud infrastructure (Google Firebase Firestore) with SSL encryption in transit and at rest, or locally in your browser storage when operating in offline/fallback mode. Access is restricted to authorized Urban Barbers administrative personnel.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              4. Your Rights & Data Removal Requests
            </h2>
            <p>
              In accordance with the Protection of Personal Information Act (POPIA) of South Africa, you have the right to request access to the personal data we hold about you, request corrections, or ask for the complete deletion of your records from our systems.
            </p>
            <p className="mt-3">
              To request the permanent removal of your booking history or email address, please write to us at{' '}
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#C8A15A] hover:underline">
                {BUSINESS_INFO.email}
              </a>{' '}
              with the subject line <em>"Data Removal Request"</em>. We will process and confirm your request within 5 business days.
            </p>
          </section>

          <section className="pt-6 border-t border-[#262626]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              5. Contact Our Privacy Officer
            </h2>
            <p>
              Urban Barbers<br />
              24 Kloof Street, Gardens, Cape Town, 8001, South Africa<br />
              Phone: {BUSINESS_INFO.phone}<br />
              Email: {BUSINESS_INFO.email}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
