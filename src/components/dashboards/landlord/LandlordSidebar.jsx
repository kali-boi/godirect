import React, { useState } from 'react';
import { 
  Home, Building2, Clock, DollarSign, Calendar, MessageSquare,
  Bell, User, PlusCircle, Globe, ArrowRight, Menu, X
} from 'lucide-react';

export default function LandlordSidebar({ activeNav, setActiveNav, propertiesCount, pendingRequestsCount, onOpenHostPortal, onReturnToPublic }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'My Properties', icon: Building2, badge: propertiesCount },
    { id: 'requests', label: 'Booking Requests', icon: Clock, badge: pendingRequestsCount },
    { id: 'earnings', label: 'Earnings & Escrow', icon: DollarSign },
    { id: 'calendar', label: 'Calendar & Pricing', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 1 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-2 pt-1 cursor-pointer" onClick={() => { onReturnToPublic(); setMobileOpen(false); }}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-sm">GD</div>
          <div>
            <h1 className="font-black text-base tracking-tight text-slate-900 leading-none">GODIRECT</h1>
            <span className="text-[11px] text-slate-400 font-medium">Host Portal</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-3 pb-1">NAVIGATION</div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive ? 'bg-[#0B2545] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-5 border-t border-slate-100 space-y-2 shrink-0">
        <button onClick={() => { onOpenHostPortal && onOpenHostPortal(); setMobileOpen(false); }}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all">
          <PlusCircle className="w-4 h-4" />
          <span>List New Property</span>
        </button>
        <button onClick={() => { onReturnToPublic(); setMobileOpen(false); }}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-600" />
            <span>Back to Site</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden md:flex w-64 bg-white text-slate-800 flex-col justify-between shrink-0 border-r border-slate-200/80 shadow-sm h-screen sticky top-0 z-30 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* ─── MOBILE: Fixed top bar ─── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5" onClick={onReturnToPublic}>
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">GD</div>
          <div>
            <p className="font-black text-sm text-slate-900 leading-none">GODIRECT</p>
            <p className="text-[10px] text-slate-400">Host Portal</p>
          </div>
        </div>
        <span className="text-xs font-bold text-slate-500 capitalize">
          {navItems.find(i => i.id === activeNav)?.label || 'Dashboard'}
        </span>
        <button onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ─── MOBILE: Backdrop ─── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* ─── MOBILE: Drawer Panel ─── */}
      <div className={`md:hidden fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Navigation</span>
          <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent />
      </div>
    </>
  );
}
