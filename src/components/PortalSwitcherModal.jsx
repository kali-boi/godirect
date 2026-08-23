import React from 'react';
import { 
  X, 
  User, 
  Building2, 
  ShieldAlert, 
  Globe, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function PortalSwitcherModal({ 
  isOpen, 
  onClose, 
  currentPortal, 
  onSelectPortal 
}) {
  if (!isOpen) return null;

  const portals = [
    {
      id: 'public',
      name: 'Public Marketplace',
      tagline: 'Public guest browsing, hero video search, and instant booking page',
      icon: Globe,
      color: 'bg-[var(--teal-blue)] text-white',
      badge: 'Public View'
    },
    {
      id: 'user',
      name: '1. Guest / User Dashboard',
      tagline: 'Personal portal for renters & guests (active stays, saved wishlist, receipts)',
      icon: User,
      color: 'bg-[var(--deep-teal)] text-white',
      badge: 'Renter Portal'
    },
    {
      id: 'landlord',
      name: '2. Landlord & Short-letter Portal',
      tagline: 'Owner command center (earnings, property listing manager, booking approvals)',
      icon: Building2,
      color: 'bg-[var(--mellow-gold)] text-white',
      badge: 'Host Portal'
    },
    {
      id: 'admin',
      name: '3. Super Admin Dashboard',
      tagline: 'Platform governance (landlord deed verification queue, GMV, security)',
      icon: ShieldAlert,
      color: 'bg-slate-900 text-amber-400',
      badge: 'System Admin'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-medium)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[var(--deep-teal)] text-white border-b border-teal-900">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="GoDirect Logo"
              className="h-9 w-auto object-contain filter brightness-110"
            />
            <div>
              <h3 className="font-bold text-lg text-white">Portal Switcher</h3>
              <p className="text-xs text-teal-200">Switch between persona dashboards and public view</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-teal-900/50 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portals Selector List */}
        <div className="p-6 space-y-3 overflow-y-auto max-h-[75vh]">
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isSelected = currentPortal === portal.id;

            return (
              <button
                key={portal.id}
                onClick={() => {
                  onSelectPortal(portal.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${
                  isSelected 
                    ? 'border-[var(--teal-blue)] bg-[var(--bg-elevated)] ring-2 ring-[var(--teal-blue)]/20 shadow-md' 
                    : 'border-[var(--border-medium)] bg-[var(--bg-surface)] hover:border-[var(--teal-blue)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl shrink-0 ${portal.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[var(--text-primary)]">{portal.name}</h4>
                      <span className="badge-teal text-[10px]">{portal.badge}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{portal.tagline}</p>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-6 h-6 text-[var(--teal-blue)] shrink-0" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
