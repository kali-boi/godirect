import React from 'react';
import { ArrowUpRight, Sparkles, Home, ShieldCheck } from 'lucide-react';

export default function FeatureGrid({ onExploreClick }) {
  return (
    <section className="py-16 bg-[var(--bg-primary)]">
      <div className="container">
        
        {/* Section Header with Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-[1.15]">
              Your primary home might begin to feel left out.
            </h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-light)] shadow-sm self-start md:self-auto">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-emerald-400">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                alt="Living"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] max-w-xs leading-tight">
              Each living offers unique features, exceptional quality, and prime locations
            </p>
          </div>
        </div>

        {/* Feature Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Large Feature Card (Left Column) */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-lg border border-[var(--border-light)] min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-6 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Primary Residence"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Architectural Masterpiece
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Designed for comfort, crafted for distinction.
              </h3>
              <p className="text-sm text-gray-200 font-normal max-w-lg">
                Explore handpicked properties with verified direct-landlord deals, 4K virtual tours, and zero hidden broker fees.
              </p>
            </div>
          </div>

          {/* Right Column: 2 Cards (Compact Design & Price Highlight) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Upper Info Card */}
            <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-light)] shadow-sm flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--teal-blue)]">
                  <Home className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-[var(--text-primary)]">
                  Big things can happen in small spaces.
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  With thoughtful design and smart organization, you can maximize every inch, making room for creativity and seamless living.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onExploreClick}
                  className="px-5 py-2.5 rounded-full border border-[var(--border-light)] hover:border-[var(--teal-blue)] text-[var(--text-primary)] font-semibold text-xs transition-all hover:bg-[var(--bg-elevated)]"
                >
                  Details
                </button>
              </div>
            </div>

            {/* Lower Image & Pricing Card */}
            <div className="relative group rounded-3xl overflow-hidden shadow-sm border border-[var(--border-light)] p-6 flex flex-col justify-between min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                alt="Modern Villa"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-slate-900 font-extrabold text-xs shadow-md">
                  Pricing Start at $256K
                </span>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </span>
              </div>

              <div className="relative z-10 pt-6">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-all shadow-xl"
                >
                  <span>Explore Properties</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
