import React from 'react';
import { Award, Building2, MapPin, Star } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      value: '0%',
      label: 'Zero Broker Commission Fee',
      icon: Award,
    },
    {
      value: '24 Hours',
      label: 'Direct Escrow Protection Window',
      icon: Building2,
    },
    {
      value: '100%',
      label: 'Title Deed Verified Listings',
      icon: MapPin,
    },
    {
      value: 'Free',
      label: 'Agent-Escorted In-Person Tours',
      icon: Star,
    },
  ];

  return (
    <section className="bg-[var(--bg-surface)] border-y border-[var(--border-light)] py-8 shadow-sm">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-[var(--border-light)]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center md:justify-start gap-4 px-2 md:px-6 first:pl-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--teal-blue)] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
