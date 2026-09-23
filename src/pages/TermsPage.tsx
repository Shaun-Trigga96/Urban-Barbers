import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

export default function TermsPage() {
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
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F1EA] mb-3">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-[#9A9A9A]">
            Last updated: 1 September 2026 · Effective for all Urban Barbers services
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-[#9A9A9A] text-sm sm:text-base leading-relaxed space-y-10">
          {/* 1. Acceptance */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website, booking an appointment through our digital system, contacting us via phone or WhatsApp, or receiving services at Urban Barbers (located at 24 Kloof Street, Gardens, Cape Town, South Africa), you agree to be bound by these Terms and Conditions. If you do not accept these terms, please do not use our services.
            </p>
          </section>

          {/* 2. Bookings & Confirmation */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              2. Bookings and Confirmation
            </h2>
            <p>
              All appointments are booked on a confirmed basis and reserved specifically for you. Upon completing the online booking flow, you will receive a unique booking reference (e.g. BK-XXXXXX) and an email summary confirming your service, assigned barber, date, and scheduled start time. Walk-ins are welcomed subject to chair availability, but priority is given to confirmed reservations.
            </p>
          </section>

          {/* 3. Arriving on Time & 10-Minute Lateness Grace Period */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              3. Arriving on Time and Lateness Grace Period
            </h2>
            <p>
              To maintain our strict 15-minute scheduling grid and avoid delays for subsequent clients, we ask that you arrive 5 minutes before your scheduled start time. We provide a <strong className="text-[#F5F1EA]">10-minute grace period</strong> for unforeseen traffic or delays. If you arrive more than 10 minutes past your appointment time, we reserve the right to shorten your service or reschedule your booking so as not to compromise our next client's chair time.
            </p>
          </section>

          {/* 4. Cancellation & Rescheduling */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              4. Cancellation and Rescheduling Policy
            </h2>
            <p>
              We understand that schedules change unexpectedly. We kindly request at least <strong className="text-[#F5F1EA]">12 hours' advance notice</strong> for any cancellations or requests to reschedule. Notice may be given via phone call or WhatsApp message to {BUSINESS_INFO.phone}. Timely notice allows us to offer the reserved chair to clients on our daily standby list.
            </p>
          </section>

          {/* 5. No-Shows */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              5. No-Shows
            </h2>
            <p>
              Clients who fail to attend a confirmed appointment without providing advance notice cause significant disruption to our barbers' schedules. Repeated no-shows (2 or more instances) may require pre-payment or deposit prior to future bookings being accepted.
            </p>
          </section>

          {/* 6. Pricing & Payment */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              6. Pricing and Payment
            </h2>
            <p>
              All prices displayed on our website and in-shop are quoted in South African Rand (ZAR) and are inclusive of VAT where applicable. Payment is due immediately upon completion of your service at our Kloof Street shop. We accept Visa, Mastercard, cash, and SnapScan. Prices are subject to periodic review and change; however, your confirmed booking will always honor the price displayed at the time of reservation.
            </p>
          </section>

          {/* 7. Service Satisfaction & Adjustments Within 48 Hours */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              7. Service Satisfaction and 48-Hour Adjustment Guarantee
            </h2>
            <p>
              Your satisfaction is our cornerstone. If for any reason your haircut, fade, or beard shape is not sitting right, please contact us or revisit our shop within <strong className="text-[#F5F1EA]">48 hours of your appointment</strong>. We will happily adjust, balance, or refine your cut free of charge. Due to the personal nature of barbering, refunds are not issued once a service has been carried out in good faith.
            </p>
          </section>

          {/* 8. Children */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              8. Children and Minors
            </h2>
            <p>
              Children under the age of 12 receiving a Kids Cut must be accompanied by a parent or legal guardian throughout the duration of the appointment. To ensure safety around sharp scissors, hot water, clippers, and razors, children must remain seated or supervised at all times.
            </p>
          </section>

          {/* 9. Health, Skin & Allergy Disclosure */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              9. Health, Skin Conditions, and Allergy Disclosure
            </h2>
            <p>
              Clients must notify their barber prior to any service regarding any known allergies (e.g., essential oils, eucalyptus, tea tree, latex, alcohol-based tonics), sensitive skin, scalp conditions, cold sores, contagious skin lesions, or blood disorders. If a barber identifies an active skin infection or condition that poses a health risk, we reserve the right to decline or modify the service in accordance with municipal health standards.
            </p>
          </section>

          {/* 10. Conduct */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              10. In-Shop Conduct
            </h2>
            <p>
              Urban Barbers is an inclusive, respectful space for all individuals. We maintain zero tolerance for abusive, threatening, discriminatory, or harassing behavior directed toward our staff, fellow barbers, or other patrons. We reserve the right to refuse service and escort individuals from the premises if conduct is deemed unacceptable.
            </p>
          </section>

          {/* 11. Personal Belongings & Liability */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              11. Personal Belongings and Liability
            </h2>
            <p>
              While we take every reasonable care, clients are responsible for their personal possessions (phones, coats, bags, glasses, and jewelry) while inside the shop. Urban Barbers accepts no liability for accidental loss, theft, or damage to personal items brought onto the premises.
            </p>
          </section>

          {/* 12. Intellectual Property */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              12. Intellectual Property
            </h2>
            <p>
              All logos, brand names, graphics, text, service descriptions, and photographic assets displayed on this website are the property of Urban Barbers and protected by applicable copyright and trademark legislation. Unauthorized reproduction, scraping, or commercial exploitation is strictly prohibited.
            </p>
          </section>

          {/* 13. Privacy */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              13. Privacy and Data Handling
            </h2>
            <p>
              We handle your personal contact and reservation information with strict confidentiality. For comprehensive information regarding what details we collect, how they are stored, and how you may request deletion, please read our{' '}
              <Link to="/privacy" className="text-[#C8A15A] hover:underline font-medium">
                Privacy Policy
              </Link>.
            </p>
          </section>

          {/* 14. Changes to Terms */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              14. Changes to Terms
            </h2>
            <p>
              We may revise these Terms and Conditions from time to time. Any amendments will be reflected on this page with an updated revision date. Continued booking or shop visitation following amendments constitutes your acceptance of the revised terms.
            </p>
          </section>

          {/* 15. Governing Law */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              15. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the Western Cape High Court in Cape Town.
            </p>
          </section>

          {/* 16. Contact Details */}
          <section className="pt-6 border-t border-[#262626]">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] mb-3">
              16. Contact Details
            </h2>
            <p>
              If you have any questions, feedback, or concerns regarding these terms, please contact our management team:
            </p>
            <div className="mt-3 text-xs sm:text-sm text-[#F5F1EA] space-y-1">
              <p><strong>Urban Barbers</strong></p>
              <p>24 Kloof Street, Gardens, Cape Town, 8001, South Africa</p>
              <p>Telephone: {BUSINESS_INFO.phone}</p>
              <p>Email: {BUSINESS_INFO.email}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
