import React, { useState } from 'react';
import {
  Building2,
  Heart,
  MessageSquare,
  PlusCircle,
  User,
  Moon,
  Sun,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Home,
  LayoutDashboard,
  ShieldAlert,
  ChevronDown,
  Globe
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
    <header className="sticky top-0 z-40 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--border-light)] transition-all">
      <div className="container flex items-center justify-between h-20">

        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveView('public')}>
          <img
            src="/images/logo.png"
            alt="GoDirect Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform hover:scale-105"
          />
          <span className="font-black text-2xl tracking-tight text-[var(--text-primary)] font-['Host_Grotesk']">
            godirect
          </span>
        </div>


        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-elevated)] p-1.5 rounded-full border border-[var(--border-light)]">
          <button
            onClick={() => setActiveView('public')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeView === 'public' || activeView === 'explore'
                ? 'bg-[var(--deep-teal)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveView('short-lets')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeView === 'short-lets'
                ? 'bg-[var(--deep-teal)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
          >
            Short-Lets
          </button>
          <button
            onClick={() => setActiveView('rentals')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeView === 'rentals'
                ? 'bg-[var(--deep-teal)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
          >
            Long-term Rent
          </button>
        </nav>

        {/* Right Portal Switcher & Action Controls */}
        <div className="hidden md:flex items-center gap-3">

          {/* Persona Portal Switcher Button */}
          <button
            onClick={onOpenPortalSwitcher}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-medium)] hover:border-[var(--teal-blue)] text-xs font-bold text-[var(--text-primary)] transition-all shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[var(--teal-blue)]" />
            <span>Portals & Dashboards</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setActiveView('wishlist')}
            className="relative p-2.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--teal-blue)] hover:bg-[var(--bg-surface)] border border-[var(--border-light)] transition-all"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--teal-blue)] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Messages Button */}
          <button
            onClick={onOpenChat}
            className="relative p-2.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--teal-blue)] hover:bg-[var(--bg-surface)] border border-[var(--border-light)] transition-all"
            title="Direct Chat Messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--mellow-gold)] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-light)] transition-all"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-[var(--mellow-gold)]" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Landlord Host Portal Trigger Button */}
          <button
            onClick={onOpenHostPortal}
            className="btn-gold text-xs shadow-md transition-transform active:scale-95 py-2.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Property</span>
          </button>

        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenPortalSwitcher}
            className="px-3 py-1.5 rounded-lg bg-[var(--teal-blue)] text-white text-xs font-bold"
          >
            Dashboards
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-surface)] border-b border-[var(--border-light)] px-6 py-4 flex flex-col gap-3 animate-fade-in">
          <button
            onClick={() => { setActiveView('public'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 p-3 rounded-xl text-left font-medium text-[var(--text-primary)] bg-[var(--bg-elevated)]"
          >
            <Globe className="w-5 h-5 text-[var(--teal-blue)]" /> Public Marketplace Page
          </button>

          <button
            onClick={() => { onOpenPortalSwitcher(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 p-3 rounded-xl text-left font-medium bg-[var(--deep-teal)] text-white"
          >
            <ShieldCheck className="w-5 h-5 text-[var(--mellow-gold)]" /> Switch Persona Dashboard
          </button>

          <button
            onClick={() => { onOpenHostPortal(); setMobileMenuOpen(false); }}
            className="btn-gold w-full mt-2 py-3 justify-center text-center font-bold"
          >
            <PlusCircle className="w-5 h-5" /> Post Property as Landlord
          </button>
        </div>
      )}
    </header>
  );
}

