import React from 'react';
import { Search, Bell, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function UserHeader({ 
  searchQuery, 
  setSearchQuery, 
  setActiveNav, 
  onReturnToPublic,
  onSelectPortal
}) {
  const { user, profile, role, signOut } = useAuth();
  
  const fullName = user?.user_metadata?.full_name || profile?.full_name || user?.email?.split('@')[0] || 'Member';
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'US';

  const handleSignOut = async () => {
    await signOut();
    if (onReturnToPublic) onReturnToPublic();
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 font-['Host_Grotesk']">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search properties, clients, or transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-400 transition-all outline-none"
          />
        </div>
      </div>

      {/* Right: Notification Bell & Profile Controls */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveNav('notifications')}
          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
            0
          </span>
        </button>

        {/* Quick Portal Switcher for Admins / Multi-role */}
        {(role === 'admin' || user?.role === 'admin') && onSelectPortal && (
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => onSelectPortal('admin')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black shadow-xs transition-all"
              title="Return to Super Admin Dashboard"
            >
              <span>Admin Dashboard</span>
            </button>
            <button 
              onClick={() => onSelectPortal('landlord')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-800 hover:bg-slate-50 text-[11px] font-black border border-slate-200/60 shadow-xs transition-all"
              title="Inspect Landlord / Host Dashboard"
            >
              <span>Host Portal</span>
            </button>
          </div>
        )}

        <button 
          onClick={onReturnToPublic}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>Back to Site</span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <span className="text-xs font-extrabold text-slate-900 block leading-tight truncate max-w-[120px]">{fullName}</span>
            <span className="text-[10px] text-slate-400 font-medium">Guest / Renter</span>
          </div>
          {user?.avatar_url ? (
            <img src={user.avatar_url} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#018F8B]/10 text-[#018F8B] border border-[#018F8B]/30 flex items-center justify-center font-bold text-xs">
              {initials}
            </div>
          )}
          <button 
            onClick={handleSignOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
