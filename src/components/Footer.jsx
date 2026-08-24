import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowUpRight,
  Mail,
  CheckCircle2,
  Lock,
  Zap,
  MapPin,
  Globe,
  Award,
  PlusCircle
} from 'lucide-react';

export default function Footer({ setActiveView, onOpenHostPortal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const primeHubsData = [
    {
      region: 'Lagos Luxury Corridor',
      neighborhoods: 'Ikoyi, Victoria Island, Banana Island, Lekki Phase 1, Eko Atlantic City',
      focus: 'Waterfront Penthouses, Daily Short-Lets & Direct Landlord Leases',
      escrow: '24h Stay Escrow • 100% Deed Verified'
    },
    {
      region: 'Abuja Diplomatic Capital',
      neighborhoods: 'Maitama, Guzape Hills, Wuse 2, Asokoro, Jabi Lake',
      focus: 'Diplomatic Mansions, Executive Duplexes & Serviced Suites',
      escrow: '24h Stay Escrow • 0% Broker Fee'
    },
    {
      region: 'Rivers Energy Corridor',
      neighborhoods: 'Old GRA, Peter Odili Road, Trans-Amadi, Port Harcourt',
      focus: 'Executive Corporate Residences & Short-Stay Suites',
      escrow: 'Direct Landlord Verified'
    },
    {
      region: 'Diaspora & Global Desk',
      neighborhoods: 'London Mayfair Desk, US / Canada Diaspora Direct Line',
      focus: 'Off-Market High-Yield Investment & Remote Title Deeds',
      escrow: 'Multi-Currency Escrow Vault'
    }
  ];

  return (
    <footer className="bg-[#0B2545] text-white pt-16 pb-12 border-t border-slate-800 font-['Host_Grotesk']">
      <div className="container max-w-7xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        
        {/* ─── NEWSLETTER & BRAND TOP BAR ─── */}
        <div className="bg-gradient-to-r from-[#081B33] to-[#014F4D] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#018F8B]/30 border border-[#018F8B]/50 text-[#CC9955] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GoDirect VIP Private Access</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Get Off-Market Luxury Listings First
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Join high-net-worth renters, diaspora investors, and verified landlords receiving curated off-market penthouses and verified short-lets in Lagos & Abuja.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-[#018F8B]/30 border border-[#018F8B] text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You're subscribed to GoDirect Private Access!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-[#CC9955] focus:bg-white/15"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#CC9955] text-slate-950 text-xs font-black hover:bg-[#e0ad6b] transition-all shadow-md shrink-0"
                >
                  Join Private Access
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ─── 4-COLUMN MAIN DIRECTORY ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-4">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Crisp White Logo Display */}
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <img
                  src="/images/logo.png"
                  alt="GoDirect Logo"
                  className="h-7 w-auto object-contain"
                />
              </div> 
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-md">
              GoDirect is Nigeria's premier direct real estate marketplace. Connecting guests and tenants directly with verified title deed property owners with zero agency commissions and 24-Hour Stay Escrow Protection.
            </p>

            {/* Trust Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#CC9955]">
                <ShieldCheck className="w-4 h-4 text-[#018F8B]" />
                <span>100% Title Deed Verified Listings</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#CC9955]">
                <Lock className="w-4 h-4 text-[#018F8B]" />
                <span>24-Hour Stay Escrow Vault Protection</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#CC9955]">
                <Award className="w-4 h-4 text-[#018F8B]" />
                <span>0% Agency & Middleman Fees</span>
              </div>
            </div>

            {/* Currency Tag */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-slate-200">
                <span>🇳🇬 NGN (Nigerian Naira ₦)</span>
              </span>
            </div>
          </div>

          {/* Col 1: Explore Properties (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-xs text-[#CC9955] uppercase tracking-wider">
              Explore Properties
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors">
                  All Properties Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('short-lets')} className="hover:text-white transition-colors">
                  Verified Short-Lets in Lagos & Abuja
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('rentals')} className="hover:text-white transition-colors">
                  Direct Landlord Annual Leases
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors">
                  Waterfront & Island Penthouses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors">
                  Diplomatic Residences in Abuja
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Landlords & Hosts (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-extrabold text-xs text-[#CC9955] uppercase tracking-wider">
              Landlords & Hosts
            </h4>
            
            {/* Prominent High-Contrast List Property Button */}
            <div>
              <button 
                onClick={onOpenHostPortal} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#CC9955] to-[#e0ad6b] text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ List Property (0% Host Fee)</span>
              </button>
            </div>

            <ul className="space-y-2 text-xs text-slate-300 font-medium pt-1">
              <li>
                <button onClick={onOpenHostPortal} className="hover:text-white transition-colors">
                  Host Management Portal
                </button>
              </li>
              <li>
                <a href="#properties-grid" className="hover:text-white transition-colors">
                  Title Deed Verification Guide
                </a>
              </li>
              <li>
                <a href="#properties-grid" className="hover:text-white transition-colors">
                  Escrow Payout Timeline (24h Post Check-In)
                </a>
              </li>
              <li>
                <a href="#properties-grid" className="hover:text-white transition-colors">
                  Agent In-Person Escorted Inspections
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ─── PRIME NIGERIAN & DIASPORA HUBS DIRECTORY TABLE ─── */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#018F8B]" />
              <h4 className="font-extrabold text-xs sm:text-sm text-[#CC9955] uppercase tracking-wider">
                Prime Nigerian & Diaspora Jurisdictions Directory
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              Live Verified Real Estate & Short-Let Coverage
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-900/60 shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/80 text-slate-300 font-extrabold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Market / Region</th>
                  <th className="py-3 px-4">Key Prime Neighborhoods</th>
                  <th className="py-3 px-4 hidden md:table-cell">Property Focus</th>
                  <th className="py-3 px-4">Verification & Escrow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {primeHubsData.map((hub, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {hub.region}
                    </td>
                    <td className="py-3.5 px-4 text-slate-200">
                      {hub.neighborhoods}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 hidden md:table-cell">
                      {hub.focus}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#018F8B]/20 border border-[#018F8B]/40 text-[#CC9955] text-[10px] font-extrabold">
                        <ShieldCheck className="w-3 h-3 text-[#018F8B]" />
                        <span>{hub.escrow}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── BOTTOM COPYRIGHT & LEGAL BAR ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} GoDirect Technologies Ltd. RC 7291840. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">24-Hour Stay Escrow Guarantee</a>
            <a href="#" className="hover:text-white transition-colors">AML Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
