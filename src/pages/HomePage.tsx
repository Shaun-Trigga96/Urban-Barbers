import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Scissors,
  Award,
  ShieldCheck,
  Star,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { BARBERS, BUSINESS_INFO, GALLERY_ITEMS, SERVICES, TESTIMONIALS, WHY_CHOOSE_US } from '../data/barbershopData';
import LookbookSection from '../components/LookbookSection';

export default function HomePage() {
  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Full-Screen Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0F0F0F] overflow-hidden">
        {/* Background Image with Cinematic Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=85"
            alt="Interior of Urban Barbers shop in Kloof Street Cape Town"
            loading="eager"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/70 to-[#0F0F0F]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-[#0F0F0F]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
          {/* Subtle Location & Heritage kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A]/80 border border-[#2E2E2E] text-xs font-medium text-[#C8A15A] mb-8 tracking-wider uppercase backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>24 Kloof Street · Gardens · Cape Town</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#F5F1EA] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6 text-balance">
            Sharp cuts. <br />
            <span className="text-[#C8A15A] italic font-serif font-normal">Sharper standards.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#9A9A9A] max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
            Cape Town’s craft barbershop. Where master techniques, straight-razor precision,
            and unmatched attention to detail meet effortless everyday style.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-base hover:bg-[#D8B268] active:scale-[0.98] transition-all shadow-xl shadow-[#C8A15A]/15 min-h-[48px]"
            >
              <Calendar className="w-5 h-5" />
              <span>Book An Appointment</span>
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-[#C8A15A] text-[#C8A15A] hover:bg-[#C8A15A]/10 active:scale-[0.98] transition-all font-medium text-base min-h-[48px]"
            >
              <span>View Services & Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Highlights ribbon */}
          <div className="mt-16 pt-8 border-t border-[#2C2C2C]/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl w-full">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#F5F1EA]">Est. 2016</span>
              <span className="text-xs text-[#9A9A9A]">Gardens Heritage</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#F5F1EA]">15-Min Grid</span>
              <span className="text-xs text-[#9A9A9A]">No Wait Guarantee</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#F5F1EA]">48-Hour</span>
              <span className="text-xs text-[#9A9A9A]">Adjustment Policy</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#F5F1EA]">4.9 / 5.0</span>
              <span className="text-xs text-[#9A9A9A]">500+ Local Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Section */}
      <section className="py-20 md:py-28 bg-[#141414] border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-2">
                Craft Grooming
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1EA] tracking-tight">
                Signature Services
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C8A15A] hover:underline"
            >
              <span>Explore all 11 services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C8A15A]/60 transition-all duration-200 group"
              >
                {service.image && (
                  <div className="relative aspect-[16/10] w-full bg-[#242424] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-2 left-3 text-[11px] font-mono font-medium text-[#C8A15A] uppercase tracking-wider">
                      {service.categoryName}
                    </span>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9A9A9A] mb-2">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#C8A15A]" />
                        {service.durationMinutes} min
                      </span>
                      <span className="font-mono text-base font-bold text-[#F5F1EA]">
                        R{service.priceZAR}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#F5F1EA] group-hover:text-[#C8A15A] transition-colors mb-2">
                      {service.name}
                    </h3>

                    <p className="text-xs text-[#9A9A9A] leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                    <span className="text-[11px] text-[#7A7A7A]">In-Shop Settle</span>
                    <Link
                      to={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C8A15A] text-[#0F0F0F] text-xs font-semibold hover:bg-[#D8B268] transition-colors min-h-[38px]"
                    >
                      <span>Book Chair</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook / Skin Fades Showcase */}
      <LookbookSection />

      {/* 3. Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-[#0F0F0F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-2">
              The Urban Barbers Code
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1EA] tracking-tight">
              Why Cape Town Trusts Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#181818] border border-[#2B2B2B] rounded-2xl p-7 flex flex-col justify-start relative overflow-hidden group hover:border-[#C8A15A]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A15A]/10 border border-[#C8A15A]/20 flex items-center justify-center text-[#C8A15A] mb-5 group-hover:scale-105 transition-transform">
                  {idx === 0 && <Scissors className="w-6 h-6" />}
                  {idx === 1 && <Clock className="w-6 h-6" />}
                  {idx === 2 && <MapPin className="w-6 h-6" />}
                  {idx === 3 && <ShieldCheck className="w-6 h-6" />}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#F5F1EA] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9A9A9A] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Barber Team Preview */}
      <section className="py-20 md:py-28 bg-[#141414] border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-2">
                Behind The Chair
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1EA] tracking-tight">
                Meet The Barbers
              </h2>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C8A15A] hover:underline"
            >
              <span>Read their full stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BARBERS.map((barber) => (
              <div
                key={barber.id}
                className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl overflow-hidden flex flex-col group hover:border-[#C8A15A]/50 transition-all"
              >
                {/* Fixed aspect ratio 1:1 image with fallback */}
                <div className="relative aspect-square w-full bg-[#242424] overflow-hidden">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono text-[#C8A15A] uppercase tracking-wider block mb-1">
                      {barber.experienceYears} Years Experience
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#F5F1EA]">
                      {barber.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9A9A9A] pb-3 border-b border-[#282828] mb-3">
                      <span className="font-medium text-[#C8A15A]">{barber.role}</span>
                      <span>
                        {barber.daysOff.includes(1)
                          ? 'Off Mon & Sun'
                          : barber.daysOff.includes(3)
                          ? 'Off Wed & Sun'
                          : 'Mon – Sat'}
                      </span>
                    </div>
                    <p className="text-xs text-[#F5F1EA] font-medium mb-1">Specialty:</p>
                    <p className="text-xs text-[#9A9A9A] mb-3">{barber.specialty}</p>
                    <p className="text-sm text-[#9A9A9A] leading-relaxed line-clamp-3">
                      {barber.bio}
                    </p>
                  </div>

                  <Link
                    to={`/contact?barber=${barber.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#262626] text-[#F5F1EA] hover:bg-[#C8A15A] hover:text-[#0F0F0F] transition-colors text-xs font-semibold min-h-[44px]"
                  >
                    <span>Book with {barber.nickname || barber.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 md:py-28 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-1 text-[#C8A15A] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1EA] tracking-tight">
              Words From The Chair
            </h2>
            <p className="text-sm text-[#9A9A9A] mt-3">
              Real feedback from our regular clients in Gardens, Tamboerskloof, and Cape Town.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#181818] border border-[#2B2B2B] rounded-2xl p-8 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C8A15A] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#F5F1EA] leading-relaxed italic font-serif mb-6">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#F5F1EA]">{t.author}</p>
                    <p className="text-[#9A9A9A]">{t.role}</p>
                  </div>
                  <span className="text-[#C8A15A] font-medium">{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Strip */}
      <section className="py-16 bg-[#141414] border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#F5F1EA]">
              The Kloof Street Workshop
            </h3>
            <span className="text-xs text-[#9A9A9A]">24 Kloof Street, Gardens</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#242424] group border border-[#2C2C2C]"
            >
              <img
                src={item.url}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs text-[#F5F1EA] font-medium">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final Booking CTA Banner */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-t border-[#2C2C2C] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-3">
            Walk Out Confident
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F1EA] mb-6 tracking-tight">
            Ready For Your Next Cut?
          </h2>
          <p className="text-sm sm:text-base text-[#9A9A9A] max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Book in less than 60 seconds with live slot availability. Pay in-shop after your service.
            Open Monday through Saturday.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-base hover:bg-[#D8B268] active:scale-[0.98] transition-all shadow-xl shadow-[#C8A15A]/15 min-h-[48px]"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment Now</span>
            </Link>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-[#3A3A3A] text-[#F5F1EA] hover:border-[#C8A15A] hover:text-[#C8A15A] transition-all text-base min-h-[48px]"
            >
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
