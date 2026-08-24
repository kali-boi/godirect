import React, { useState } from 'react';
import { 
  Home, Building2, Heart, Search, Calendar, MessageSquare,
  Bell, CreditCard, User, Globe, ArrowRight, X,
  MoreHorizontal, BookOpen, Lock, Star, AlertOctagon, FileText,
  Headphones, ShieldCheck, ChevronUp
} from 'lucide-react';

export default function UserSidebar({ activeNav, setActiveNav, wishlistCount, onReturnToPublic }) {
  const [moreOpen, setMoreOpen] = useState(false);

  // 5 primary items featured on the floating mobile dock
  const bottomBarItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'saved', label: 'Saved', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : undefined },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'appointments', label: 'Tours', icon: Calendar }
  ];

  // All organized sections for desktop & the mobile "More" sheet
  const navSections = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'bookings', label: 'My Bookings', icon: BookOpen }
      ]
    },
    {
      label: 'DISCOVER',
      items: [
        { id: 'properties', label: 'Browse Properties', icon: Building2 },
        { id: 'saved', label: 'Saved Properties', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : undefined },
        { id: 'searches', label: 'Saved Searches', icon: Search },
        { id: 'appointments', label: 'Tours & Viewings', icon: Calendar }
      ]
    },
    {
      label: 'FINANCES',
      items: [
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'escrow', label: 'Escrow Tracker', icon: Lock },
        { id: 'documents', label: 'Documents & Leases', icon: FileText }
      ]
    },
    {
      label: 'MY ACTIVITY',
      items: [
        { id: 'reviews', label: 'My Reviews', icon: Star },
        { id: 'disputes', label: 'Dispute Center', icon: AlertOctagon },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell }
      ]
    },
    {
      label: 'ACCOUNT',
      items: [
        { id: 'verification', label: 'ID Verification', icon: ShieldCheck },
        { id: 'support', label: 'Help & Support', icon: Headphones },
        { id: 'profile', label: 'Profile Settings', icon: User }
      ]
    }
  ];

  const allItems = navSections.flatMap(s => s.items);
  const bottomBarIds = bottomBarItems.map(i => i.id);
  const moreItems = allItems.filter(i => !bottomBarIds.includes(i.id));
  const isMoreActive = moreItems.some(i => i.id === activeNav);

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMoreOpen(false);
  };

  return (
    <>
      {/* ─── DESKTOP SIDEBAR (md+) ─── */}
      <aside className="hidden md:flex w-64 bg-white text-slate-800 flex-col shrink-0 border-r border-slate-200/80 shadow-sm h-screen sticky top-0 z-30 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Logo Header */}
          <div className="flex flex-col gap-1 px-2 pt-1 cursor-pointer" onClick={onReturnToPublic}>
            <img src="/images/logo.png" alt="GoDirect" className="h-8 w-auto object-contain self-start" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-0.5">Guest Portal</span>
          </div>

          {/* Sectioned Navigation */}
          {navSections.map((section) => (
            <div key={section.label} className="space-y-1">
              <div className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase px-3 pb-1">
                {section.label}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#0B2545] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                        }`}>
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

        {/* Back to site bottom button */}
        <div className="p-5 border-t border-slate-100 shrink-0">
          <button
            onClick={onReturnToPublic}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-600" />
              <span>Back to Site</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </aside>

      {/* ─── MOBILE: LUXURY FLOATING ISLAND DOCK ─── */}
      <div className="md:hidden fixed bottom-3 inset-x-3 sm:inset-x-8 z-50 pointer-events-none">
        <nav className="pointer-events-auto bg-[#0B2545]/95 backdrop-blur-2xl border border-white/15 text-white rounded-full shadow-[0_12px_40px_rgba(11,37,69,0.45)] px-2.5 py-2 flex items-center justify-around gap-1">
          
          {bottomBarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveNav(item.id); setMoreOpen(false); }}
                className={`relative flex items-center justify-center transition-all duration-300 ease-out active:scale-90 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#018F8B] to-[#CC9955] text-slate-950 font-black px-3.5 py-2 rounded-full shadow-md shadow-[#018F8B]/40 gap-1.5' 
                    : 'text-slate-300 hover:text-white p-2.5 rounded-full hover:bg-white/10'
                }`}
                title={item.label}
              >
                <div className="relative flex items-center justify-center">
                  <Icon className={`${isActive ? 'w-4 h-4 text-slate-950 stroke-[2.5]' : 'w-5 h-5 stroke-[1.8]'}`} />
                  
                  {/* Notification badge */}
                  {!isActive && item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center ring-2 ring-[#0B2545]">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Expanding label capsule for active state */}
                {isActive && (
                  <span className="text-[11px] tracking-tight whitespace-nowrap animate-fade-in">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          {/* ─── "MORE" DOCK BUTTON ─── */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`relative flex items-center justify-center transition-all duration-300 ease-out active:scale-90 ${
              isMoreActive && !moreOpen
                ? 'bg-gradient-to-r from-[#018F8B] to-[#CC9955] text-slate-950 font-black px-3 py-2 rounded-full shadow-md shadow-[#018F8B]/40 gap-1.5'
                : moreOpen
                ? 'bg-white/20 text-white p-2.5 rounded-full'
                : 'text-slate-300 hover:text-white p-2.5 rounded-full hover:bg-white/10'
            }`}
            title="More Options"
          >
            <div className="relative flex items-center justify-center">
              {moreOpen ? (
                <X className="w-5 h-5 stroke-[2.2] animate-spin-fast" />
              ) : (
                <MoreHorizontal className={`${isMoreActive ? 'w-4 h-4 text-slate-950 stroke-[2.5]' : 'w-5 h-5 stroke-[1.8]'}`} />
              )}
            </div>

            {isMoreActive && !moreOpen && (
              <span className="text-[11px] tracking-tight whitespace-nowrap">
                More
              </span>
            )}
          </button>

        </nav>
      </div>

      {/* ─── MOBILE: "MORE" SLIDE-UP GLASS SHEET ─── */}
      {/* Backdrop */}
      {moreOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* Drawer Container */}
      <div
        className={`md:hidden fixed bottom-20 inset-x-3 sm:inset-x-8 z-50 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200/80 overflow-hidden transform transition-all duration-300 ease-out ${
          moreOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 pointer-events-none scale-95'
        }`}
      >
        {/* Header grab handle */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900 tracking-tight">Explore More Hubs</span>
            <span className="text-[10px] font-bold bg-[#018F8B]/10 text-[#018F8B] px-2 py-0.5 rounded-full">
              {moreItems.length} Pages
            </span>
          </div>
          <button
            onClick={() => setMoreOpen(false)}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable category list */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {navSections
            .filter(s => s.items.some(i => !bottomBarIds.includes(i.id)))
            .map((section) => {
              const itemsInSec = section.items.filter(i => !bottomBarIds.includes(i.id));
              if (itemsInSec.length === 0) return null;

              return (
                <div key={section.label} className="space-y-1">
                  <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest px-2">
                    {section.label}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {itemsInSec.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeNav === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-[#0B2545] text-white shadow-sm'
                              : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span>{item.label}</span>
                          </div>

                          {item.badge !== undefined && item.badge > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                              isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {/* Return to public marketplace */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => { onReturnToPublic(); setMoreOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-600" />
                <span>Exit Dashboard & Back to Site</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
