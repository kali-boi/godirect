import React from 'react';

export default function StatsBar() {
  const items = [
    {
      value: '0%',
      label: 'Agency commission on direct leases',
    },
    {
      value: '24 hrs',
      label: 'Check-in escrow hold before host payout',
    },
    {
      value: 'Verified',
      label: 'Ownership & ID checked before publishing',
    },
    {
      value: 'Direct',
      label: 'Message landlords and schedule inspections',
    },
  ];

  return (
    <section className="bg-white border-b border-neutral-200/80 py-7">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 md:divide-x md:divide-neutral-200">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="md:px-6 first:md:pl-0 last:md:pr-0 space-y-1"
            >
              <div className="text-xl sm:text-2xl font-bold text-[#122525] tracking-tight">
                {item.value}
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
