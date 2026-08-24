import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  ShieldCheck
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
  const [roomCount, setRoomCount] = useState('any');

  // Hero Carousel Slides (Verified Platform Properties)
  const heroSlides = [
    {
      id: 'slide-1',
      title: 'Ikoyi Waterfront Luxury Penthouse',
      location: 'Bourkillon Road, Ikoyi, Lagos',
      price: '₦185,000 / night',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'slide-2',
      title: 'Maitama Diplomatic 5-Bed Mansion',
      location: 'Gana Street, Maitama, Abuja',
      price: '₦35,000,000 / year',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'slide-3',
      title: 'Victoria Island Executive 2-Bed Suite',
      location: 'Ahmadu Bello Way, Victoria Island, Lagos',
      price: '₦95,000 / night',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'slide-4',
      title: 'Lekki Phase 1 Contemporary 4-Bed Duplex',
      location: 'Admiralty Way, Lekki Phase 1, Lagos',
      price: '₦18,000,000 / year',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
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

  return (
    <section 
      className="relative min-h-[85vh] flex flex-col justify-between pt-28 sm:pt-32 pb-12 overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ─── CAROUSEL IMAGE SLIDES ─── */}
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
                alt={slide.title}
                className={`w-full h-full object-cover transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Crisp Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/40 to-slate-950/90 z-20 pointer-events-none" />
      </div>

      {/* ─── TOP RIGHT CAROUSEL CONTROLS ─── */}
      <div className="container relative z-30 flex items-center justify-end pt-2">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <button
            onClick={handlePrevSlide}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-[11px] font-mono font-bold text-white/80">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>

          <button
            onClick={handleNextSlide}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── MAIN HERO CONTENT ─── */}
      <div className="container relative z-30 my-auto py-6">
        
        {/* Headline & Subtitle */}
        <div className="max-w-2xl space-y-3 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
            Build Your Future, One Property at a Time.
          </h1>
          <p className="text-sm sm:text-base text-slate-200 font-normal max-w-lg leading-relaxed drop-shadow-sm">
            Discover verified luxury homes, short-let suites, and direct landlord rentals with zero commission fees.
          </p>
        </div>

        {/* ─── FLOATING SEARCH ENGINE BAR ─── */}
        <div className="mt-8 bg-white text-slate-800 rounded-3xl p-5 shadow-2xl border border-slate-100 animate-fade-in max-w-4xl">
          
          {/* Filter Category Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Properties' },
                { id: 'short-let', label: 'Short-Lets' },
                { id: 'rentals', label: 'Rentals & Sales' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStayTypeFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    stayTypeFilter === tab.id
                      ? 'bg-[#0B2545] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Deed-Verified</span>
            </div>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* 1. Location / Keyword */}
            <div className="lg:col-span-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-[#018F8B] transition-all">
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5 tracking-wider">
                Location or Keyword
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Mayfair, Dubai, Paris, Lagos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* 2. Destination City Dropdown */}
            <div className="lg:col-span-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-[#018F8B] transition-all">
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5 tracking-wider">
                City / Region
              </label>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    if (e.target.value) setSearchQuery(e.target.value);
                  }}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
                >
                  <option value="">Any Global City</option>
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <option key={dest.name} value={dest.name.split(',')[0]}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Search Submit Button */}
            <div className="lg:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#018F8B] hover:bg-[#0B2545] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all duration-200 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* ─── SLIDE INDICATOR DOTS ─── */}
      <div className="container relative z-30 flex items-center justify-center gap-2 pt-2">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'w-8 bg-[#018F8B]'
                : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
