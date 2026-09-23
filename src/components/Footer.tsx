import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Facebook, Calendar, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

// TikTok custom icon SVG
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-[#2C2C2C] text-[#9A9A9A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#2C2C2C]">
          {/* Column 1: Brand & Blurb */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.svg"
                alt="Urban Barbers Cape Town"
                className="h-12 w-12 object-contain"
              />
              <span className="font-serif text-2xl font-bold text-[#F5F1EA]">
                Urban Barbers
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#9A9A9A]">
              Sharp cuts. Sharper standards. Located in the vibrant heart of Kloof Street,
              Cape Town. We merge classical heritage barbering with progressive craftsmanship.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Barbers on Instagram"
                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#F5F1EA] hover:text-[#C8A15A] hover:border-[#C8A15A] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Barbers on Facebook"
                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#F5F1EA] hover:text-[#C8A15A] hover:border-[#C8A15A] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urban Barbers on TikTok"
                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#F5F1EA] hover:text-[#C8A15A] hover:border-[#C8A15A] transition-all"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Urban Barbers on WhatsApp"
                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#F5F1EA] hover:text-[#25D366] hover:border-[#25D366] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-semibold text-[#F5F1EA] tracking-wide">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A15A]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A15A]" />
                  <span>Services & Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A15A]" />
                  <span>About Our Shop & Team</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A15A]" />
                  <span>Book Appointment / Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#C8A15A] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A15A]" />
                  <span>Cancellation Policy & Terms</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-semibold text-[#F5F1EA] tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C8A15A]" />
              <span>Opening Hours</span>
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between py-1 border-b border-[#242424]">
                <span>Monday – Friday</span>
                <span className="text-[#F5F1EA] font-mono tabular-nums">09:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#242424]">
                <span>Saturday</span>
                <span className="text-[#F5F1EA] font-mono tabular-nums">08:00 – 17:00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#242424]">
                <span>Sunday</span>
                <span className="text-[#C8A15A] font-medium">Closed</span>
              </div>
            </div>
            <p className="text-xs text-[#9A9A9A] mt-1">
              All bookings operate strictly on the Africa/Johannesburg (SAST, UTC+2) timezone.
            </p>
          </div>

          {/* Column 4: Contact & Book */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-semibold text-[#F5F1EA] tracking-wide">
              Cape Town Flagship
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A15A] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A15A] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="hover:text-[#F5F1EA] transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A15A] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-[#F5F1EA] transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] transition-colors min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7A7A]">
          <p>© 2026 Urban Barbers. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-[#C8A15A] transition-colors">
              Terms & Conditions
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy" className="hover:text-[#C8A15A] transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A15A] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
