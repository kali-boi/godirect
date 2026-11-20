import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  ShieldCheck, 
  Upload, 
  Check, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2,
  Sparkles,
  Zap,
  Phone,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  Landmark,
  FileText
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
  const [uploadError, setUploadError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    state: 'Lagos',
    neighborhood: 'Ikoyi',
    address: '',
    price: 350000,
    pricePeriod: 'night',
    type: 'luxury-villa',
    isShortLet: true,
    minNights: 1,
    serviceCharge: 0,
    furnishingStatus: 'Furnished',
    beds: 3,
    baths: 3,
    maxGuests: 6,
    sqft: 2500,
    description: '',
    amenities: [
      '24/7 Power / Standby Generator',
      'Inverter & Solar System',
      'High-Speed Fibre / Starlink',
      'Treated Water Supply',
      '24/7 Uniformed Security & Patrol',
      'Swimming Pool',
      'Smart Digital Lock',
      'Air Conditioning'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    customImageUrl: '',
    // Step 4: Deed & Payout Bank
    deedType: 'Certificate of Occupancy (C of O)',
    deedDocumentName: '',
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '',
    accountName: '',
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
        hostPhone: user?.user_metadata?.phone || profile?.phone || '+234 ',
        accountName: prev.accountName || user?.user_metadata?.full_name || profile?.full_name || ''
      }));
    }
  }, [user, profile]);

  const nigerianNeighborhoods = {
    Lagos: [
      'Ikoyi',
      'Victoria Island',
      'Banana Island',
      'Lekki Phase 1',
      'Eko Atlantic',
      'Chevron / Lekki 2',
      'Ikeja GRA',
      'Magodo Phase 2'
    ],
    Abuja: [
      'Maitama',
      'Guzape',
      'Wuse 2',
      'Asokoro',
      'Jabi',
      'Garki'
    ],
    Rivers: [
      'Old GRA, Port Harcourt',
      'Peter Odili Road',
      'Trans-Amadi'
    ]
  };

  const shortletTypes = [
    { id: 'luxury-villa', label: 'Luxury Villa' },
    { id: 'penthouse', label: 'Executive Penthouse' },
    { id: 'apartment', label: 'Serviced Apartment' },
    { id: 'waterfront', label: 'Waterfront Suite' },
    { id: 'studio', label: 'Studio Suite' }
  ];

  const rentalTypes = [
    { id: 'duplex', label: 'Detached Duplex' },
    { id: 'terraced', label: 'Terraced Mansion' },
    { id: 'penthouse', label: 'Luxury Penthouse' },
    { id: 'apartment', label: 'Residential Flat' },
    { id: 'commercial', label: 'Commercial Space' }
  ];

  const availableAmenitiesList = [
    '24/7 Power / Standby Generator',
    'Inverter & Solar System',
    'Treated Water Supply',
    'High-Speed Fibre / Starlink',
    '24/7 Uniformed Security & Patrol',
    'CCTV Surveillance',
    'Smart Digital Lock',
    'Swimming Pool',
    'Private Gym',
    'Chef Kitchen',
    'Air Conditioning',
    'Elevator / Lift',
    'Private Garden',
    'Underground Parking'
  ];

  const nigerianBanks = [
    'Guaranty Trust Bank (GTBank)',
    'Zenith Bank',
    'Access Bank',
    'First Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Stanbic IBTC Bank',
    'Kuda Microfinance Bank',
    'Sterling Bank',
    'Fidelity Bank',
    'Wema Bank'
  ];

  const handleToggleAmenity = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
    } else {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
    }
  };

  // Device File Upload Handler for Images
  const handleDeviceImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadError('');
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('One or more images exceed 5MB. Please choose smaller images.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Data = uploadEvent.target.result;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, base64Data]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Add custom URL image
  const handleAddImageUrl = () => {
    if (formData.customImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, prev.customImageUrl.trim()],
        customImageUrl: ''
      }));
    }
  };

  // Remove an image from gallery
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Title Deed Document upload simulation
  const handleDeedUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        deedDocumentName: file.name
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullLocation = `${formData.neighborhood}, ${formData.state}`;
    const propertyPrice = Number(formData.price);

    const propertyPayload = {
      title: formData.title || `Luxury ${formData.type.replace('-', ' ')} in ${formData.neighborhood}`,
      location: fullLocation,
      address: formData.address || `${formData.neighborhood}, ${formData.state} State, Nigeria`,
      pricePerNight: formData.isShortLet ? propertyPrice : Math.round(propertyPrice / 365),
      pricePerYear: !formData.isShortLet ? propertyPrice : propertyPrice * 365,
      price: propertyPrice,
      currency: 'NGN',
      type: formData.type,
      isShortLet: formData.isShortLet,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      maxGuests: formData.isShortLet ? Number(formData.maxGuests) : Number(formData.beds) * 2,
      sqft: Number(formData.sqft),
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      description: formData.description || `Exquisite verified property located in prime ${formData.neighborhood}. Features 24/7 power, treated water, smart security, and 0% agency fees.`,
      amenities: formData.amenities,
      minNights: formData.isShortLet ? Number(formData.minNights) : 365,
      serviceCharge: Number(formData.serviceCharge || 0),
      furnishingStatus: formData.furnishingStatus,
      deedType: formData.deedType,
      payoutBank: formData.bankName,
      payoutAccountNumber: formData.accountNumber
    };

    try {
      const result = await createProperty(propertyPayload, user?.id || '07007ede-198f-4615-8e8f-522c1c0d848b');
      const finalProperty = {
        id: result?.data?.id || `gd-${Date.now().toString().slice(-4)}`,
        ...propertyPayload,
        isVerified: false,
        verificationStatus: 'pending',
        isSuperhost: true,
        rating: 5.0,
        reviewsCount: 0,
        host: {
          id: user?.id || '07007ede-198f-4615-8e8f-522c1c0d848b',
          name: formData.hostName,
          role: 'Verified Direct Owner',
          avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          responseRate: '100%',
          responseTime: 'within 15 minutes',
          phone: formData.hostPhone,
          email: formData.hostEmail,
          joinedYear: '2026'
        }
      };

      if (onAddProperty) onAddProperty(finalProperty);
      onClose();
    } catch (err) {
      console.warn('Listing submission error:', err);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in font-['Host_Grotesk']">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] text-slate-900">
        
        {/* Header - Solid Navy with Crisp White Elements */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B2545] text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-xs">
              <img
                src="/images/logo.png"
                alt="GoDirect Logo"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  Direct Landlord Listing
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#CC9955] text-slate-950 text-[10px] font-black uppercase shadow-xs">
                  0% Broker Fee
                </span>
              </div>
              <p className="text-xs text-slate-300">Publish your verified short-let or rental with 24h Escrow Protection</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-4 px-4 sm:px-6 py-3 bg-slate-100 border-b border-slate-200 text-[11px] font-extrabold shrink-0 gap-2">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#018F8B]' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step >= 1 ? 'bg-[#018F8B] text-white' : 'bg-slate-200 text-slate-600'
            }`}>1</span>
            <span className="hidden sm:inline">Mode & Info</span>
          </div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#018F8B]' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step >= 2 ? 'bg-[#018F8B] text-white' : 'bg-slate-200 text-slate-600'
            }`}>2</span>
            <span className="hidden sm:inline">Specs & Power</span>
          </div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#018F8B]' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step >= 3 ? 'bg-[#018F8B] text-white' : 'bg-slate-200 text-slate-600'
            }`}>3</span>
            <span className="hidden sm:inline">Photos</span>
          </div>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#018F8B]' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step >= 4 ? 'bg-[#018F8B] text-white' : 'bg-slate-200 text-slate-600'
            }`}>4</span>
            <span className="hidden sm:inline">Deed & Bank</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-900 bg-white">
          
          {/* STEP 1: RENTAL MODE & BASIC DETAILS */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in text-xs">
              
              {/* Rental Mode Selector */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  Select Rental Mode *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ 
                      ...formData, 
                      isShortLet: true, 
                      type: 'luxury-villa',
                      pricePeriod: 'night',
                      price: 250000 
                    })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all space-y-1 ${
                      formData.isShortLet
                        ? 'border-[#018F8B] bg-teal-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-950">Short-Let / Daily Stay</span>
                      <Zap className="w-4 h-4 text-[#018F8B]" />
                    </div>
                    <p className="text-[11px] text-slate-600">Priced per night (₦/night) with 24h guest escrow protection.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ 
                      ...formData, 
                      isShortLet: false, 
                      type: 'duplex',
                      pricePeriod: 'year',
                      price: 18000000 
                    })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all space-y-1 ${
                      !formData.isShortLet
                        ? 'border-[#0B2545] bg-slate-100/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-950">Long-Term Lease / Rental</span>
                      <Building2 className="w-4 h-4 text-[#0B2545]" />
                    </div>
                    <p className="text-[11px] text-slate-600">Priced per annum (₦/year) with 0% middleman commission.</p>
                  </button>
                </div>
              </div>

              {/* Property Title */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={formData.isShortLet ? "e.g. The Sapphire Waterfront Penthouse with Infinity Pool" : "e.g. 5-Bedroom Fully Detached Contemporary Duplex"}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#018F8B] shadow-2xs"
                />
              </div>

              {/* Property Sub-Type */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  Property Sub-Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(formData.isShortLet ? shortletTypes : rentalTypes).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: t.id })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                        formData.type === t.id
                          ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                    State / Region *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => {
                      const newState = e.target.value;
                      setFormData({ 
                        ...formData, 
                        state: newState,
                        neighborhood: nigerianNeighborhoods[newState]?.[0] || 'Ikoyi'
                      });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#018F8B]"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">Federal Capital Territory (Abuja)</option>
                    <option value="Rivers">Rivers State (Port Harcourt)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                    Prime Neighborhood *
                  </label>
                  <select
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#018F8B]"
                  >
                    {(nigerianNeighborhoods[formData.state] || []).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  Street Address (Disclosed to verified guests after booking)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14 Alexander Avenue, Off Bourdillon Road"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-[#018F8B]"
                />
              </div>

              {/* Price input in NGN */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  Listing Price ({formData.isShortLet ? '₦ / night' : '₦ / year'}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500 font-extrabold text-sm">₦</span>
                  <input
                    type="number"
                    required
                    min="10000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm font-black text-slate-950 outline-none focus:border-[#018F8B]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                  {formData.isShortLet 
                    ? `Guest will pay ₦${Number(formData.price || 0).toLocaleString()} per night. 0% deduction.`
                    : `Annual tenant rent: ₦${Number(formData.price || 0).toLocaleString()} per annum.`}
                </p>
              </div>

            </div>
          )}

          {/* STEP 2: SPECS, UTILITIES & AMENITIES */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in text-xs">
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-800 uppercase mb-1">Bedrooms</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-800 uppercase mb-1">Bathrooms</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.baths}
                    onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-800 uppercase mb-1">Max Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-800 uppercase mb-1">SqFt Area</label>
                  <input
                    type="number"
                    min="100"
                    value={formData.sqft}
                    onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Mode-Specific Term Details */}
              {formData.isShortLet ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-teal-50 border border-teal-200">
                  <div>
                    <label className="block font-extrabold text-teal-950 uppercase mb-1">Minimum Stay (Nights)</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.minNights}
                      onChange={(e) => setFormData({ ...formData, minNights: e.target.value })}
                      className="w-full bg-white border border-teal-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-teal-950 uppercase mb-1">Standard Hours</label>
                    <div className="text-xs font-bold text-teal-800 pt-2">
                      2:00 PM Check-in • 11:00 AM Check-out
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-100 border border-slate-200">
                  <div>
                    <label className="block font-extrabold text-slate-900 uppercase mb-1">Service Charge (₦/yr)</label>
                    <input
                      type="number"
                      placeholder="e.g. 2500000"
                      value={formData.serviceCharge}
                      onChange={(e) => setFormData({ ...formData, serviceCharge: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-slate-900 uppercase mb-1">Furnishing Status</label>
                    <select
                      value={formData.furnishingStatus}
                      onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    >
                      <option>Furnished</option>
                      <option>Semi-Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Power & Real Estate Amenities */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  Select Included Utilities & Amenities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableAmenitiesList.map((amenity, idx) => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleAmenity(amenity)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                          isChecked
                            ? 'bg-[#018F8B] text-white border-[#018F8B] shadow-2xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Highlight key selling points (e.g. uninterrupted 24h power, treated borehole water, automated smart lights, private pool)..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium outline-none focus:border-[#018F8B] resize-none"
                />
              </div>

            </div>
          )}

          {/* STEP 3: DEVICE IMAGE UPLOADS & PHOTO GALLERY */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in text-xs">
              
              {/* Device File Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-300 hover:border-[#018F8B] rounded-3xl p-6 text-center space-y-3 bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#018F8B] flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                
                <div className="space-y-1">
                  <p className="font-extrabold text-sm text-slate-900">
                    Upload Photos Directly from Your Phone or Computer
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports PNG, JPG, JPEG, WebP • Up to 5MB per file • Select multiple photos
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer shadow-sm">
                  <ImageIcon className="w-4 h-4" />
                  <span>Choose Photos from Device</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleDeviceImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Or Add Via Direct Image URL */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 uppercase tracking-wider block">
                  Or Add Direct Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.customImageUrl}
                    onChange={(e) => setFormData({ ...formData, customImageUrl: e.target.value })}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#018F8B]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2.5 rounded-xl bg-[#018F8B] text-white text-xs font-bold hover:bg-teal-700 shrink-0"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Image Gallery Thumbnails Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 uppercase tracking-wider">
                    Uploaded Gallery ({formData.images.length} photos)
                  </span>
                  <span className="text-[11px] text-slate-500 font-bold">First image is the Primary Cover</span>
                </div>

                {formData.images.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                    No images added yet. Upload at least 1 photo of the property.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.images.map((imgSrc, idx) => (
                      <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-200 aspect-4/3 bg-slate-100 shadow-2xs">
                        <img src={imgSrc} alt={`Property upload ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 bg-[#0B2545] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                            Cover Photo
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STEP 4: TITLE DEED & PAYOUT BANK */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in text-xs">
              
              {/* Title Deed Verification Section */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#CC9955]" />
                  <span>Title Deed & Ownership Verification</span>
                </div>
                <p className="text-amber-900 text-xs font-medium">
                  To maintain GoDirect's 100% verified status, please declare your title document. Your property will enter the Admin queue for immediate deed review.
                </p>

                <div className="space-y-2 pt-1">
                  <label className="font-extrabold text-slate-800 block uppercase">
                    Title Document Type *
                  </label>
                  <select
                    value={formData.deedType}
                    onChange={(e) => setFormData({ ...formData, deedType: e.target.value })}
                    className="w-full bg-white border border-amber-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900"
                  >
                    <option>Certificate of Occupancy (C of O)</option>
                    <option>Governor's Consent</option>
                    <option>Deed of Assignment</option>
                    <option>Gazette / Excision</option>
                    <option>Short-Let Management Authorization Agreement</option>
                  </select>
                </div>

                <div className="pt-2">
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-amber-300 bg-white hover:bg-amber-50 cursor-pointer text-slate-800 font-bold transition-all">
                    <FileText className="w-4 h-4 text-[#CC9955]" />
                    <span>{formData.deedDocumentName ? `Attached: ${formData.deedDocumentName}` : 'Upload Title Deed Proof (PDF / PNG / JPG)'}</span>
                    <input type="file" accept=".pdf,image/*" onChange={handleDeedUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Escrow Payout Bank Account Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Landmark className="w-5 h-5 text-[#018F8B]" />
                  <span>Escrow Payout Bank Details</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Guest booking payments are held securely in GoDirect 24h Escrow and disbursed directly to this Nigerian bank account after check-in.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-extrabold text-slate-800 block uppercase mb-1">Bank Name</label>
                    <select
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    >
                      {nigerianBanks.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-extrabold text-slate-800 block uppercase mb-1">Account Number</label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="0123456789"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 0% Commission Summary Badge */}
              <div className="p-4 rounded-2xl bg-[#0B2545] text-white flex items-center justify-between gap-4 shadow-sm">
                <div>
                  <div className="font-extrabold text-sm text-[#CC9955]">GoDirect 0% Host Commission Guarantee</div>
                  <p className="text-xs text-slate-300">You receive 100% of your listed price directly into your bank account.</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-400">Total Net Yield</div>
                  <div className="text-base font-black text-white">
                    ₦{Number(formData.price || 0).toLocaleString()} {formData.isShortLet ? '/night' : '/yr'}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Wizard Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100"
              >
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-slate-800 shadow-md"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#CC9955] to-[#e0ad6b] text-slate-950 text-xs font-black shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting to Verification Queue...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish Listing for Deed Review</span>
                  </>
                )}
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
