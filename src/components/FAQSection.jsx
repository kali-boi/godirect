import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export default function FAQSection({ onOpenHostPortal }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What kind of properties do you sell and rent on GoDirect?',
      a: 'We list verified luxury penthouses, residential apartments, modern townhouses, and short-let vacation suites directly from owners and verified hosts.',
    },
    {
      q: 'How does booking work without agency commission?',
      a: 'GoDirect connects tenants and guests directly with property owners. There are no middleman brokers or 10-15% commission markups.',
    },
    {
      q: 'Can I message and negotiate directly with the landlord?',
      a: 'Yes! Every property card includes a "Chat Host" feature so you can send direct inquiries, ask about lease terms, or request live viewings.',
    },
    {
      q: 'Are the 4K video walkthroughs verified for actual properties?',
      a: 'All 4K video tours are recorded on site and verified by our inspection team to guarantee accurate layouts before you book.',
    },
    {
      q: 'How can I post my property as a landlord or host?',
      a: 'Click the "Post Property" button in the navigation or dashboard to open the Landlord Portal and list your property in under 3 minutes.',
    },
  ];

  return (
    <section className="py-16 bg-[var(--bg-primary)] border-t border-[var(--border-light)]">
      <div className="container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: FAQ Headline & Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--teal-blue)] text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight">
              Frequently asked questions
            </h2>

            <p className="text-sm text-[var(--text-secondary)]">
              Everything you need to know about booking short-lets, direct leases, and listing properties on GoDirect.
            </p>

            {/* Accordion List */}
            <div className="space-y-3 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-light)] overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--teal-blue)] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[var(--teal-blue)]' : 'text-[var(--text-muted)]'
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-light)]/40 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Info & Landlord Host CTA Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl min-h-[360px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold leading-tight">
                Are you a landlord or property host?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                List your property for free, connect with verified renters and short-let guests, and manage bookings effortlessly with zero agent commissions.
              </p>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={onOpenHostPortal}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg text-center"
              >
                Post Property as Landlord
              </button>
              <p className="text-center text-[11px] text-gray-400">
                Instant approval • 100% Owner Verified
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
