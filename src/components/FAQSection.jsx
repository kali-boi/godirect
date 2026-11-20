import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function FAQSection({ onOpenHostPortal }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What types of properties are listed on GoDirect?',
      a: 'We list serviced short-let apartments, detached homes, penthouses, and long-term residential leases directly from verified landlords and hosts across Lagos, Abuja, and Port Harcourt.',
    },
    {
      q: 'How do bookings work without agency fees?',
      a: 'You communicate and book directly with the property owner on the platform. There are no middleman brokers or standard 10% agency commission markups added to your rent.',
    },
    {
      q: 'How does the 24-hour check-in escrow work?',
      a: 'For short-let bookings, your payment is held in escrow until 24 hours after check-in. If the property does not match the listing when you arrive, you can raise a dispute before funds are released to the host.',
    },
    {
      q: 'Can I message the landlord and inspect before paying for an annual lease?',
      a: 'Yes. Every listing lets you message the landlord directly to discuss lease terms and schedule an in-person inspection before committing.',
    },
    {
      q: 'How do I list my property as a landlord or host?',
      a: 'Click "List property" in the navigation bar to open the Host Portal, submit your property details and ownership verification documents, and publish once approved.',
    },
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] border-t border-neutral-200/80">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#122525] tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-sm text-neutral-600">
                Common questions about direct leases, short-let escrow, and listing on GoDirect.
              </p>
            </div>

            <div className="divide-y divide-neutral-200 border-y border-neutral-200 bg-white rounded-2xl px-6">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-[15px] text-[#122525] hover:text-[#018F8B] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#018F8B]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <p className="pt-2.5 text-sm text-neutral-600 leading-relaxed pr-6">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Landlord CTA */}
          <div className="lg:col-span-5 bg-[#122525] text-white p-7 sm:p-8 rounded-2xl space-y-6">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#CC9955]">
                For Landlords & Hosts
              </p>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Own a property in Lagos, Abuja, or Port Harcourt?
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                List directly on GoDirect, connect with verified tenants and short-let guests, and receive payouts straight to your bank account.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={onOpenHostPortal}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#018F8B] hover:bg-[#017774] text-white font-semibold text-sm transition-colors"
              >
                <span>List your property</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-white/55">
                Free to list · Ownership verification required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
