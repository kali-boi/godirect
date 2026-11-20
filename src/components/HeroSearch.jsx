import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/mockData';

export default function HeroSearch({
  searchQuery,
  setSearchQuery,
  stayTypeFilter,
  setStayTypeFilter,
  onPerformSearch
}) {
  const [selectedCity, setSelectedCity] = useState('');

  const heroSlides = [
    {
      id: 'slide-1',
      title: 'Waterfront Penthouse',
      location: 'Bourdillon Road, Ikoyi, Lagos',
      price: '₦185,000 / night',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'slide-2',
      title: '5-Bedroom Detached Residence',
      location: 'Gana Street, Maitama, Abuja',
      price: '₦35,000,000 / year',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'slide-3',
      title: 'Executive 2-Bedroom Suite',
      location: 'Ahmadu Bello Way, Victoria Island, Lagos',
      price: '₦95,000 / night',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'slide-4',
      title: '4-Bedroom Contemporary Duplex',
      location: 'Admiralty Way, Lekki Phase 1, Lagos',
      price: '₦18,000,000 / year',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    onPerformSearch();
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section
      className="relative min-h-[76vh] sm:min-h-[82vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 overflow-hidden bg-[#122525] text-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Slides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={`${slide.title} in ${slide.location}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-[#122525]/65 via-[#122525]/45 to-[#122525]/85 z-20 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="container relative z-30 my-auto pt-8 pb-6">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-[1.08] tracking-tight">
            Rent and book directly from verified landlords.
          </h1>
          <p className="text-base sm:text-lg text-white/85 font-normal max-w-xl leading-relaxed">
            Short-lets and annual leases across Lagos, Abuja, and Port Harcourt — no agency markups, with 24-hour check-in escrow.
          </p>
        </div>

        {/* Search Panel */}
        <div className="mt-8 bg-white text-[#122525] rounded-2xl p-4 sm:p-5 shadow-xl border border-black/5 max-w-4xl">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-neutral-100 pb-3.5 mb-4">
            {[
              { id: 'all', label: 'All listings' },
              { id: 'short-let', label: 'Short-lets' },
              { id: 'rentals', label: 'Annual rentals' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStayTypeFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  stayTypeFilter === tab.id
                    ? 'bg-[#122525] text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-[#122525]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            <div className="lg:col-span-5 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus-within:bg-white focus-within:border-[#018F8B] transition-colors">
              <label className="text-[11px] font-medium text-neutral-500 block mb-0.5">
                Neighborhood or keyword
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Ikoyi, Maitama, Lekki Phase 1..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#122525] placeholder-neutral-400 outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-4 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus-within:bg-white focus-within:border-[#018F8B] transition-colors">
              <label className="text-[11px] font-medium text-neutral-500 block mb-0.5">
                Area
              </label>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-neutral-400 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full bg-transparent text-sm font-medium text-[#122525] outline-none cursor-pointer"
                >
                  <option value="">All areas</option>
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <option key={dest.name} value={dest.name.split(',')[0]}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-3">
              <button
                type="submit"
                className="w-full h-[54px] rounded-xl bg-[#018F8B] hover:bg-[#017774] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Slide Caption & Controls */}
      <div className="container relative z-30 flex items-center justify-between gap-4 pt-2 text-xs text-white/80">
        <div className="truncate">
          <span className="font-semibold text-white">{activeSlide.location}</span>
          <span className="mx-2 text-white/40">·</span>
          <span>{activeSlide.price}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-white/70 mr-1">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
          <button
            type="button"
            onClick={handlePrevSlide}
            className="w-8 h-8 rounded-full border border-white/20 bg-black/25 hover:bg-black/45 flex items-center justify-center text-white transition-colors"
            aria-label="Previous property photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextSlide}
            className="w-8 h-8 rounded-full border border-white/20 bg-black/25 hover:bg-black/45 flex items-center justify-center text-white transition-colors"
            aria-label="Next property photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
