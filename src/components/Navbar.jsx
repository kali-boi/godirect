import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Plus,
  Menu,
  X,
  ChevronDown,
  Layers,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({
  activeView,
  setActiveView,
  wishlistCount,
  unreadCount,
  onOpenHostPortal,
  onOpenChat,
  onOpenPortalSwitcher,
  onOpenAuthModal,
  onGoToDashboard
}) {
  const { user, role, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const scrollToGrid = () => {
    setTimeout(() => {
      const el = document.getElementById('properties-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const roleLabel =
    role === 'admin' ? 'Admin' : role === 'landlord' ? 'Host' : 'Member';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="container h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          type="button"
          className="flex items-center shrink-0 hover:opacity-85 transition-opacity"
          onClick={() => {
            setActiveView('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src="/images/logo.png"
            alt="GoDirect"
            className="h-8 w-auto object-contain"
          />
        </button>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveView('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'explore'
                ? 'bg-[#122525]/8 text-[#122525] font-semibold'
                : 'text-neutral-600 hover:text-[#122525] hover:bg-neutral-100/80'
            }`}
          >
            Browse All
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView('short-lets');
              scrollToGrid();
            }}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'short-lets'
                ? 'bg-[#122525]/8 text-[#122525] font-semibold'
                : 'text-neutral-600 hover:text-[#122525] hover:bg-neutral-100/80'
            }`}
          >
            Short-Lets
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView('rentals');
              scrollToGrid();
            }}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'rentals'
                ? 'bg-[#122525]/8 text-[#122525] font-semibold'
                : 'text-neutral-600 hover:text-[#122525] hover:bg-neutral-100/80'
            }`}
          >
            Rentals
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenChat}
            className="relative p-2 rounded-lg text-neutral-600 hover:text-[#122525] hover:bg-neutral-100 transition-colors"
            title="Messages"
            aria-label="Messages"
          >
            <MessageSquare className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#018F8B] rounded-full ring-2 ring-white" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveView('wishlist')}
            className={`relative p-2 rounded-lg transition-colors ${
              activeView === 'wishlist'
                ? 'text-[#122525] bg-neutral-100'
                : 'text-neutral-600 hover:text-[#122525] hover:bg-neutral-100'
            }`}
            title="Saved properties"
            aria-label="Saved properties"
          >
            <Heart className="w-[18px] h-[18px]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#122525] text-white text-[10px] font-semibold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <div className="h-5 w-px bg-neutral-200 mx-1" />

          {/* Account Menu */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-white text-sm font-medium text-[#122525] transition-colors"
                >
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Profile"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#122525] text-white flex items-center justify-center text-[11px] font-semibold">
                      {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="truncate max-w-[90px]">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 p-1.5 space-y-0.5 z-50">
                    <div className="px-3 py-2.5 border-b border-neutral-100">
                      <div className="font-semibold text-sm text-[#122525] truncate">
                        {user.user_metadata?.full_name || 'Member'}
                      </div>
                      <div className="text-xs text-neutral-500 truncate">{user.email}</div>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                        {roleLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onGoToDashboard) onGoToDashboard();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-neutral-500" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onGoToDashboard) onGoToDashboard('profile');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-neutral-500" />
                      <span>Account settings</span>
                    </button>

                    <div className="pt-1 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={async () => {
                          setUserMenuOpen(false);
                          await signOut();
                          setActiveView('public');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:text-[#122525] hover:bg-neutral-100 transition-colors"
              >
                Sign in
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenHostPortal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#122525] hover:bg-[#1c3737] text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>List property</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          {user ? (
            <button
              type="button"
              onClick={() => onGoToDashboard && onGoToDashboard()}
              className="px-3 py-1.5 rounded-lg bg-[#122525] text-white text-xs font-medium"
            >
              Dashboard
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 text-[#122525] text-xs font-medium"
            >
              Sign in
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-6 py-4 space-y-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setActiveView('explore');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Browse All Properties
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView('short-lets');
              setMobileMenuOpen(false);
              scrollToGrid();
            }}
            className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Short-Lets
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView('rentals');
              setMobileMenuOpen(false);
              scrollToGrid();
            }}
            className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Rentals
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView('wishlist');
              setMobileMenuOpen(false);
            }}
            className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Saved ({wishlistCount})
          </button>
          {onOpenPortalSwitcher && (
            <button
              type="button"
              onClick={() => {
                onOpenPortalSwitcher();
                setMobileMenuOpen(false);
              }}
              className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
            >
              Switch Portal
            </button>
          )}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onOpenHostPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#122525] text-white text-sm font-medium"
            >
              List property
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
