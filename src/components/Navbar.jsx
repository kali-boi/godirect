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
  Sparkles
} from 'lucide-react';

export default function Navbar({
  activeView,
  setActiveView,
  wishlistCount,
  unreadCount,
  onOpenHostPortal,
  onOpenChat,
  isDarkMode,
  setIsDarkMode,
  onOpenPortalSwitcher
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          
          {/* Dashboard Hubs Switcher */}
          <button
            onClick={onOpenPortalSwitcher}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-all border border-slate-200/60"
          >
            <Layers className="w-3.5 h-3.5 text-[#018F8B]" />
            <span>Dashboards</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

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

          {/* List Property Primary Action */}
          <button
            onClick={onOpenHostPortal}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#0B2545] hover:bg-[#122525] text-white text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 ml-1"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#CC9955]" />
            <span>List Property</span>
          </button>

        </div>

        {/* ─── MOBILE CONTROLS ─── */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenPortalSwitcher}
            className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold"
          >
            Portals
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100"
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
