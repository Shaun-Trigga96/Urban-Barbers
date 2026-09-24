import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, HeartHandshake, Scissors, MapPin, ArrowRight } from 'lucide-react';
import { BARBERS, BUSINESS_INFO, GALLERY_ITEMS } from '../data/barbershopData';

export default function AboutPage() {
  const values = [
    {
      icon: <Scissors className="w-6 h-6" />,
      title: 'Craft First',
      description:
        'No rushed 10-minute buzz cuts. Every service is treated as an art form — taking into account head shape, crown whorls, natural hair growth direction, and facial balance.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: 'Community Centered',
      description:
        'Founded in Gardens in 2016, Urban Barbers has grown into a social anchor for Kloof Street neighbors, creatives, professionals, and families from across the Atlantic Seaboard.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Sharper Standards',
      description:
        'We sanitize our clippers, guards, and straight razor handles in hospital-grade solution between every single client. Fresh blades, sterile hot towels, and pure organic balms always.',
    },
  ];

  return (
    <div className="w-full bg-[#0F0F0F] text-[#F5F1EA] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          {/* Brand Emblem Logo */}
          <div className="mb-6 inline-block">
            <img
              src="/logo.svg"
              alt="Urban Barbers Emblem"
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-3">
            Since 2016 · Kloof Street
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F1EA] mb-6">
            The Story Behind Urban Barbers
          </h1>
          <p className="text-base sm:text-lg text-[#9A9A9A] leading-relaxed font-light">
            Founded with a singular mission: to restore the authenticity, dignity, and ritual of the traditional neighborhood barbershop while setting an uncompromising modern standard for hair craftsmanship in Cape Town.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-[#9A9A9A] text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA]">
              Rooted in Gardens, Crafting for Cape Town
            </h2>
            <p>
              When Urban Barbers opened its doors at 24 Kloof Street in the winter of 2016, the neighborhood was craving a genuine gathering space. A sanctuary where you could walk in, leave the bustle of the city outside, grab an espresso, and trust that your hair and beard were in the hands of seasoned masters.
            </p>
            <p>
              We deliberately steered away from conveyor-belt franchise grooming. Instead, we invested in custom heavy-duty Belmont-style chairs, solid oak workbenches, and barbers who have dedicated their working lives to the craft.
            </p>
            <p>
              Ten years on, our chairs remain occupied by the same loyal clients who sat with us on day one — along with visiting international creatives, local artisans, and young gentlemen receiving their very first haircut.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-[#F5F1EA] font-mono">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-[#C8A15A]">8+</span>
                <span className="text-[#9A9A9A]">Years On Kloof St</span>
              </div>
              <div className="h-8 w-px bg-[#2C2C2C]" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-[#C8A15A]">30,000+</span>
                <span className="text-[#9A9A9A]">Cuts Delivered</span>
              </div>
              <div className="h-8 w-px bg-[#2C2C2C]" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-[#C8A15A]">3</span>
                <span className="text-[#9A9A9A]">Resident Masters</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#242424] border border-[#2E2E2E] shadow-2xl">
              <img
                src="/images/hero-shop.jpg"
                alt="Urban Barbers shop interior and vintage barber station"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-[#F5F1EA] font-medium">
                  24 Kloof Street, Gardens · Cape Town Flagship
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-24 pt-12 border-t border-[#262626]">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-2">
              Our Core Ethos
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA]">
              Built on Unyielding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-[#161616] border border-[#2B2B2B] rounded-2xl p-8 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A15A]/10 border border-[#C8A15A]/20 text-[#C8A15A] flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F5F1EA] mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-[#9A9A9A] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Barber Profiles */}
        <div className="mb-24 pt-12 border-t border-[#262626]">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-widest text-[#C8A15A] font-medium mb-2">
              The Resident Team
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA]">
              Master Barbers at Work
            </h2>
            <p className="text-sm text-[#9A9A9A] mt-2">
              Each of our barbers brings distinct specializations and years of honed practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BARBERS.map((barber) => (
              <div
                key={barber.id}
                className="bg-[#181818] border border-[#2E2E2E] rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative aspect-square w-full bg-[#242424] overflow-hidden">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono text-[#C8A15A] uppercase tracking-wider block mb-1">
                      {barber.experienceYears} Years Experience
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#F5F1EA]">
                      {barber.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#9A9A9A] pb-3 border-b border-[#282828]">
                      <span className="font-semibold text-[#C8A15A]">{barber.role}</span>
                      <span>
                        {barber.daysOff.includes(1)
                          ? 'Off Mon & Sun'
                          : barber.daysOff.includes(3)
                          ? 'Off Wed & Sun'
                          : 'Available Mon – Sat'}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#F5F1EA] uppercase tracking-wider mb-1">
                        Primary Specialty
                      </p>
                      <p className="text-xs text-[#C8A15A]">{barber.specialty}</p>
                    </div>

                    <p className="text-sm text-[#9A9A9A] leading-relaxed">
                      {barber.bio}
                    </p>
                  </div>

                  <Link
                    to={`/contact?barber=${barber.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#C8A15A] text-[#0F0F0F] font-semibold text-xs hover:bg-[#D8B268] transition-colors min-h-[44px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book with {barber.nickname || barber.name.split(' ')[0]}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="pt-12 border-t border-[#262626]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA] mb-2">
              Inside Our Barber Shop
            </h2>
            <p className="text-xs sm:text-sm text-[#9A9A9A]">
              Classic barbering atmosphere, modern tools, and warm South African hospitality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#242424] border border-[#2E2E2E] group"
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
        </div>
      </div>
    </div>
  );
}
