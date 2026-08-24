import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  ShieldCheck, 
  Upload, 
  Check, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize2,
  Sparkles,
  Zap,
  Phone
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createProperty } from '../services/supabaseService';

export default function HostPortalModal({ 
  isOpen, 
  onClose, 
  onAddProperty 
}) {
  if (!isOpen) return null;

  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    location: 'Ikoyi, Lagos',
    address: '',
    price: 450000,
    pricePeriod: 'night',
    type: 'short-let',
    isShortLet: true,
    beds: 3,
    baths: 3,
    sqft: 2400,
    description: '',
    amenities: ['High-Speed Wi-Fi', 'Air Conditioning', '24/7 Security', 'Private Parking', 'Swimming Pool', 'Standby Generator'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    hostName: '',
    hostEmail: '',
    hostPhone: ''
  });

  useEffect(() => {
    if (user || profile) {
      setFormData(prev => ({
        ...prev,
        hostName: user?.user_metadata?.full_name || profile?.full_name || 'Verified Direct Landlord',
        hostEmail: user?.email || profile?.email || '',
        hostPhone: user?.user_metadata?.phone || profile?.phone || '+234 '
      }));
    }
  }, [user, profile]);

  const availableAmenitiesList = [
    'Private Rooftop Pool', '24/7 Concierge', 'High-Speed Wi-Fi',
    'Underground Parking', 'Smart Home Automation', 'Chef Kitchen',
    'Air Conditioning', 'Standby Generator', 'Sauna & Spa', 'Private Garden'
  ];

  const handleToggleAmenity = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
    } else {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const propertyPayload = {
      title: formData.title || 'Luxury Residence in Ikoyi',
      location: formData.location || 'Ikoyi, Lagos',
      address: formData.address || `${formData.location || 'Ikoyi'}, Lagos State`,
      pricePerNight: formData.isShortLet ? Number(formData.price) : Math.round(Number(formData.price) / 30),
      pricePerYear: !formData.isShortLet ? Number(formData.price) * 12 : Number(formData.price) * 365,
      price: Number(formData.price),
      currency: 'NGN',
      type: formData.type,
      isShortLet: formData.isShortLet,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      maxGuests: Number(formData.beds) * 2,
      sqft: Number(formData.sqft),
      images: [
        formData.imageUrl,
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ],
      description: formData.description || 'Newly listed direct landlord property with top-tier finishes, standby generator, and modern smart amenities.',
      amenities: formData.amenities
    };

    try {
      const result = await createProperty(propertyPayload, user?.id || 'usr-host-direct');
      const finalProperty = {
        id: result?.data?.id || `gd-${Date.now().toString().slice(-4)}`,
        ...propertyPayload,
        isVerified: true,
        isSuperhost: true,
        rating: 5.0,
        reviewsCount: 1,
        host: {
          id: user?.id || 'usr-host-direct',
          name: formData.hostName,
          role: 'Verified Property Owner',
          avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          responseRate: '100%',
          responseTime: 'within 10 minutes',
          phone: formData.hostPhone,
          email: formData.hostEmail,
          joinedYear: '2026'
        }
      };

      if (onAddProperty) onAddProperty(finalProperty);
      onClose();
    } catch (err) {
      console.warn('Listing error:', err);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-medium)] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--deep-teal)] text-white border-b border-teal-900">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="GoDirect Logo"
              className="h-9 w-auto object-contain filter brightness-110"
            />
            <div>
              <h3 className="font-bold text-lg">Host Portal</h3>
              <p className="text-xs text-teal-200">List your property with zero commissions</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-teal-900/50 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-8 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-light)] text-xs font-bold text-[var(--text-secondary)]">
          <span className={step >= 1 ? 'text-[var(--teal-blue)]' : ''}>1. Basic Details</span>
          <span className={step >= 2 ? 'text-[var(--teal-blue)]' : ''}>2. Specs & Amenities</span>
          <span className={step >= 3 ? 'text-[var(--teal-blue)]' : ''}>3. Photos & Publish</span>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Crown Penthouse in Mayfair"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--teal-blue)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                    Rental Mode
                  </label>
                  <select
                    value={formData.isShortLet ? 'short-let' : 'rental'}
                    onChange={(e) => {
                      const isShort = e.target.value === 'short-let';
                      setFormData({ 
                        ...formData, 
                        isShortLet: isShort, 
                        type: isShort ? 'short-let' : 'apartment',
                        pricePeriod: isShort ? 'night' : 'month'
                      });
                    }}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--teal-blue)]"
                  >
                    <option value="short-let">Short-Let / Vacation</option>
                    <option value="rental">Long-Term Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                    Price (${formData.isShortLet ? '/night' : '/month'}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--teal-blue)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                  Location / City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kensington, London"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--teal-blue)]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.baths}
                    onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">SqFt Area</label>
                  <input
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  Select Amenities Included
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableAmenitiesList.map((amenity, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleAmenity(amenity)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                        formData.amenities.includes(amenity)
                          ? 'bg-[var(--teal-blue)] text-white border-[var(--teal-blue)]'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{amenity}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                  Main Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] outline-none"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-light)] flex items-center gap-3">
                <img src={formData.imageUrl} alt="preview" className="w-20 h-16 rounded-xl object-cover" />
                <div className="text-xs">
                  <div className="font-bold text-[var(--text-primary)]">{formData.title || 'Untitled Listing'}</div>
                  <div className="text-[var(--teal-blue)] font-semibold">${formData.price} /{formData.pricePeriod}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--mellow-gold)]" />
                  <span>Instant Landlord Verification</span>
                </div>
                <p>By publishing, you confirm ownership or legal authority to lease/rent this property on GoDirect.</p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary text-xs px-6 py-2.5"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="btn-gold text-xs px-8 py-3 font-bold shadow-md"
              >
                Publish Property Live
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
