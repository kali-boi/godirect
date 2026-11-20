import React, { useState } from 'react';
import {
  Heart,
  Star,
  MapPin,
  Bed,
  Bath,
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

  if (!property) return null;

  const images =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const rawPrice =
    property.price ?? (property.isShortLet ? property.pricePerNight : property.pricePerYear) ?? 0;
  const displayPrice = Number(rawPrice).toLocaleString();
  const currencySymbol = property.currency === 'USD' ? '$' : '₦';
  const pricePeriod = property.pricePeriod || (property.isShortLet ? 'night' : 'year');
  const displayRating = property.rating || 5.0;
  const displayReviewCount = property.reviewCount || property.reviewsCount || 0;

  const typeLabel = property.isShortLet
    ? 'Short-let'
    : property.type === 'Penthouses' || property.type === 'Villas'
    ? 'For sale'
    : 'Annual lease';

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={images[currentImageIndex] || images[0]}
          alt={property.title || 'Property'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#122525] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#122525] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold shadow-xs ${
              property.isShortLet
                ? 'bg-[#018F8B] text-white'
                : 'bg-[#122525] text-white'
            }`}
          >
            {typeLabel}
          </span>

          {(property.isVerified || property.verifiedDirectDeed) && (
            <span className="px-2 py-1 rounded-md bg-white/95 text-[#122525] font-semibold text-[11px] inline-flex items-center gap-1 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#018F8B]" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(property);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#122525] flex items-center justify-center transition-colors shadow-xs"
          title={isWishlisted ? 'Remove from saved' : 'Save property'}
          aria-label={isWishlisted ? 'Remove from saved' : 'Save property'}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-700'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-medium text-[#122525]">
              <Star className="w-3.5 h-3.5 fill-[#CC9955] text-[#CC9955]" />
              <span>{displayRating}</span>
              {displayReviewCount > 0 && (
                <span className="text-neutral-400">({displayReviewCount})</span>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-[15px] text-[#122525] group-hover:text-[#018F8B] transition-colors line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center gap-3.5 text-xs text-neutral-600 pt-1">
            <span className="inline-flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-neutral-400" />
              {property.beds || 0} bed
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-neutral-400" />
              {property.baths || 0} bath
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div>
            <div className="text-base font-bold text-[#122525]">
              {currencySymbol}
              {displayPrice}
              <span className="text-xs font-normal text-neutral-500">/{pricePeriod}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenChatWithHost(property);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-[#018F8B] hover:text-[#018F8B] text-[#122525] text-xs font-medium transition-colors"
            title="Message landlord directly"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
