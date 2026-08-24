import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import FilterBar from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import ChatDrawer from './components/ChatDrawer';
import HostPortalModal from './components/HostPortalModal';
import BookingModal from './components/BookingModal';
import VideoTourModal from './components/VideoTourModal';
import ScheduleTourModal from './components/ScheduleTourModal';
import AuthModal from './components/AuthModal';
import PWAInstallPrompt from './components/PWAInstallPrompt';

// 3 SEPARATED DASHBOARD PORTALS (MODULARIZED FOLDER ARCHITECTURE)
import UserDashboard from './components/dashboards/user/UserDashboard';
import LandlordDashboard from './components/dashboards/landlord/LandlordDashboard';
import AdminDashboard from './components/dashboards/admin/AdminDashboard';

import StatsBar from './components/StatsBar';
import FeatureGrid from './components/FeatureGrid';
import BestValueMapSection from './components/BestValueMapSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { MOCK_PROPERTIES } from './data/mockData';
import { useAuth } from './contexts/AuthContext';
import { getProperties } from './services/supabaseService';
import { Heart, Search, Sparkles, Building2, ArrowRight, ShieldAlert, ArrowLeftRight } from 'lucide-react';

export default function App() {
  const { user, profile, role } = useAuth();
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  
  // Persistent portal view
  const [currentPortal, setCurrentPortal] = useState(() => {
    try {
      return localStorage.getItem('godirect_portal') || 'public';
    } catch {
      return 'public';
    }
  });

  // Sync portal changes to localStorage
  useEffect(() => {
    if (currentPortal) {
      localStorage.setItem('godirect_portal', currentPortal);
    }
  }, [currentPortal]);

  // Load properties from Supabase Postgres on mount
  useEffect(() => {
    getProperties().then((data) => {
      if (data && data.length > 0) {
        setProperties(data);
      }
    });
  }, []);

  // When user signs in, route them to their real portal if on public
  useEffect(() => {
    if (role === 'admin' && currentPortal === 'public') {
      setCurrentPortal('admin');
    } else if (role === 'landlord' && currentPortal === 'public') {
      setCurrentPortal('landlord');
    }
  }, [role]);
  
  // Public View Filters
  const [activeView, setActiveView] = useState('public'); // 'public' | 'short-lets' | 'rentals' | 'wishlist'
  const [stayTypeFilter, setStayTypeFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State Overlays & Modals
  const [wishlist, setWishlist] = useState(['gd-101']);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [tourProperty, setTourProperty] = useState(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatProperty, setActiveChatProperty] = useState(null);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);
  const [isVideoTourOpen, setIsVideoTourOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Synchronize view tab changes
  useEffect(() => {
    if (activeView === 'short-lets') {
      setStayTypeFilter('short-let');
    } else if (activeView === 'rentals') {
      setStayTypeFilter('rentals');
    } else if (activeView === 'public' || activeView === 'explore') {
      setStayTypeFilter('all');
    }
  }, [activeView]);

  // Wishlist toggle handler
  const handleToggleWishlist = (property) => {
    setWishlist((prev) => 
      prev.includes(property.id)
        ? prev.filter((id) => id !== property.id)
        : [...prev, property.id]
    );
  };

  // Add new property published from Host Portal
  const handleAddProperty = (newProp) => {
    setProperties([newProp, ...properties]);
    setCurrentPortal('public');
    setActiveView('public');
  };

  // Filtered properties computation
  const filteredProperties = properties.filter((prop) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = prop.title.toLowerCase().includes(q);
      const matchesLoc = prop.location.toLowerCase().includes(q);
      const matchesAddress = prop.address.toLowerCase().includes(q);
      if (!matchesTitle && !matchesLoc && !matchesAddress) return false;
    }

    if (stayTypeFilter === 'short-let' && !prop.isShortLet) return false;
    if (stayTypeFilter === 'rentals' && prop.isShortLet) return false;

    if (selectedCategory !== 'all' && prop.type !== selectedCategory) return false;

    if (activeView === 'wishlist' && !wishlist.includes(prop.id)) return false;

    return true;
  });

  const wishlistPropertiesList = properties.filter(p => wishlist.includes(p.id));

  // Portal Switcher Handler
  const handleSelectPortal = (portalId) => {
    setCurrentPortal(portalId);
    if (portalId === 'public') {
      setActiveView('public');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors duration-300">
      
      {/* 1. GUEST / RENTER DASHBOARD (SEPARATED) */}
      {currentPortal === 'user' ? (
        <UserDashboard
          wishlistProperties={wishlistPropertiesList}
          onSelectProperty={setSelectedProperty}
          onOpenChatWithHost={(prop) => {
            setActiveChatProperty(prop);
            setIsChatOpen(true);
          }}
          onReturnToPublic={() => setCurrentPortal('public')}
        />
      ) : 

      /* 2. LANDLORD & SHORT-LETTER DASHBOARD (SEPARATED) */
      currentPortal === 'landlord' ? (
        <LandlordDashboard
          properties={properties}
          onOpenHostPortal={() => setIsHostPortalOpen(true)}
          onOpenChatWithHost={(prop) => {
            setActiveChatProperty(prop);
            setIsChatOpen(true);
          }}
          onSelectProperty={setSelectedProperty}
          onReturnToPublic={() => setCurrentPortal('public')}
        />
      ) :

      /* 3. SUPER ADMIN DASHBOARD (SEPARATED) */
      currentPortal === 'admin' ? (
        <AdminDashboard
          properties={properties}
          onReturnToPublic={() => setCurrentPortal('public')}
          onSelectPortal={handleSelectPortal}
        />
      ) : (

        /* PUBLIC MARKETPLACE PAGE (DEFAULT) */
        <>
          {/* Navigation Header */}
          <Navbar
            activeView={activeView}
            setActiveView={(view) => {
              setActiveView(view);
              setCurrentPortal('public');
            }}
            wishlistCount={wishlist.length}
            unreadCount={1}
            onOpenHostPortal={() => {
              if (user) {
                setIsHostPortalOpen(true);
              } else {
                setAuthModalMode('signup');
                setIsAuthModalOpen(true);
              }
            }}
            onOpenChat={() => setIsChatOpen(true)}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onOpenAuthModal={(m) => {
              setAuthModalMode(m || 'signin');
              setIsAuthModalOpen(true);
            }}
            onGoToDashboard={(targetNav) => {
              if (role === 'admin') setCurrentPortal('admin');
              else if (role === 'landlord') setCurrentPortal('landlord');
              else setCurrentPortal('user');
            }}
          />

          {/* Hero Section */}
          {activeView !== 'wishlist' && (
            <>
              <HeroSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                stayTypeFilter={stayTypeFilter}
                setStayTypeFilter={setStayTypeFilter}
                onPerformSearch={() => {
                  const el = document.getElementById('properties-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenVideoTour={() => setIsVideoTourOpen(true)}
              />

              {/* 1. Social Proof Stats Bar */}
              <StatsBar />

              {/* 2. Feature Showcase Grid ("Your primary home...") */}
              <FeatureGrid
                onExploreClick={() => {
                  const el = document.getElementById('properties-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 3. Best Value Map Interactive Section */}
              <BestValueMapSection
                onExploreClick={() => {
                  const el = document.getElementById('properties-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onSelectProperty={setSelectedProperty}
                properties={properties}
              />
            </>
          )}

          {/* Main Content Container */}
          <main className="flex-1">
            
            {/* Category & Filter Bar */}
            {activeView !== 'wishlist' && (
              <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onOpenFilterDrawer={() => {}}
                totalResultsCount={filteredProperties.length}
              />
            )}

            <div id="properties-grid" className="container py-12">
              
              {/* Wishlist Header Banner */}
              {activeView === 'wishlist' ? (
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                    <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
                      Your Saved Properties ({filteredProperties.length})
                    </h1>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Access your saved luxury penthouses, short-lets, and rental residences anytime.
                  </p>
                </div>
              ) : (
                /* Sub-Section Navigation Header */
                <div className="mb-10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
                        {stayTypeFilter === 'short-let'
                          ? 'Verified Short-Let Suites & Vacation Stays'
                          : stayTypeFilter === 'rentals'
                          ? 'Direct Landlord Rentals & Sales'
                          : 'Explore Marketplace & Shortlets'}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {stayTypeFilter === 'short-let'
                          ? 'Browse top-rated luxury short-let apartments and vacation villas with daily pricing.'
                          : stayTypeFilter === 'rentals'
                          ? 'Long-term residential leases, luxury penthouses, and estates directly from landlords.'
                          : 'Browse top-rated short-let suites or direct landlord long-term leases & sales.'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setStayTypeFilter('all');
                        setActiveView('public');
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-[var(--text-primary)] hover:text-[var(--teal-blue)] transition-colors self-start sm:self-auto"
                    >
                      <span>See All Properties</span>
                      <ArrowRight className="w-4 h-4 text-amber-500" />
                    </button>
                  </div>

                  {/* 2 Sub-Section Pill Switcher */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[var(--border-light)] pb-4">
                    <button
                      onClick={() => setStayTypeFilter('all')}
                      className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all border ${
                        stayTypeFilter === 'all'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-slate-400'
                      }`}
                    >
                      ⚡ All Listings ({filteredProperties.length})
                    </button>

                    <button
                      onClick={() => setStayTypeFilter('short-let')}
                      className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all border ${
                        stayTypeFilter === 'short-let'
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-amber-500'
                      }`}
                    >
                      🏢 Shortlet Sub-Section ({properties.filter(p => p.isShortLet).length})
                    </button>

                    <button
                      onClick={() => setStayTypeFilter('rentals')}
                      className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all border ${
                        stayTypeFilter === 'rentals'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-slate-700'
                      }`}
                    >
                      🏘️ Property Marketplace Sub-Section ({properties.filter(p => !p.isShortLet).length})
                    </button>
                  </div>
                </div>
              )}

              {/* PROPERTIES SUB-SECTIONS CONTAINER */}
              {filteredProperties.length > 0 ? (
                <div className="space-y-16">
                  
                  {/* SUB-SECTION 1: SHORTLET RESIDENCES */}
                  {(stayTypeFilter === 'all' || stayTypeFilter === 'short-let') && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                            🏢
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                                Shortlet Residences & Vacation Stays
                              </h3>
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                                SUB-SECTION 1
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)]">
                              Verified short-let apartments & vacation penthouses with daily pricing and zero broker commission.
                            </p>
                          </div>
                        </div>

                        <span className="hidden sm:inline-block text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                          {filteredProperties.filter(p => p.isShortLet).length} Short-Lets
                        </span>
                      </div>

                      {filteredProperties.filter(p => p.isShortLet).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                          {filteredProperties
                            .filter(p => p.isShortLet)
                            .map((property) => (
                              <PropertyCard
                                key={property.id}
                                property={property}
                                onSelectProperty={setSelectedProperty}
                                onToggleWishlist={handleToggleWishlist}
                                isWishlisted={wishlist.includes(property.id)}
                                onOpenChatWithHost={(prop) => {
                                  setActiveChatProperty(prop);
                                  setIsChatOpen(true);
                                }}
                              />
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-[var(--bg-surface)] rounded-2xl text-xs text-[var(--text-muted)]">
                          No short-let properties match your search filters.
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB-SECTION 2: PROPERTY MARKETPLACE (LONG-TERM RENTALS & SALES) */}
                  {(stayTypeFilter === 'all' || stayTypeFilter === 'rentals') && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                            🏘️
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl sm:text-2xl font-black text-white">
                                Property Marketplace (Rentals & Sales)
                              </h3>
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px]">
                                SUB-SECTION 2
                              </span>
                            </div>
                            <p className="text-xs text-slate-300">
                              Direct landlord long-term rental leases and verified residential properties for purchase.
                            </p>
                          </div>
                        </div>

                        <span className="hidden sm:inline-block text-xs font-bold text-amber-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                          {filteredProperties.filter(p => !p.isShortLet).length} Marketplace Listings
                        </span>
                      </div>


                      {filteredProperties.filter(p => !p.isShortLet).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                          {filteredProperties
                            .filter(p => !p.isShortLet)
                            .map((property) => (
                              <PropertyCard
                                key={property.id}
                                property={property}
                                onSelectProperty={setSelectedProperty}
                                onToggleWishlist={handleToggleWishlist}
                                isWishlisted={wishlist.includes(property.id)}
                                onOpenChatWithHost={(prop) => {
                                  setActiveChatProperty(prop);
                                  setIsChatOpen(true);
                                }}
                              />
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-[var(--bg-surface)] rounded-2xl text-xs text-[var(--text-muted)]">
                          No marketplace rental/sale properties match your search filters.
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-20 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-light)] max-w-lg mx-auto p-8 shadow-sm">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--bg-elevated)] text-[var(--text-muted)] flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-[var(--teal-blue)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-6">
                    {activeView === 'wishlist' 
                      ? "You haven't saved any properties to your wishlist yet." 
                      : "No properties match your current search filters."}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setStayTypeFilter('all');
                      setActiveView('public');
                    }}
                    className="btn-primary text-xs px-6 py-2.5"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}


            </div>

            {/* 4. Frequently Asked Questions (FAQ) Section */}
            {activeView !== 'wishlist' && (
              <FAQSection onOpenHostPortal={() => setIsHostPortalOpen(true)} />
            )}

          </main>

          {/* Footer */}
          <Footer
            setActiveView={setActiveView}

            onOpenHostPortal={() => setIsHostPortalOpen(true)}
          />
        </>
      )}

      {/* OVERLAY MODALS & DRAWERS */}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onOpenChatWithHost={(prop) => {
            setActiveChatProperty(prop);
            setIsChatOpen(true);
          }}
          onStartBooking={(prop, calculation) => {
            setBookingData({ property: prop, calculation });
          }}
          isWishlisted={wishlist.includes(selectedProperty.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenVideoTour={() => setIsVideoTourOpen(true)}
          onScheduleTour={(prop) => {
            setTourProperty(prop);
            setIsTourModalOpen(true);
          }}
        />
      )}

      {/* Schedule Tour / Agent Escort Modal */}
      {isTourModalOpen && tourProperty && (
        <ScheduleTourModal
          isOpen={isTourModalOpen}
          onClose={() => setIsTourModalOpen(false)}
          property={tourProperty}
        />
      )}

      {/* Booking Checkout Modal */}
      {bookingData && (
        <BookingModal
          bookingData={bookingData}
          onClose={() => setBookingData(null)}
          onConfirmSuccess={() => setBookingData(null)}
        />
      )}

      {/* Full-screen 4K Video Tour Modal */}
      <VideoTourModal
        isOpen={isVideoTourOpen}
        onClose={() => setIsVideoTourOpen(false)}
        videoSrc="/video/Initial_Scene_-_2026-08-22_202608230019.mp4"
        title="GoDirect 4K Virtual Property Walkthrough"
      />

      {/* Landlord Host Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activePropertyForChat={activeChatProperty}
      />

      {/* Landlord Host Portal Modal */}
      <HostPortalModal
        isOpen={isHostPortalOpen}
        onClose={() => setIsHostPortalOpen(false)}
        onAddProperty={handleAddProperty}
      />

      {/* Authentication (Sign In & Sign Up) Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={(chosenRole) => {
          if (chosenRole === 'admin') setCurrentPortal('admin');
          else if (chosenRole === 'landlord') setCurrentPortal('landlord');
          else setCurrentPortal('user');
        }}
      />

      {/* PWA Mobile & Desktop Install Prompt */}
      <PWAInstallPrompt />

    </div>
  );
}
