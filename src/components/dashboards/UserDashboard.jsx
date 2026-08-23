import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Download, 
  MessageSquare, 
  ShieldCheck, 
  CreditCard,
  Building2,
  ArrowRight,
  LogOut,
  Search,
  Bell,
  SlidersHorizontal,
  Home,
  FileText,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Globe,
  Settings,
  Shield,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Send
} from 'lucide-react';

export default function UserDashboard({ 
  wishlistProperties, 
  onSelectProperty, 
  onOpenChatWithHost,
  onReturnToPublic 
}) {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'bookings' | 'wishlist' | 'wallet' | 'profile'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Guest Bookings Data
  const bookings = [
    {
      id: 'res-881',
      propertyName: 'The Skyview Horizon Penthouse',
      location: 'Mayfair, London',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      dates: 'Oct 12 - Oct 16, 2026',
      nights: 4,
      totalPaid: 3570,
      hostName: 'Eleanor Vance',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'Confirmed',
      code: 'GD-992014'
    },
    {
      id: 'res-882',
      propertyName: 'Eiffel View Executive Suite',
      location: '7th Arr, Paris',
      image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
      dates: 'Dec 20 - Dec 27, 2026',
      nights: 7,
      totalPaid: 4557,
      hostName: 'Jean-Luc Dubois',
      hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      status: 'Upcoming',
      code: 'GD-441829'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fffafa] text-[#122525] font-['Host_Grotesk'] flex flex-col md:flex-row">
      
      {/* 📌 DEDICATED DEEP TEAL SIDEBAR (GODIRECT BRAND COLOR) */}
      <aside className="w-full md:w-72 bg-[#122525] text-white p-4 md:p-6 flex flex-col justify-between shrink-0 shadow-xl border-r border-[#1a3535]">
        
        <div className="space-y-6">
          {/* Logo & Persona Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onReturnToPublic}>
              <img
                src="/images/logo.png"
                alt="GoDirect Logo"
                className="h-10 w-auto object-contain filter brightness-110"
              />
              <span className="px-2 py-0.5 rounded-md bg-teal-800 text-teal-200 text-[10px] font-extrabold uppercase tracking-wider">
                Renter Portal
              </span>
            </div>


            <button onClick={onReturnToPublic} className="md:hidden p-2 rounded-full bg-[#1a3535] text-white">
              <Home className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'home', label: 'Discover & Home', icon: Home },
              { id: 'bookings', label: 'My Stays', icon: Calendar, badge: bookings.length },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, badge: wishlistProperties.length },
              { id: 'wallet', label: 'Escrow Wallet', icon: CreditCard },
              { id: 'profile', label: 'Profile Account', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-[var(--teal-blue)] text-white shadow-lg' 
                      : 'text-teal-100/80 hover:bg-[#1a3535] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[var(--mellow-gold)] text-white' : 'bg-white/10 text-teal-200'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Return to Public Marketplace Button */}
        <div className="hidden md:block pt-4 border-t border-[#1a3535]">
          <button
            onClick={onReturnToPublic}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#1a3535]/60 hover:bg-[#1a3535] text-white text-xs font-bold transition-all border border-teal-900"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--mellow-gold)]" />
              <span>Public Marketplace</span>
            </div>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>

      </aside>

      {/* 🏛️ MAIN CONTENT CONTAINER (BRAND LIGHT BACKGROUND) */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full">
        
        {/* TOPBAR HEADER */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[var(--border-light)] shadow-sm">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" 
              alt="Alexander Wright" 
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--teal-blue)] shadow"
            />
            <div>
              <p className="text-xs text-[var(--text-muted)] font-medium">Good morning 👋</p>
              <h1 className="text-xl font-extrabold text-[#122525]">Alexander Wright</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-light)] text-[#122525] hover:border-[var(--teal-blue)]">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className="p-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-light)] text-[#122525] hover:border-[var(--teal-blue)]"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* VIEW 1: HOME & DISCOVER */}
        {(activeTab === 'home' || activeTab === 'wallet') && (
          <div className="space-y-6 animate-fade-in">
            
            {/* HERO WALLET CARD */}
            <div className="p-6 md:p-8 rounded-[32px] bg-gradient-to-br from-white via-slate-50 to-teal-50/40 border border-[var(--border-medium)] shadow-md space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    GoDirect Escrow Balance
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#122525] tracking-tight mt-1">
                    $8,127.00
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+12.4% this month • 100% Protected Escrow</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[var(--teal-blue)]/10 text-[var(--teal-blue)]">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              {/* ACTION PILLS BAR */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className="p-3 rounded-2xl bg-white border border-[var(--border-medium)] hover:border-[var(--teal-blue)] text-xs font-bold text-[#122525] shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowDownLeft className="w-4 h-4 text-[var(--teal-blue)]" />
                  <span>My Stays</span>
                </button>
                <button 
                  onClick={() => setActiveTab('wishlist')}
                  className="p-3 rounded-2xl bg-white border border-[var(--border-medium)] hover:border-[var(--teal-blue)] text-xs font-bold text-[#122525] shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Wishlist</span>
                </button>
                <button 
                  onClick={onReturnToPublic}
                  className="p-3 rounded-2xl bg-[#122525] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-[var(--mellow-gold)]" />
                  <span>Explore</span>
                </button>
              </div>

            </div>

            {/* CATEGORIES GRID */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-[#122525]">Quick Categories</h3>
                <button onClick={onReturnToPublic} className="text-xs font-bold text-[var(--teal-blue)]">
                  See all
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {[
                  { name: 'Short-Lets', icon: Sparkles, color: 'bg-emerald-500/10 text-emerald-600' },
                  { name: 'Villas', icon: Building2, color: 'bg-amber-500/10 text-amber-600' },
                  { name: 'Penthouses', icon: Home, color: 'bg-blue-500/10 text-blue-600' },
                  { name: 'Saved', icon: Heart, color: 'bg-red-500/10 text-red-500' },
                  { name: 'Escrow', icon: ShieldCheck, color: 'bg-purple-500/10 text-purple-600' }
                ].map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setActiveTab('bookings')}
                      className="p-3 rounded-2xl bg-white border border-[var(--border-light)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--teal-blue)] transition-all shadow-sm"
                    >
                      <div className={`p-3 rounded-full ${cat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#122525]">{cat.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FEATURED ACTIVE BOOKINGS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-[#122525]">Recent Stays & Activity</h3>
                <button onClick={() => setActiveTab('bookings')} className="text-xs font-bold text-[var(--teal-blue)]">
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {bookings.map((b) => (
                  <div 
                    key={b.id} 
                    className="p-4 rounded-[28px] bg-white border border-[var(--border-light)] shadow-sm flex items-center justify-between gap-4 hover:border-[var(--teal-blue)] transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <img src={b.image} alt={b.propertyName} className="w-16 h-16 rounded-2xl object-cover" />
                      <div>
                        <span className="badge-teal text-[9px] px-2 py-0.5">{b.status}</span>
                        <h4 className="font-bold text-sm text-[#122525] mt-1">{b.propertyName}</h4>
                        <p className="text-xs text-[var(--text-muted)]">{b.dates}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold text-base text-[#122525]">+${b.totalPaid}</div>
                      <button onClick={() => onOpenChatWithHost(b)} className="text-xs font-bold text-[var(--teal-blue)] flex items-center gap-1 justify-end mt-1">
                        Chat Owner <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: MY STAYS / BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-extrabold text-[#122525]">My Confirmed Reservations</h2>
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="p-6 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <img src={b.image} alt={b.propertyName} className="w-28 h-24 rounded-2xl object-cover" />
                    <div className="space-y-1">
                      <span className="badge-teal text-[10px]">{b.status} • {b.code}</span>
                      <h3 className="font-bold text-lg text-[#122525]">{b.propertyName}</h3>
                      <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--teal-blue)]" /> {b.location}
                      </p>
                      <div className="text-xs font-semibold text-[var(--text-secondary)]">
                        {b.dates} • {b.nights} Nights
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border-light)]">
                    <div className="text-left md:text-right">
                      <div className="text-xl font-extrabold text-[#122525]">${b.totalPaid.toLocaleString()}</div>
                      <div className="text-xs text-[var(--teal-blue)] font-semibold">Host: {b.hostName}</div>
                    </div>
                    <button 
                      onClick={() => onOpenChatWithHost(b)} 
                      className="btn-primary text-xs px-5 py-2.5"
                    >
                      <MessageSquare className="w-4 h-4" /> Message Owner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SAVED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-extrabold text-[#122525]">Saved Luxury Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProperties.map((prop) => (
                <div key={prop.id} className="bg-white rounded-[28px] p-4 border border-[var(--border-medium)] shadow-sm space-y-3">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-44 rounded-2xl object-cover" />
                  <h3 className="font-bold text-base text-[#122525]">{prop.title}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{prop.location}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-light)]">
                    <div className="text-lg font-extrabold text-[var(--teal-blue)]">${prop.price} /{prop.pricePeriod}</div>
                    <button onClick={() => onSelectProperty(prop)} className="btn-primary text-xs px-4 py-2">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: PROFILE CARD */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
            
            <div className="p-8 rounded-[32px] bg-gradient-to-b from-[var(--mellow-gold)]/20 via-white to-white border border-[var(--border-medium)] text-center space-y-4 shadow-sm">
              <div className="relative w-24 h-24 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" 
                  alt="Alexander Wright" 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#122525]">Alexander Wright</h2>
                <p className="text-xs text-[var(--text-muted)]">alex.wright@example.com</p>
                <div className="mt-2">
                  <span className="badge-gold text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Premium Renter
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Personal Information', icon: User, desc: 'Name, email, phone verification' },
                { title: 'Payment Methods & Escrow', icon: CreditCard, desc: 'Connected cards & wallet security' },
                { title: 'Address Book & Regions', icon: MapPin, desc: 'Preferred stay locations' },
                { title: 'Language & Region', icon: Globe, desc: 'English (US) • USD ($)' },
                { title: 'Security & Privacy', icon: Shield, desc: 'Password & two-factor authentication' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[var(--border-light)] shadow-sm flex items-center justify-between cursor-pointer hover:border-[var(--teal-blue)] transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--teal-blue)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#122525]">{item.title}</div>
                        <div className="text-xs text-[var(--text-muted)]">{item.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
