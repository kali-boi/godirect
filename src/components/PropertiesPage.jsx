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
    <div className="min-h-screen bg-[#FAFAFA] text-[#122525] pt-16 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 py-8">
        <div className="container space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#122525] tracking-tight">
                {stayType === 'short-let'
                  ? 'Short-let apartments & homes'
                  : stayType === 'rentals'
                  ? 'Direct annual leases'
                  : 'All verified properties'}
              </h1>
              <p className="text-sm text-neutral-600 max-w-2xl">
                Filter by neighborhood, stay type, bedrooms, and budget across Lagos and Abuja.
              </p>
            </div>

            {/* 3-WAY SEGMENT SWITCHER */}
            <div className="inline-flex p-1 rounded-xl bg-neutral-100 border border-neutral-200 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setStayType('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  stayType === 'all'
                    ? 'bg-[#122525] text-white'
                    : 'text-neutral-600 hover:text-[#122525]'
                }`}
              >
                All ({properties.length})
              </button>

              <button
                type="button"
                onClick={() => setStayType('short-let')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  stayType === 'short-let'
                    ? 'bg-[#018F8B] text-white'
                    : 'text-neutral-600 hover:text-[#122525]'
                }`}
              >
                Short-lets ({shortletCount})
              </button>

              <button
                type="button"
                onClick={() => setStayType('rentals')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  stayType === 'rentals'
                    ? 'bg-[#122525] text-white'
                    : 'text-neutral-600 hover:text-[#122525]'
                }`}
              >
                Rentals ({rentalCount})
              </button>
            </div>
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex-1 flex items-center gap-2.5 px-3.5 bg-neutral-50 rounded-xl h-11 border border-neutral-200 focus-within:bg-white focus-within:border-[#018F8B] transition-colors">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood (Ikoyi, Victoria Island, Maitama) or property title..."
                className="w-full text-sm text-[#122525] placeholder-neutral-400 outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-neutral-200/60 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 bg-white text-[#122525] text-xs font-semibold px-3.5 rounded-xl border border-neutral-200 outline-none hover:border-neutral-300 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                type="button"
                onClick={() => setShowFiltersModal(true)}
                className="h-11 flex items-center gap-1.5 px-4 rounded-xl bg-[#122525] text-white text-xs font-semibold hover:bg-[#1c3737] transition-colors shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Neighborhood Filter Row */}
          <div className="pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-medium text-neutral-500 shrink-0 mr-1 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Area:</span>
            </span>

            {primeLocations.map((loc) => {
              const isSelected = selectedLocation === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-[#122525] text-white border-[#122525]'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {loc === 'all' ? 'All areas' : loc}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Properties Grid */}
      <div className="container py-10">
        
        {/* Results Counter & Context Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#122525]">
              {stayType === 'short-let'
                ? 'Short-let listings'
                : stayType === 'rentals'
                ? 'Annual lease listings'
                : 'All listings'}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Showing <strong className="text-[#122525] font-semibold">{filteredProperties.length}</strong>{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'}
              {selectedLocation !== 'all' ? ` in ${selectedLocation}` : ''}
            </p>
          </div>

          {(selectedLocation !== 'all' || selectedType !== 'all' || minBedrooms > 0 || searchQuery) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-[#018F8B] hover:text-[#017774] underline"
            >
              Clear filters
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
                onSelectProperty={onSelectProperty}
                isWishlisted={wishlist.includes(property.id)}
                onToggleWishlist={onToggleWishlist}
                onScheduleTour={onScheduleTour}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-14 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#122525]">No properties found</h3>
              <p className="text-xs text-neutral-500">
                Try adjusting your area, stay type, or price filters to see more listings.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#122525] text-white text-xs font-semibold hover:bg-[#1c3737] transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Advanced Filters Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-neutral-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#122525]">
                <SlidersHorizontal className="w-4 h-4 text-[#018F8B]" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={() => setShowFiltersModal(false)}
                className="p-1.5 hover:bg-neutral-100 rounded-lg"
                aria-label="Close filters"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 block">Property type</label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`p-2.5 rounded-xl text-xs font-medium border transition-colors text-left ${
                      selectedType === t.id
                        ? 'bg-[#122525] text-white border-[#122525]'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms Counter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 block">Minimum bedrooms</label>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMinBedrooms(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      minBedrooms === num
                        ? 'bg-[#018F8B] text-white border-[#018F8B]'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
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
                <span className="font-semibold text-neutral-700">Maximum price</span>
                <span className="font-bold text-[#122525]">₦{Number(maxPrice).toLocaleString()}</span>
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
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span>₦100,000</span>
                <span>₦100,000,000+</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold text-xs hover:bg-neutral-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowFiltersModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#122525] text-white font-semibold text-xs hover:bg-[#1c3737]"
              >
                Apply filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
