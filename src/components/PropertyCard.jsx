import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

export default function PropertyCard({ 
  property, 
  onSelectProperty, 
  onToggleWishlist, 
  isWishlisted,
  onOpenChatWithHost
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group bg-[var(--bg-surface)] rounded-3xl overflow-hidden border border-[var(--border-light)] hover:border-[var(--teal-blue)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 p-2">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Carousel Arrows */}
          {property.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Status Badges (For Rent / Short-let / For Sale) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {property.isShortLet ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[11px] shadow-md">
                Short-Let
              </span>
            ) : property.type === 'Penthouses' || property.type === 'Villas' ? (
              <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-[11px] shadow-md">
                For Sale
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[11px] shadow-md">
                For Rent
              </span>
            )}

            {property.isVerified && (
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(property);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md"
            title={isWishlisted ? "Remove from saved" : "Save to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{property.rating}</span>
            <span className="text-gray-300">({property.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Location */}
          <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[var(--teal-blue)] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-lg text-[var(--text-primary)] group-hover:text-[var(--teal-blue)] transition-colors line-clamp-1 mb-3">
            {property.title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-secondary)] py-2.5 border-y border-[var(--border-light)] mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[var(--teal-blue)]" />
              <span>{property.beds} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[var(--teal-blue)]" />
              <span>{property.baths} Bathrooms</span>
            </div>
          </div>
        </div>

        {/* Host Info & Price Row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-[var(--text-muted)] block font-medium">Price</span>
            <div className="text-xl font-black text-[var(--text-primary)]">
              ${property.price.toLocaleString()}
              <span className="text-xs font-semibold text-[var(--text-muted)]">/{property.pricePeriod}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenChatWithHost(property);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--teal-blue)] hover:text-white text-[var(--text-primary)] text-xs font-bold transition-all border border-[var(--border-light)]"
            title="Chat directly with Landlord"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Host</span>
          </button>
        </div>

      </div>

    </div>
  );
}
