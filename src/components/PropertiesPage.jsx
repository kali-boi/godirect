import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Palmtree, 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Heart, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  ChevronRight, 
  Eye, 
  Bed, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  X,
  Zap,
  ArrowRight,
  Home
} from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function PropertiesPage({
  properties = [],
  wishlist = [],
  onToggleWishlist,
  onSelectProperty,
  onScheduleTour,
  initialStayType = 'all',
  onReturnToHome
}) {
  const [stayType, setStayType] = useState(initialStayType); // 'all' | 'short-let' | 'rentals'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000); // 100M max
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const primeLocations = [
    'all',
    'Ikoyi, Lagos',
    'Victoria Island, Lagos',
    'Banana Island, Lagos',
    'Lekki Phase 1, Lagos',
    'Maitama, Abuja',
    'Guzape, Abuja',
    'Wuse 2, Abuja'
  ];

  const propertyTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'penthouse', label: 'Penthouses' },
    { id: 'luxury-villa', label: 'Luxury Villas' },
    { id: 'duplex', label: 'Duplexes & Mansions' },
    { id: 'apartment', label: 'Apartments' }
  ];

  // Filtering & Sorting
  const filteredProperties = useMemo(() => {
    let list = properties.filter((p) => {
      // 1. Stay Type Filter
      if (stayType === 'short-let' && !p.isShortLet) return false;
      if (stayType === 'rentals' && p.isShortLet) return false;

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = (p.title || '').toLowerCase().includes(q);
        const matchesLoc = (p.location || '').toLowerCase().includes(q);
        const matchesAddr = (p.address || '').toLowerCase().includes(q);
        const matchesDesc = (p.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesAddr && !matchesDesc) return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'all') {
        const locName = selectedLocation.split(',')[0].toLowerCase();
        if (!p.location?.toLowerCase().includes(locName) && !p.address?.toLowerCase().includes(locName)) {
          return false;
        }
      }

      // 4. Property Sub-Type
      if (selectedType !== 'all' && p.type !== selectedType) {
        return false;
      }

      // 5. Bedrooms
      if (minBedrooms > 0 && (p.beds || 0) < minBedrooms) {
        return false;
      }

      // 6. Max Price
      const propertyPrice = p.price || 0;
      if (propertyPrice > maxPrice) {
        return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return list;
  }, [properties, stayType, searchQuery, selectedLocation, selectedType, minBedrooms, maxPrice, sortBy]);

  const shortletCount = properties.filter(p => p.isShortLet).length;
  const rentalCount = properties.filter(p => !p.isShortLet).length;

  const resetFilters = () => {
    setStayType('all');
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedType('all');
    setMinBedrooms(0);
    setMaxPrice(100000000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Host_Grotesk'] pt-20 pb-20">
      
      {/* ─── CLEAN LUXURY HEADER (HIGH-CONTRAST & CRISP) ─── */}
      <div className="bg-white border-b border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="container max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#018F8B] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Title Deed & Direct Landlord Verified</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
                {stayType === 'short-let' 
                  ? 'Verified Luxury Short-Lets & Daily Stays' 
                  : stayType === 'rentals'
                  ? 'Direct Landlord Annual Leases & Mansions'
                  : 'Prime Real Estate & Short-Let Directory'}
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl font-medium">
                Browse verified short-let suites with 24h escrow protection or connect directly with landlords for long-term residential leases with 0% broker fees.
              </p>
            </div>

            {/* 3-WAY SEGMENT SWITCHER */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 self-start md:self-auto shadow-inner">
              <button
                onClick={() => setStayType('all')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  stayType === 'all'
                    ? 'bg-[#0B2545] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                All Listings ({properties.length})
              </button>

              <button
                onClick={() => setStayType('short-let')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  stayType === 'short-let'
                    ? 'bg-[#018F8B] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#CC9955]" />
                <span>Short-Lets ({shortletCount})</span>
              </button>

              <button
                onClick={() => setStayType('rentals')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  stayType === 'rentals'
                    ? 'bg-[#0B2545] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#CC9955]" />
                <span>Rentals & Leases ({rentalCount})</span>
              </button>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="bg-slate-50 rounded-2xl p-2 sm:p-3 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 flex items-center gap-3 px-3 w-full bg-white rounded-xl py-2 border border-slate-200/80">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood (e.g. Ikoyi, Victoria Island, Maitama) or property title..."
                className="w-full text-xs sm:text-sm text-slate-900 outline-none bg-transparent font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-slate-100 rounded-full">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-slate-800 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 outline-none hover:border-slate-300"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>

              <button
                onClick={() => setShowFiltersModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-slate-800 transition-all shrink-0 shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ─── QUICK NEIGHBORHOOD PILLS ─── */}
      <div className="border-b border-slate-200/80 bg-white sticky top-16 z-20 shadow-2xs">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#018F8B]" />
            <span>Prime Hubs:</span>
          </span>

          {primeLocations.map((loc) => {
            const isSelected = selectedLocation === loc;
            return (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {loc === 'all' ? 'All Hubs' : loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── MAIN PROPERTIES GRID ─── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Results Counter & Context Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-black text-[#0B2545]">
              {stayType === 'short-let'
                ? 'Verified Short-Let Suites & Villas'
                : stayType === 'rentals'
                ? 'Direct Landlord Residential Leases'
                : 'All Verified Marketplace Properties'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing <strong className="text-slate-900 font-bold">{filteredProperties.length}</strong> matching verified listings
            </p>
          </div>

          {(selectedLocation !== 'all' || selectedType !== 'all' || minBedrooms > 0 || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[#018F8B] hover:text-[#0B2545] underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                isWishlisted={wishlist.includes(property.id)}
                onToggleWishlist={onToggleWishlist}
                onScheduleTour={onScheduleTour}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-slate-900">No properties found</h3>
              <p className="text-xs text-slate-500">
                We couldn't find any listings matching your active filters. Try adjusting your search query, location, or price filters.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* ─── ADVANCED FILTERS MODAL ─── */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 font-black text-lg text-[#0B2545]">
                <SlidersHorizontal className="w-5 h-5 text-[#018F8B]" />
                <span>Advanced Filters</span>
              </div>
              <button onClick={() => setShowFiltersModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Property Sub-Type</label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                      selectedType === t.id
                        ? 'bg-[#0B2545] text-white border-[#0B2545]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms Counter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Minimum Bedrooms</label>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMinBedrooms(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      minBedrooms === num
                        ? 'bg-[#018F8B] text-white border-[#018F8B]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {num === 0 ? 'Any' : `${num}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Maximum Price</span>
                <span className="font-extrabold text-slate-900">₦{Number(maxPrice).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="100000000"
                step="500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#018F8B]"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>₦100,000</span>
                <span>₦100,000,000+</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#0B2545] text-white font-bold text-xs hover:bg-slate-800 shadow-md"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
