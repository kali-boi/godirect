import React from 'react';
import { 
  Home, 
  Building2, 
  Clock, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Bell, 
  User, 
  PlusCircle, 
  Globe, 
  ArrowRight 
} from 'lucide-react';

export default function LandlordSidebar({ activeNav, setActiveNav, propertiesCount, pendingRequestsCount, onOpenHostPortal, onReturnToPublic }) {
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

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-white text-slate-800 p-5 flex-col justify-between shrink-0 border-r border-slate-200/80 shadow-sm h-screen sticky top-0 z-30">
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-2 pt-1 cursor-pointer" onClick={onReturnToPublic}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-sm">
              GD
            </div>
            <div>
              <h1 className="font-black text-base tracking-tight text-slate-900 leading-none">
                GODIRECT
              </h1>
              <span className="text-[11px] text-slate-400 font-medium">Host Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-3 pb-1">
              NAVIGATION
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#0B2545] text-white shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
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
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <button
            onClick={onOpenHostPortal}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Property</span>
          </button>
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#0B2545] font-extrabold' : 'text-slate-400 font-semibold'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0B2545]' : 'text-slate-400'}`} />
              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
