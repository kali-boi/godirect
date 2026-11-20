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
import PropertiesPage from './components/PropertiesPage';
import { useAuth } from './contexts/AuthContext';
import { getProperties } from './services/supabaseService';
import { Heart, Search, Sparkles, Building2, ArrowRight, ShieldAlert, ArrowLeftRight, Loader2, Zap } from 'lucide-react';

export default function App() {
  const { user, profile, role } = useAuth();
  const [properties, setProperties] = useState([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  
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
    setIsLoadingProperties(true);
    getProperties()
      .then((data) => {
        setProperties(data || []);
      })
      .catch((err) => {
        console.error('Failed to load properties from Supabase:', err);
        setProperties([]);
      })
      .finally(() => {
        setIsLoadingProperties(false);
      });
  }, []);

  // When user signs in, route them to their real portal if on public or user
  useEffect(() => {
    if (role === 'admin' && (currentPortal === 'public' || currentPortal === 'user')) {
      setCurrentPortal('admin');
    } else if (role === 'landlord' && (currentPortal === 'public' || currentPortal === 'user')) {
      setCurrentPortal('landlord');
    }
  }, [role]);
  
  // Public View Filters
  const [activeView, setActiveView] = useState('public'); // 'public' | 'short-lets' | 'rentals' | 'wishlist'
  const [stayTypeFilter, setStayTypeFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State Overlays & Modals
  const [wishlist, setWishlist] = useState([]);
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
    setProperties((prev) => [newProp, ...prev]);
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
          onSelectPortal={handleSelectPortal}
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
          onSelectPortal={handleSelectPortal}
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
            unreadCount={0}
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

          {/* Dedicated Properties Explorer Page View */}
          {(activeView === 'explore' || activeView === 'properties') ? (
            <PropertiesPage
              properties={properties}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectProperty={setSelectedProperty}
              onScheduleTour={(prop) => {
                setTourProperty(prop);
                setIsTourModalOpen(true);
              }}
              initialStayType={stayTypeFilter}
              onReturnToHome={() => setActiveView('public')}
            />
          ) : (
            <>
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
                
                {/* ─── 1. MARKETPLACE SECTION HEADER & SEGMENT SELECTOR (PLACED ABOVE FILTER BAR) ─── */}
                <div id="properties-grid" className="container pt-12 pb-2">
                  
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
                    <div className="mb-4 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#122525] tracking-tight">
                            {stayTypeFilter === 'short-let'
                              ? 'Short-let apartments & homes'
                              : stayTypeFilter === 'rentals'
                              ? 'Direct annual rentals'
                              : 'Latest verified listings'}
                          </h2>
                          <p className="text-sm text-neutral-600 mt-1">
                            {stayTypeFilter === 'short-let'
                              ? 'Daily and weekly stays with 24-hour check-in escrow.'
                              : stayTypeFilter === 'rentals'
                              ? 'Annual leases directly from property owners with 0% agency fee.'
                              : 'Browse short-lets and annual leases directly from verified landlords.'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveView('explore');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#018F8B] hover:text-[#017774] transition-colors self-start sm:self-auto"
                        >
                          <span>See all properties</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 3-Way Sub-Section Switcher */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                        <button
                          type="button"
                          onClick={() => {
                            setStayTypeFilter('all');
                            setSelectedCategory('all');
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                            stayTypeFilter === 'all'
                              ? 'bg-[#122525] text-white border-[#122525]'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          All ({properties.length})
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setStayTypeFilter('short-let');
                            setSelectedCategory('all');
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                            stayTypeFilter === 'short-let'
                              ? 'bg-[#018F8B] text-white border-[#018F8B]'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          Short-lets ({properties.filter(p => p.isShortLet).length})
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setStayTypeFilter('rentals');
                            setSelectedCategory('all');
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                            stayTypeFilter === 'rentals'
                              ? 'bg-[#122525] text-white border-[#122525]'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          Annual rentals ({properties.filter(p => !p.isShortLet).length})
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* ─── 2. CATEGORY & FILTER BAR (PLACED DIRECTLY BELOW MARKETPLACE HEADER) ─── */}
                {activeView !== 'wishlist' && (
                  <FilterBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    stayTypeFilter={stayTypeFilter}
                    onOpenFilterDrawer={() => {
                      setActiveView('explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    totalResultsCount={filteredProperties.length}
                  />
                )}

                {/* ─── 3. UNIFIED RESPONSIVE PROPERTY GRID (CLEAN & DIRECT) ─── */}
                <div className="container pb-16">

                  {isLoadingProperties ? (
                    /* Loading Skeleton Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-4">
                          <div className="h-48 bg-slate-200/80 rounded-2xl w-full" />
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-200/80 rounded-md w-3/4" />
                            <div className="h-3 bg-slate-200/60 rounded-md w-1/2" />
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <div className="h-5 bg-slate-200/80 rounded-md w-1/3" />
                            <div className="h-8 bg-slate-200/80 rounded-xl w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProperties.map((property) => (
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
                          onScheduleTour={(prop) => {
                            setTourProperty(prop);
                            setIsTourModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Clean Empty State */
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-lg mx-auto p-8 shadow-xs space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center">
                        <Search className="w-7 h-7 text-[#018F8B]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          No Properties Found
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {activeView === 'wishlist' 
                            ? "You haven't saved any properties to your wishlist yet." 
                            : "No properties match your current search and category filters."}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setStayTypeFilter('all');
                          setActiveView('public');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
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
            </>
          )}

          {/* Footer for Public Portal */}
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
