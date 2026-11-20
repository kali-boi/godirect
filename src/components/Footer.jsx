import React, { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';

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

  return (
    <footer className="bg-[#122525] text-white pt-14 pb-10 border-t border-white/10">
      <div className="container space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex bg-white px-2.5 py-1.5 rounded-lg">
              <img
                src="/images/logo.png"
                alt="GoDirect"
                className="h-6 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Direct short-lets and annual leases across Nigeria. Verified property owners, transparent Naira pricing, and 24-hour check-in escrow.
            </p>

            <div className="text-xs text-white/55">
              Currency: NGN (₦) · Lagos, Abuja &amp; Port Harcourt
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  All properties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveView('short-lets')}
                  className="hover:text-white transition-colors"
                >
                  Short-lets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveView('rentals')}
                  className="hover:text-white transition-colors"
                >
                  Annual rentals
                </button>
              </li>
            </ul>
          </div>

          {/* Hosts Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Landlords &amp; Hosts
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={onOpenHostPortal}
                  className="hover:text-white transition-colors"
                >
                  Host portal
                </button>
              </li>
              <li>
                <a href="#properties-grid" className="hover:text-white transition-colors">
                  Verification process
                </a>
              </li>
              <li>
                <a href="#properties-grid" className="hover:text-white transition-colors">
                  Escrow payouts
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenHostPortal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#018F8B] hover:bg-[#017774] text-white text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>List a property</span>
              </button>
            </div>
          </div>

          {/* Alerts / Updates */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              New Listing Alerts
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Get a weekly digest of newly verified apartments and homes in Lagos and Abuja.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10 text-xs text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#018F8B] shrink-0" />
                <span>Subscribed for weekly alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/45 text-xs outline-none focus:border-[#018F8B]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-white text-[#122525] hover:bg-neutral-100 text-xs font-semibold transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/55">
          <div>
            © {new Date().getFullYear()} GoDirect Technologies Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span>RC 7291840</span>
            <span>·</span>
            <span>Lagos &amp; Abuja, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
