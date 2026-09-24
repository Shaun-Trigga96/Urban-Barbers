import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { SERVICES } from '../data/barbershopData';
import { ServiceCategory } from '../types';

export default function ServicesPage() {
  const categories: { key: ServiceCategory; title: string; subtitle: string }[] = [
    {
      key: 'haircuts',
      title: 'Precision Haircuts',
      subtitle: 'Tailored fades, scissor silhouettes, and modern graduation techniques.',
    },
    {
      key: 'beard',
      title: 'Beard & Straight Razor Shaves',
      subtitle: 'Sculpting, straight-razor detailing, and eucalyptus steamed towel rituals.',
    },
    {
      key: 'combos',
      title: 'Signature Grooming Combos',
      subtitle: 'Complete hair and beard sessions designed for maximum polish and relaxation.',
    },
    {
      key: 'kids-extras',
      title: 'Kids & Finishing Extras',
      subtitle: 'Young gentleman cuts, razor line-ups, and invigorating tea tree washes.',
    },
  ];

  return (
    <div className="w-full bg-[#0F0F0F] text-[#F5F1EA] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
          {/* Brand Emblem Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="/logo.svg"
              alt="Urban Barbers Emblem"
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-3">
            Menu of Craft
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F1EA] mb-6">
            Services & Pricing
          </h1>
          <p className="text-base text-[#9A9A9A] leading-relaxed font-light">
            All appointments include a thorough initial consultation, hot lather razor neck clean,
            and professional matte or satin styling. Payment is handled in-shop (Card, Cash, or SnapScan).
          </p>
        </div>

        {/* Categories & Cards */}
        <div className="space-y-16">
          {categories.map((cat) => {
            const catServices = SERVICES.filter((s) => s.category === cat.key);
            return (
              <div key={cat.key} className="pt-2">
                {/* Category Header */}
                <div className="border-b border-[#282828] pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA]">
                      {cat.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">{cat.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono text-[#C8A15A] shrink-0">
                    {catServices.length} {catServices.length === 1 ? 'Option' : 'Options'}
                  </span>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {catServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-[#181818] border border-[#2B2B2B] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C8A15A]/60 transition-all duration-200 group"
                    >
                      {service.image && (
                        <div className="relative aspect-[16/9] w-full bg-[#242424] overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-85" />
                          <div className="absolute top-3 right-3">
                            <span className="font-mono text-lg font-bold text-[#F5F1EA] bg-[#0F0F0F]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                              R{service.priceZAR}
                            </span>
                          </div>
                          {service.featured && (
                            <div className="absolute top-3 left-3">
                              <span className="text-[11px] font-medium text-[#C8A15A] bg-[#C8A15A]/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#C8A15A]/40 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Most Popular
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA] group-hover:text-[#C8A15A] transition-colors">
                              {service.name}
                            </h3>
                            {!service.image && (
                              <span className="font-mono text-2xl font-bold text-[#F5F1EA] shrink-0">
                                R{service.priceZAR}
                              </span>
                            )}
                          </div>

                          {/* Unboxed Metadata discipline */}
                          <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-3">
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3.5 h-3.5 text-[#C8A15A]" />
                              {service.durationMinutes} minutes
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>In-Shop Payment</span>
                          </div>

                          <p className="text-sm text-[#9A9A9A] leading-relaxed mb-6">
                            {service.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                          <span className="text-xs text-[#7A7A7A]">
                            Includes hot lather & razor finish
                          </span>
                          <Link
                            to={`/contact?service=${service.id}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-xs sm:text-sm hover:bg-[#D8B268] active:scale-[0.98] transition-all min-h-[44px]"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Book This Service</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cancellation Policy Note with Link to Terms */}
        <div className="mt-20 p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A15A]/15 border border-[#C8A15A]/30 flex items-center justify-center text-[#C8A15A] shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#F5F1EA] mb-1">
                Fair Cancellation Policy
              </h3>
              <p className="text-sm text-[#9A9A9A] leading-relaxed max-w-2xl">
                We understand schedules change. We kindly require at least <strong className="text-[#F5F1EA]">12 hours' notice</strong> for cancellations or rescheduling. This allows us to offer the chair to another client on our waitlist.
              </p>
            </div>
          </div>
          <Link
            to="/terms"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3A3A3A] text-xs font-semibold text-[#F5F1EA] hover:border-[#C8A15A] hover:text-[#C8A15A] transition-colors shrink-0 whitespace-nowrap min-h-[44px]"
          >
            <span>Read Full Terms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
