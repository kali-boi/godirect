import React from 'react';
import { ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';

export default function FeatureGrid({ onExploreClick }) {
  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#122525] tracking-tight">
              Built for transparent renting in Nigeria
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Whether you need a serviced apartment for a week in Lagos or an annual lease in Abuja, you deal directly with the property owner.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#018F8B] hover:text-[#017774] transition-colors self-start md:self-auto"
          >
            <span>View available listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Editorial Photo Card */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-neutral-200 min-h-[360px] lg:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 bg-[#122525]">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
              alt="Modern living space in Ikoyi"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122525]/90 via-[#122525]/35 to-transparent" />

            <div className="relative z-10 max-w-lg space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#CC9955]">
                Direct Annual Leases
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Skip the 10% agency fee and inspect with confidence.
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Confirm property ownership up front, chat directly with landlords to agree on terms, and book an escorted viewing before you commit.
              </p>
            </div>
          </div>

          {/* Right Column: Two Focused Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#018F8B]/10 flex items-center justify-center text-[#018F8B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#122525]">
                  24-hour check-in escrow for short-lets
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Your booking payment is held securely until 24 hours after check-in, giving you time to confirm the space matches the listing and walkthrough.
                </p>
              </div>
            </div>

            <div className="bg-[#122525] text-white p-6 sm:p-7 rounded-2xl flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#CC9955]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Short-lets from ₦65,000 / night
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Verified serviced apartments and detached homes across Ikoyi, Victoria Island, Lekki Phase 1, and Maitama with clear Naira pricing.
                </p>
              </div>

              <div className="pt-5">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#018F8B] hover:bg-[#017774] text-white font-semibold text-xs transition-colors"
                >
                  <span>Browse listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
