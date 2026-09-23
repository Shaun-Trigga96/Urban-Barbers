import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key and outside click to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !hamburgerBtnRef.current?.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact & Booking', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo Zone */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] rounded-lg p-1"
            aria-label="Urban Barbers Home"
          >
            <img
              src="/logo.svg"
              alt="Urban Barbers logo"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F5F1EA]">
                Urban Barbers
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans text-[#C8A15A] tracking-wider uppercase">
                Cape Town · Est. 2016
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 hover:text-[#C8A15A] relative py-1 ${
                    isActive
                      ? 'text-[#C8A15A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C8A15A]'
                      : 'text-[#9A9A9A]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Zone: Call + Book Now CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="flex items-center gap-2 text-xs text-[#9A9A9A] hover:text-[#F5F1EA] transition-colors"
              title="Call shop"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A15A]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] active:scale-[0.98] transition-all shadow-md shadow-[#C8A15A]/10 min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-xs min-h-[40px]"
            >
              Book
            </Link>
            <button
              ref={hamburgerBtnRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2.5 rounded-lg text-[#F5F1EA] hover:text-[#C8A15A] hover:bg-[#1A1A1A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Panel */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-50 bg-black/70 backdrop-blur-sm md:hidden animate-fade-in"
          aria-hidden="true"
        >
          <div
            ref={mobileMenuRef}
            className="w-full bg-[#1A1A1A] border-b border-[#2C2C2C] px-6 py-6 shadow-2xl flex flex-col gap-6"
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? 'bg-[#C8A15A]/15 text-[#C8A15A] font-semibold'
                        : 'text-[#F5F1EA] hover:bg-[#242424] hover:text-[#C8A15A]'
                    }`
                  }
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#2C2C2C] flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-base hover:bg-[#D8B268] transition-colors min-h-[48px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              <div className="flex items-center justify-between text-xs text-[#9A9A9A] px-1 pt-2">
                <span>{BUSINESS_INFO.addressShort}</span>
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="text-[#C8A15A] hover:underline"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
