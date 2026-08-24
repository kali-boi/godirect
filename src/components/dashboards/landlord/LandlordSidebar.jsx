import React, { useState } from 'react';
import { 
  Home, Building2, Clock, DollarSign, Calendar, MessageSquare,
  Bell, User, PlusCircle, Globe, ArrowRight, Menu, X,
  BarChart3, Star, Users, Wrench, FileText, Receipt, Wallet
} from 'lucide-react';

export default function LandlordSidebar({ 
  activeNav, 
  setActiveNav, 
  propertiesCount, 
  pendingRequestsCount, 
  onOpenHostPortal, 
  onReturnToPublic,
  onSelectPortal
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navSections = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ]
    },
    {
      label: 'PROPERTIES',
      items: [
        { id: 'properties', label: 'My Properties', icon: Building2, badge: propertiesCount },
        { id: 'requests', label: 'Booking Requests', icon: Clock, badge: pendingRequestsCount },
        { id: 'calendar', label: 'Calendar & Pricing', icon: Calendar },
        { id: 'maintenance', label: 'Maintenance', icon: Wrench }
      ]
    },
    {
      label: 'GUESTS',
      items: [
        { id: 'guests', label: 'Guest Management', icon: Users },
        { id: 'reviews', label: 'Reviews & Ratings', icon: Star }
      ]
    },
    {
      label: 'FINANCIALS',
      items: [
        { id: 'earnings', label: 'Wallet & Payouts', icon: Wallet },
        { id: 'tax', label: 'Tax & Statements', icon: Receipt }
      ]
    },
    {
      label: 'ACCOUNT',
      items: [
        { id: 'documents', label: 'Document Vault', icon: FileText },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 1 },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'profile', label: 'Profile', icon: User }
      ]
    }
  ];

  const allItems = navSections.flatMap(s => s.items);

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileOpen(false);
  };

  const renderNavList = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Scrollable nav section */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Logo */}
        <div className="flex flex-col gap-1 px-2 pt-1 cursor-pointer" onClick={() => { onReturnToPublic(); setMobileOpen(false); }}>
          <img src="/images/logo.png" alt="GoDirect" className="h-8 w-auto object-contain self-start" />
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-0.5">Host Portal</span>
        </div>

        {/* Sectioned Nav */}
        {navSections.map((section) => (
          <div key={section.label} className="space-y-1">
            <div className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase px-3 pb-1">{section.label}</div>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button key={item.id} onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive ? 'bg-[#0B2545] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}>
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-5 border-t border-slate-100 space-y-2 shrink-0 bg-white">
        <button onClick={() => { onOpenHostPortal && onOpenHostPortal(); setMobileOpen(false); }}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2">
          <PlusCircle className="w-4 h-4" />
          List New Property
        </button>
        <button onClick={() => { onReturnToPublic(); setMobileOpen(false); }}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
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
      <aside className="hidden md:flex w-64 bg-white text-slate-800 flex-col shrink-0 border-r border-slate-200/80 shadow-sm h-screen sticky top-0 z-30">
        {renderNavList()}
      </aside>

      {/* ─── MOBILE: Fixed top bar ─── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onReturnToPublic}>
          <img src="/images/logo.png" alt="GoDirect" className="h-6 w-auto object-contain" />
          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-[#018F8B]">
            Host
          </span>
        </div>
        <span className="text-xs font-extrabold text-slate-700 capitalize max-w-[120px] truncate">
          {allItems.find(i => i.id === activeNav)?.label || 'Dashboard'}
        </span>
        <button onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all"
          aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`md:hidden fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Navigation</span>
          <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {renderNavList()}
        </div>
      </div>
    </>
  );
}
