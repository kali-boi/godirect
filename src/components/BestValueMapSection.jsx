import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, Sparkles, CheckCircle, Layers } from 'lucide-react';

export default function BestValueMapSection({ onExploreClick, onSelectProperty, properties }) {
  const [activePin, setActivePin] = useState(0);

  const pins = [
    {
      id: 1,
      price: '$250/night',
      label: 'Mayfair Shortlet Suite',
      location: 'Mayfair, London',
      type: 'Short-Let',
      coords: { top: '38%', left: '40%' },
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      price: '$1,200/mo',
      label: 'Parkview Central Flat',
      location: 'Downtown, Manchester',
      type: 'Long Lease',
      coords: { top: '56%', left: '64%' },
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      price: '$450,000',
      label: 'The Atrium Villa',
      location: 'Palm Jumeirah',
      type: 'For Sale',
      coords: { top: '28%', left: '76%' },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section className="py-16 bg-[var(--bg-surface)] border-t border-[var(--border-light)]">
      <div className="container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Realistic Interactive Vector Map Container */}
          <div className="lg:col-span-7 relative bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 p-4 sm:p-6 min-h-[420px] flex flex-col justify-between">
            
            {/* Real Map Image Tile Backdrop */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <img
                src="/images/realistic_dark_city_map.jpg"
                alt="Realistic Dark City Map Grid"
                className="w-full h-full object-cover filter brightness-90 contrast-110 opacity-75 transition-transform duration-700"
              />
              
              {/* Radial Vignette & Grid Lines Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Top Bar Header Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-emerald-400 text-xs font-extrabold border border-slate-700/80 shadow-md backdrop-blur-md">
                <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Live Interactive Grid Map</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 text-gray-300 text-xs font-semibold border border-slate-800 backdrop-blur-md">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>150+ Verified Cities</span>
              </div>
            </div>

            {/* Main Interactive Map Graphic Container */}
            <div className="relative w-full h-[260px] my-3 rounded-2xl overflow-hidden flex items-center justify-center">
              
              {/* Animated Map Pulse Route Beziers */}
              <svg className="absolute inset-0 w-full h-full fill-none stroke-cyan-400/40 pointer-events-none" strokeWidth="2">
                <path d="M 50 180 Q 200 90 400 140 T 700 80" strokeDasharray="6 6" className="animate-pulse" />
                <path d="M 120 40 Q 280 220 500 110 T 750 200" strokeWidth="1.5" stroke="#38bdf8" strokeOpacity="0.3" />
              </svg>

              {/* Dynamic Interactive Property Pins */}
              {pins.map((pin, idx) => {
                const isActive = activePin === idx;
                return (
                  <div
                    key={pin.id}
                    style={{ top: pin.coords.top, left: pin.coords.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* Pulsing Radar Ring */}
                    <span className={`absolute -inset-3 rounded-full transition-all ${
                      isActive ? 'bg-emerald-400/30 animate-ping' : 'bg-cyan-400/10'
                    }`} />

                    <button
                      onClick={() => setActivePin(idx)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black text-xs shadow-2xl transition-all duration-300 transform hover:scale-110 ${
                        isActive
                          ? 'bg-emerald-400 text-slate-950 scale-110 ring-4 ring-emerald-400/40 shadow-emerald-500/30'
                          : 'bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700 backdrop-blur-md'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                      <span>{pin.price}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Active Property Card Drawer at Bottom of Map */}
            <div className="relative z-10 bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <img
                  src={pins[activePin].image}
                  alt={pins[activePin].label}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h5 className="text-xs font-extrabold text-white">
                    {pins[activePin].label}
                  </h5>
                  <p className="text-[11px] text-gray-400">
                    {pins[activePin].location} • <span className="text-emerald-400 font-semibold">{pins[activePin].type}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 shadow-inner">
                  {pins[activePin].price}
                </span>
                <button
                  onClick={onExploreClick}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all text-xs font-bold"
                  title="View property details"
                >
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Text & Value Propositions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-light)] text-[var(--teal-blue)] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight">
              Discover Properties with the Best Value.
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Compare direct landlord listings on our realistic dark grid map, evaluate short-let night rates versus long-term monthly rentals, and lock in transparent pricing.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Real-time location map & neighborhood insights</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Direct landlord messaging & instant booking</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Verified 4K video property walkthroughs</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:scale-105"
              >
                <span>Find More Properties</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
