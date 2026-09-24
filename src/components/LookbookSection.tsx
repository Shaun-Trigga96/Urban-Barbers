import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, ArrowRight, User } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/barbershopData';

type FilterCategory = 'all' | 'fades' | 'beards' | 'classics' | 'combos';

export default function LookbookSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredItems =
    activeFilter === 'all'
      ? LOOKBOOK_ITEMS
      : LOOKBOOK_ITEMS.filter((item) => item.category === activeFilter);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'All Styles' },
    { key: 'fades', label: 'Skin Fades & Tapers' },
    { key: 'beards', label: 'Beard Sculpt & Shave' },
    { key: 'classics', label: 'Classic Scissor Cuts' },
    { key: 'combos', label: 'Cut & Beard Combos' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#121212] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A15A]/10 border border-[#C8A15A]/30 text-xs text-[#C8A15A] font-medium mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cape Town Haircut Lookbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1EA] tracking-tight">
              Skin Fades & Master Finishes
            </h2>
            <p className="text-sm text-[#9A9A9A] mt-2 max-w-xl font-light">
              Explore recent chair work from our resident master craftsmen on Kloof Street.
              Zero filters, true skin gradients, razor-sharp outlines, and bespoke beard trims.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === f.key
                    ? 'bg-[#C8A15A] text-[#0F0F0F] shadow-lg shadow-[#C8A15A]/15'
                    : 'bg-[#1C1C1C] border border-[#2E2E2E] text-[#9A9A9A] hover:text-[#F5F1EA] hover:border-[#3D3D3D]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#181818] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#C8A15A]/60 transition-all duration-300"
            >
              {/* High Resolution Photo with Zoom Effect */}
              <div className="relative aspect-[4/3] w-full bg-[#202020] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/20 to-transparent opacity-80" />

                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#C8A15A]">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#C8A15A] font-medium mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{item.barber}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F5F1EA] drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body & CTA */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                <p className="text-sm text-[#9A9A9A] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                  <span className="text-xs text-[#7A7A7A]">
                    Live in Kloof Street
                  </span>
                  <Link
                    to={`/contact?service=${item.serviceId}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C8A15A] text-[#0F0F0F] text-xs font-semibold hover:bg-[#D8B268] active:scale-[0.98] transition-all min-h-[40px]"
                  >
                    <span>Book This Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
