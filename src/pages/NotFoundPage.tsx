import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, ArrowLeft, Calendar } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#0F0F0F] text-[#F5F1EA] px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#C8A15A]/15 border border-[#C8A15A]/30 text-[#C8A15A] flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-8 h-8" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[#C8A15A] block mb-2">
          Error 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Off The Mark
        </h1>

        <p className="text-sm text-[#9A9A9A] leading-relaxed mb-8">
          The page or appointment link you were looking for doesn't exist or has moved. Let's get you back into the chair.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#3A3A3A] text-sm text-[#F5F1EA] hover:border-[#C8A15A] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C8A15A] text-[#0F0F0F] font-semibold text-sm hover:bg-[#D8B268] transition-all min-h-[44px]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
