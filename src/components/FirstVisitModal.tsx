import React, { useState, useEffect, useRef } from 'react';
import { X, Tag, Check, Sparkles, ArrowRight } from 'lucide-react';
import { isValidEmail } from '../utils/dateTime';

interface FirstVisitModalProps {
  currentPath: string;
}

export default function FirstVisitModal({ currentPath }: FirstVisitModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only show on home page ('/')
    if (currentPath !== '/') {
      return;
    }

    try {
      const dismissed = localStorage.getItem('urban_barbers_modal_dismissed');
      if (dismissed === 'true') {
        return;
      }
    } catch {
      // Ignore localStorage errors
    }

    // Trigger after ~6 seconds (6000ms)
    const timer = setTimeout(() => {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setIsOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentPath]);

  // Lock scroll and handle escape key / focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleDismiss();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Focus first input inside modal
    setTimeout(() => {
      const input = modalRef.current?.querySelector('input');
      if (input) {
        input.focus();
      } else {
        const btn = modalRef.current?.querySelector('button');
        btn?.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function handleDismiss() {
    try {
      localStorage.setItem('urban_barbers_modal_dismissed', 'true');
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    try {
      localStorage.setItem('urban_barbers_promo_claimed', 'FIRST10');
      localStorage.setItem('urban_barbers_modal_dismissed', 'true');
      localStorage.setItem('urban_barbers_subscriber_email', email.trim());
    } catch {
      // Ignore
    }
    setIsSuccess(true);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#1A1A1A] border border-[#383838] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close offer modal"
          className="absolute top-4 right-4 p-2 text-[#9A9A9A] hover:text-[#F5F1EA] hover:bg-[#282828] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A]"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#C8A15A]/15 border border-[#C8A15A]/30 flex items-center justify-center text-[#C8A15A] mb-5">
              <Tag className="w-6 h-6" />
            </div>

            <h3
              id="promo-modal-title"
              className="font-serif text-2xl font-bold text-[#F5F1EA] tracking-tight mb-2"
            >
              First visit? Get 10% off your first cut
            </h3>

            <p className="text-sm text-[#9A9A9A] leading-relaxed mb-6">
              Join the Urban Barbers club. Enter your email to claim 10% off your introductory haircut or combo at our Kloof Street shop.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="promo-email" className="block text-xs font-medium text-[#F5F1EA] mb-1.5">
                  Email Address
                </label>
                <input
                  id="promo-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@example.co.za"
                  className="w-full px-4 py-3 rounded-lg bg-[#0F0F0F] border border-[#333333] text-[#F5F1EA] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A] transition-colors"
                />
                {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] active:scale-[0.98] transition-all min-h-[44px]"
              >
                <span>Claim 10% Discount</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-[#9A9A9A] hover:text-[#F5F1EA] py-1 transition-colors text-center"
              >
                No thanks, I'll pay full price
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#F5F1EA] mb-2">
              You're on the list!
            </h3>

            <p className="text-sm text-[#9A9A9A] mb-5">
              Use your exclusive discount code when you pay in-shop for your first appointment:
            </p>

            <div className="bg-[#0F0F0F] border border-[#C8A15A]/50 rounded-xl p-4 mb-6 flex flex-col items-center">
              <span className="text-xs text-[#9A9A9A] uppercase tracking-wider mb-1">Your Promo Code</span>
              <span className="font-mono text-2xl font-bold text-[#C8A15A] tracking-widest">
                FIRST10
              </span>
              <span className="text-[11px] text-[#9A9A9A] mt-1">10% off at in-shop checkout</span>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-3 px-5 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] transition-all min-h-[44px]"
            >
              Done & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
