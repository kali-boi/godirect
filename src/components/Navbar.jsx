import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  PlusCircle,
  Menu,
  X,
  ChevronDown,
  Globe,
  Layers,
  Building2,
  Sparkles,
  User,
  LogIn
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({
  activeView,
  setActiveView,
  wishlistCount,
  unreadCount,
  onOpenHostPortal,
  onOpenChat,
  isDarkMode,
  setIsDarkMode,
  onOpenPortalSwitcher,
  onOpenAuthModal,
  onGoToDashboard
}) {
  const { user, role, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-3 sm:inset-x-6 md:inset-x-8 max-w-7xl mx-auto z-50 transition-all">
      {/* ─── PURE SOLID WHITE FLOATING PILL CONTAINER ─── */}
      <div className="bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">

        {/* ─── BRAND LOGO ONLY ─── */}
        <div 
          className="flex items-center cursor-pointer transition-transform duration-200 hover:opacity-90" 
          onClick={() => setActiveView('public')}
        >
          <img
            src="/images/logo.png"
            alt="GoDirect"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>

        {/* ─── CLEAN CENTER CAPSULE NAVIGATION ─── */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200/60">
          <button
            onClick={() => {
              setActiveView('public');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              activeView === 'public' || activeView === 'explore'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => {
              setActiveView('short-lets');
              setTimeout(() => {
                const el = document.getElementById('properties-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              activeView === 'short-lets'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Short-Lets
          </button>
          <button
            onClick={() => {
              setActiveView('rentals');
              setTimeout(() => {
                const el = document.getElementById('properties-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              activeView === 'rentals'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Rent & Buy
          </button>
        </nav>

        {/* ─── STREAMLINED RIGHT ACTIONS ─── */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* Direct Chat / Messages */}
          <button
            onClick={onOpenChat}
            className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#CC9955] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setActiveView('wishlist')}
            className="relative p-2 rounded-full text-slate-600 hover:text-rose-500 hover:bg-slate-100 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Auth & Account Trigger / Dropdown */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-all border border-slate-200/80"
                  title="My Account"
                >
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="Profile" className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#018F8B] text-white flex items-center justify-center text-[10px] font-black">
                      {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="truncate max-w-[85px]">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 space-y-1 animate-fade-in z-50">
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                      <div className="font-extrabold text-xs text-slate-900 truncate">
                        {user.user_metadata?.full_name || 'Member'}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate font-mono">{user.email}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        role === 'admin'
                          ? 'bg-slate-900 text-white'
                          : role === 'landlord'
                          ? 'bg-teal-100 text-[#018F8B]'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {role === 'admin' ? '👑 Super Admin' : role === 'landlord' ? '🏢 Verified Host' : '🏡 Guest / Renter'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onGoToDashboard) onGoToDashboard();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-[#018F8B]" />
                      <span>Go to My Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onGoToDashboard) onGoToDashboard('profile');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Account & Settings</span>
                    </button>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={async () => {
                          setUserMenuOpen(false);
                          await signOut();
                          setActiveView('public');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogIn className="w-4 h-4 rotate-180" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-all border border-slate-200/60"
                title="Sign In or Register"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* List Property Primary Action */}
          <button
            onClick={onOpenHostPortal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#018F8B] to-[#0B2545] hover:opacity-95 text-white text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 ml-1"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#CC9955]" />
            <span>List Property</span>
          </button>

        </div>

        {/* ─── MOBILE CONTROLS ─── */}
        <div className="flex md:hidden items-center gap-1.5">
          {user ? (
            <button
              onClick={() => onGoToDashboard && onGoToDashboard()}
              className="px-3 py-1.5 rounded-full bg-[#018F8B] text-white text-xs font-bold"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
              className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ─── MOBILE SLIDE-DOWN SHEET ─── */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-fade-in">
          <button
            onClick={() => { 
              setActiveView('public'); 
              setMobileMenuOpen(false); 
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 p-2.5 rounded-2xl text-left font-bold text-xs text-slate-800 hover:bg-slate-50"
          >
            <Globe className="w-4 h-4 text-[#018F8B]" />
            <span>Explore All</span>
          </button>
          <button
            onClick={() => { 
              setActiveView('short-lets'); 
              setMobileMenuOpen(false); 
              setTimeout(() => {
                const el = document.getElementById('properties-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="flex items-center gap-3 p-2.5 rounded-2xl text-left font-bold text-xs text-slate-800 hover:bg-slate-50"
          >
            <Building2 className="w-4 h-4 text-[#018F8B]" />
            <span>Short-Lets</span>
          </button>
          <button
            onClick={() => { 
              setActiveView('rentals'); 
              setMobileMenuOpen(false); 
              setTimeout(() => {
                const el = document.getElementById('properties-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="flex items-center gap-3 p-2.5 rounded-2xl text-left font-bold text-xs text-slate-800 hover:bg-slate-50"
          >
            <Sparkles className="w-4 h-4 text-[#018F8B]" />
            <span>Rent & Buy</span>
          </button>
          <button
            onClick={() => { onOpenPortalSwitcher(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 p-2.5 rounded-2xl text-left font-bold text-xs bg-slate-100 text-slate-800 mt-1"
          >
            <Layers className="w-4 h-4 text-[#018F8B]" />
            <span>Dashboard Hubs</span>
          </button>
          <button
            onClick={() => { onOpenHostPortal(); setMobileMenuOpen(false); }}
            className="w-full py-2.5 rounded-2xl bg-[#0B2545] text-white font-bold text-xs text-center mt-1"
          >
            List Property
          </button>
        </div>
      )}
    </header>
  );
}
