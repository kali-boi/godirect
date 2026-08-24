import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  Check, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Film
} from 'lucide-react';

export default function PropertyDetailModal({ 
  property, 
  onClose, 
  onOpenChatWithHost, 
  onStartBooking,
  isWishlisted,
  onToggleWishlist,
  onOpenVideoTour,
  onScheduleTour
}) {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [stayNights, setStayNights] = useState(3);

  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'];

  const rawPrice = property.price ?? (property.isShortLet ? property.pricePerNight : property.pricePerYear) ?? 0;
  const nightlyRate = Number(rawPrice);
  const currencySymbol = property.currency === 'USD' ? '$' : '₦';
  const pricePeriod = property.pricePeriod || (property.isShortLet ? 'night' : 'year');
  const totalBase = nightlyRate * (property.isShortLet ? stayNights : 1);
  const serviceFee = Math.round(totalBase * 0.05); // low 5% direct fee vs 15%+ on other platforms
  const grandTotal = totalBase + serviceFee;

  const hostName = property.hostName || property.host?.name || 'Verified Direct Landlord';
  const hostAvatar = property.hostAvatar || property.host?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
  const amenitiesList = Array.isArray(property.amenities) ? property.amenities : [];
  const displayRating = property.rating || 5.0;
  const displayReviewCount = property.reviewCount || property.reviewsCount || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-medium)] max-h-[90vh] flex flex-col">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            <span className="badge-gold">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Verified Listing
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">ID: {property.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenVideoTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--teal-blue)] text-white text-xs font-bold transition-all hover:brightness-110 shadow-sm"
            >
              <Film className="w-3.5 h-3.5 text-[var(--mellow-gold)]" />
              <span>Watch 4K Tour</span>
            </button>
            <button 
              onClick={() => onToggleWishlist(property)}
              className="p-2.5 rounded-full bg-[var(--bg-elevated)] hover:bg-red-50 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--border-light)] text-[var(--text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Main Title & Address */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--teal-blue)] uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>{property.address || property.location}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
              {property.title}
            </h2>
          </div>

          {/* Photo Gallery Main Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-900 shadow-md">
              <img 
                src={images[activeImageIndex] || images[0]} 
                alt={property.title || 'Property'} 
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/80"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/80"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Video Tour Badge Overlay */}
              <button
                onClick={onOpenVideoTour}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-bold backdrop-blur-md border border-amber-500/40 shadow-lg transition-transform hover:scale-105"
              >
                <Film className="w-4 h-4 text-[var(--mellow-gold)] animate-pulse" />
                <span>Play Virtual Walkthrough</span>
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[var(--teal-blue)] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid Layout: Left Details, Right Booking Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (Specs, Description, Host, Amenities) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Quick Key Specs Bar */}
              <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-light)] text-center">
                <div>
                  <Bed className="w-5 h-5 mx-auto text-[var(--teal-blue)] mb-1" />
                  <div className="text-xs text-[var(--text-muted)]">Bedrooms</div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{property.beds || 0} Beds</div>
                </div>
                <div>
                  <Bath className="w-5 h-5 mx-auto text-[var(--teal-blue)] mb-1" />
                  <div className="text-xs text-[var(--text-muted)]">Bathrooms</div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{property.baths || 0} Baths</div>
                </div>
                <div>
                  <Maximize2 className="w-5 h-5 mx-auto text-[var(--teal-blue)] mb-1" />
                  <div className="text-xs text-[var(--text-muted)]">Area</div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{property.sqft || 0} sqft</div>
                </div>
                <div>
                  <Star className="w-5 h-5 mx-auto text-[var(--mellow-gold)] mb-1 fill-[var(--mellow-gold)]" />
                  <div className="text-xs text-[var(--text-muted)]">Rating</div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{displayRating} ({displayReviewCount})</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">About this Property</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {property.description || 'No description provided.'}
                </p>
              </div>

              {/* Landlord / Host Profile Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-surface)] border border-[var(--border-medium)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={hostAvatar} 
                      alt={hostName} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--teal-blue)]"
                    />
                    <div>
                      <h4 className="font-bold text-base text-[var(--text-primary)]">{hostName}</h4>
                      <p className="text-xs text-[var(--text-muted)]">Verified Direct Owner</p>
                    </div>
                  </div>
                  <span className="badge-gold">Verified Owner</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-light)]">
                  <div>Response Rate: <strong className="text-[var(--text-primary)]">100%</strong></div>
                  <div>Response Time: <strong className="text-[var(--text-primary)]">&lt; 15 mins</strong></div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenChatWithHost(property);
                  }}
                  className="btn-primary w-full py-3 text-sm justify-center shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Directly with Landlord</span>
                </button>
              </div>

              {/* Amenities Grid */}
              {amenitiesList.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Property Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {amenitiesList.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--bg-elevated)] text-xs font-semibold text-[var(--text-primary)]">
                        <Check className="w-4 h-4 text-[var(--teal-blue)] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (Booking Widget) */}
            <div className="lg:col-span-5">
              <div className="sticky top-20 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-xl space-y-6">
                
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-[var(--text-primary)]">{currencySymbol}{nightlyRate.toLocaleString()}</span>
                    <span className="text-sm text-[var(--text-muted)]"> /{pricePeriod}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[var(--mellow-gold)]">
                    <Star className="w-4 h-4 fill-[var(--mellow-gold)]" />
                    <span>{displayRating}</span>
                  </div>
                </div>

                {/* Dates & Nights Calculator */}
                {property.isShortLet ? (
                  <div className="space-y-3 p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-light)]">
                    <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)]">
                      <span>STAY DURATION</span>
                      <span>{stayNights} Nights</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="14" 
                      value={stayNights} 
                      onChange={(e) => setStayNights(parseInt(e.target.value))}
                      className="w-full accent-[var(--teal-blue)]"
                    />
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--teal-blue)]" />
                    <span>Long-Term Lease (Minimum 6 Months)</span>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-sm text-[var(--text-secondary)] border-t border-b border-[var(--border-light)] py-4">
                  <div className="flex justify-between">
                    <span>{currencySymbol}{nightlyRate.toLocaleString()} × {property.isShortLet ? `${stayNights} nights` : '1 year'}</span>
                    <span className="font-semibold text-[var(--text-primary)]">{currencySymbol}{totalBase.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      GoDirect Platform Fee (5%)
                      <span className="badge-teal text-[9px] px-1 py-0">Direct Escrow</span>
                    </span>
                    <span className="font-semibold text-[var(--text-primary)]">{currencySymbol}{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-base text-[var(--text-primary)] pt-2 border-t border-[var(--border-light)]">
                    <span>Total Price</span>
                    <span className="text-[var(--teal-blue)]">{currencySymbol}{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onClose();
                      onStartBooking(property, { stayNights, totalBase, serviceFee, grandTotal });
                    }}
                    className="btn-gold w-full py-3.5 text-sm font-bold justify-center shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve via 24h Escrow ({currencySymbol}{grandTotal.toLocaleString()})</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      if (onScheduleTour) onScheduleTour(property);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 text-[#018F8B] border border-[#018F8B]/30 font-bold text-xs transition-all shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Book Agent-Escorted Inspection (Free)</span>
                  </button>
                </div>

                <p className="text-center text-xs text-[var(--text-muted)] font-medium">
                  Direct payment protection • GoDirect Field Agent Escort on all physical tours
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
