import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowUpRight 
} from 'lucide-react';

export default function Footer({ setActiveView, onOpenHostPortal }) {
  return (
    <footer className="bg-[var(--deep-teal)] text-white pt-16 pb-12 border-t border-teal-900 mt-20">
      <div className="container space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="GoDirect Logo"
                className="h-10 w-auto object-contain filter brightness-110"
              />
            </div>

            <p className="text-sm text-teal-100/80 leading-relaxed max-w-md font-normal">
              GoDirect is the premier luxury real estate and short-let marketplace connecting guests, renters, and landlords directly. Zero agency commissions, 100% verified owners, and transparent booking protection.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-900/60 border border-teal-700/50 text-xs text-[var(--mellow-gold)] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Official GoDirect Brand Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[var(--mellow-gold)] uppercase tracking-wider">Explore Platform</h4>
            <ul className="space-y-2 text-xs text-teal-100/80">
              <li>
                <button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors">
                  All Properties Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('short-lets')} className="hover:text-white transition-colors">
                  Luxury Short-Lets & Vacation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('rentals')} className="hover:text-white transition-colors">
                  Long-Term Apartment Leases
                </button>
              </li>
              <li>
                <button onClick={onOpenHostPortal} className="hover:text-[var(--mellow-gold)] transition-colors font-semibold">
                  Landlord & Host Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-[var(--mellow-gold)] uppercase tracking-wider">Top Prime Locations</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Mayfair, London', 'Palm Jumeirah, Dubai', '7th Arr, Paris', 'Tribeca, New York', 'Ikoyi, Lagos'].map((loc, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-teal-900/50 border border-teal-700/40 text-teal-100">
                  {loc}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-teal-900 text-xs text-teal-200/60">
          <div>
            © {new Date().getFullYear()} GoDirect Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Direct Escrow Guarantee</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
