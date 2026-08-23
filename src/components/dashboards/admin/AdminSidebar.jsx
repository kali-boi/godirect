import React, { useState } from 'react';
import { 
  Home, ShieldCheck, Building2, Users, Lock, Settings, Globe, ArrowRight, X, Menu,
  BarChart3, DollarSign, MessageSquare, Bell, Flag, Headphones, ClipboardList,
  Shield, RefreshCw, Map, Tag, User
} from 'lucide-react';

export default function AdminSidebar({ activeNav, setActiveNav, pendingVerificationsCount, propertiesCount, onReturnToPublic }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navSections = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 }
      ]
    },
    {
      label: 'PROPERTY CONTROL',
      items: [
        { id: 'verifications', label: 'Deed Verifications', icon: ShieldCheck, badge: pendingVerificationsCount },
        { id: 'listings', label: 'All Listings', icon: Building2, badge: propertiesCount },
        { id: 'content', label: 'Content Moderation', icon: Flag }
      ]
    },
    {
      label: 'USER & COMPLIANCE',
      items: [
        { id: 'users', label: 'User Directory', icon: Users },
        { id: 'kyc', label: 'KYC & Compliance', icon: Shield }
      ]
    },
    {
      label: 'FINANCIALS',
      items: [
        { id: 'transactions', label: 'Transactions', icon: DollarSign },
        { id: 'escrow', label: 'Escrow Vault', icon: Lock },
        { id: 'refunds', label: 'Refund Management', icon: RefreshCw }
      ]
    },
    {
      label: 'OPERATIONS',
      items: [
        { id: 'disputes', label: 'Disputes', icon: MessageSquare },
        { id: 'support', label: 'Support Tickets', icon: Headphones },
        { id: 'notifications', label: 'Announcements', icon: Bell },
        { id: 'audit', label: 'Audit Logs', icon: ClipboardList }
      ]
    },
    {
      label: 'PLATFORM',
      items: [
        { id: 'regions', label: 'Regions & Jurisdictions', icon: Map },
        { id: 'promotions', label: 'Promotions', icon: Tag },
        { id: 'settings', label: 'System Settings', icon: Settings },
        { id: 'profile', label: 'Admin Profile', icon: User }
      ]
    }
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Logo Header */}
        <div className="flex items-center gap-2.5 px-2 pt-1 cursor-pointer" onClick={() => { onReturnToPublic(); setMobileOpen(false); }}>
          <img src="/images/logo.png" alt="GoDirect" className="h-9 w-auto object-contain" />
          <div>
            <h1 className="font-black text-base tracking-tight text-slate-900 leading-none">GODIRECT</h1>
            <span className="text-[11px] text-slate-400 font-medium">Admin Portal</span>
          </div>
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
                    onClick={() => handleNavClick(item.id)}
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

      {/* Bottom Action */}
      <div className="p-5 border-t border-slate-100 shrink-0">
        <button
          onClick={() => { onReturnToPublic(); setMobileOpen(false); }}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200"
        >
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
      {/* ─── DESKTOP SIDEBAR (always visible md+) ─── */}
      <aside className="hidden md:flex w-64 bg-white text-slate-800 flex-col justify-between shrink-0 border-r border-slate-200/80 shadow-sm h-screen sticky top-0 z-30 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* ─── MOBILE: Top bar with hamburger ─── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2" onClick={onReturnToPublic}>
          <img src="/images/logo.png" alt="GoDirect" className="h-7 w-auto object-contain" />
          <div>
            <p className="font-black text-xs text-slate-900 leading-none">GODIRECT</p>
            <p className="text-[9px] text-slate-400">Admin Portal</p>
          </div>
        </div>

        {/* Active page label */}
        <span className="text-xs font-bold text-slate-500 capitalize">
          {navSections.flatMap(s => s.items).find(i => i.id === activeNav)?.label || 'Dashboard'}
        </span>

        {/* Hamburger button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ─── MOBILE: Full-screen slide-in Drawer ─── */}
      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header with close button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Navigation</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <SidebarContent />
      </div>
    </>
  );
}
