import React, { useState, useRef } from 'react';
import {
  Search,
  MapPin,
  Building,
  Film,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronDown,
  Sparkles,
  Home,
  SlidersHorizontal,
  BedDouble,
  DollarSign
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/mockData';

export default function HeroSearch({
  searchQuery,
  setSearchQuery,
  stayTypeFilter,
  setStayTypeFilter,
  onPerformSearch,
  onOpenVideoTour
}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState('any');
  const [roomCount, setRoomCount] = useState('any');
  const [propertyType, setPropertyType] = useState('any');
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    onPerformSearch();
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-8 pb-12 overflow-hidden bg-slate-950 text-white">

      {/* Hero Architectural Visual Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-105 contrast-105 transition-opacity duration-700 opacity-75"
        >
          <source src="/video/Initial_Scene_-_2026-08-22_202608230019.mp4" type="video/mp4" />
        </video>

        {/* Fallback Image Backdrop */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80"
          alt="Architectural Residence"
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40"
        />

        {/* Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-950/90 z-10 pointer-events-none" />
      </div>

      {/* Floating Video Controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={onOpenVideoTour}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs font-bold backdrop-blur-xl border border-white/20 shadow-xl transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Film className="w-3.5 h-3.5 text-amber-300" />
          <span>4K Walkthrough Active</span>
        </button>

        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xl border border-white/20 shadow-xl transition-all"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={toggleVideoPlayback}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xl border border-white/20 shadow-xl transition-all"
          title={isVideoPlaying ? 'Pause' : 'Play'}
        >
          {isVideoPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
        </button>
      </div>

      {/* Main Hero Header Content */}
      <div className="container relative z-20 my-auto pt-6 pb-6">
        
        {/* Category Pills Header */}
        <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
          <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
            House
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
            Apartment
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
            Residential
          </span>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="max-w-3xl space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight drop-shadow-2xl">
            Build Your Future, One Property at a Time.
          </h1>
          <p className="text-base sm:text-lg text-gray-200 font-normal max-w-xl leading-relaxed drop-shadow-md">
            Own Your World, One Property at a Time. Discover verified luxury homes, short-let vacation suites, and direct landlord rentals.
          </p>
        </div>

        {/* FLOATING WHITE SEARCH ENGINE BAR (Matching Dribbble Reference Design) */}
        <div className="mt-10 bg-white text-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 animate-fade-in max-w-5xl">
          
          {/* Inner Filter Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setStayTypeFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  stayTypeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('City')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              >
                City
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('house')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              >
                House
              </button>
              <button
                type="button"
                onClick={() => setStayTypeFilter('rentals')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  stayTypeFilter === 'rentals'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Rentals
              </button>
              <button
                type="button"
                onClick={() => setStayTypeFilter('short-let')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  stayTypeFilter === 'short-let'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Short-let
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Owner Deals</span>
            </div>
          </div>

          {/* 4 Form Inputs Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            
            {/* Input 1: Looking for */}
            <div className="lg:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Looking for
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter type (e.g. Villa, Suite)"
                className="w-full bg-transparent text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Input 2: Price */}
            <div className="lg:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Price
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="any">Any Price Range</option>
                <option value="under-1k">Under $1,000 / mo</option>
                <option value="1k-3k">$1,000 - $3,000 / mo</option>
                <option value="3k-plus">$3,000+ / mo</option>
              </select>
            </div>

            {/* Input 3: Location */}
            <div className="lg:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="">All Locations</option>
                {POPULAR_DESTINATIONS.map((loc, idx) => (
                  <option key={loc.name || idx} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 4: Number of rooms */}
            <div className="lg:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Number of rooms
              </label>
              <select
                value={roomCount}
                onChange={(e) => setRoomCount(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="any">Any Bedrooms</option>
                <option value="1">1 Bed room</option>
                <option value="2">2 Bed rooms</option>
                <option value="3">3+ Bed rooms</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-12 pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-extrabold text-xs tracking-wide shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Search Properties</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
