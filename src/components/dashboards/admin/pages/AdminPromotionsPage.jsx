import React, { useState } from 'react';
import { Tag, Star, Megaphone } from 'lucide-react';

export default function AdminPromotionsPage() {
  const [promos] = useState([
    { id: 'promo-001', type: 'Featured Listing', title: 'The Skyview Horizon Penthouse', host: 'Eleanor Vance', startDate: '01 Sep 2026', endDate: '30 Sep 2026', placement: 'Homepage Hero', impressions: 4280, status: 'scheduled' },
    { id: 'promo-002', type: 'Discount Code', title: 'SUMMER10 — 10% off all short-lets', host: 'Platform-wide', startDate: '15 Aug 2026', endDate: '31 Aug 2026', placement: 'Global Checkout', impressions: 820, status: 'active' },
    { id: 'promo-003', type: 'Sponsored Listing', title: 'Ikoyi Crest Waterfront Estate', host: 'Chief Adebayo Okonjo', startDate: '01 Aug 2026', endDate: '20 Aug 2026', placement: 'Search Results Top', impressions: 3100, status: 'expired' }
  ]);

  const statusColors = {
    active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    scheduled: 'bg-blue-50 text-blue-800 border-blue-200',
    expired: 'bg-slate-100 text-slate-600 border-slate-200',
    paused: 'bg-amber-50 text-amber-800 border-amber-200'
  };

  const typeColors = {
    'Featured Listing': 'bg-amber-50 text-amber-800',
    'Discount Code': 'bg-blue-50 text-blue-800',
    'Sponsored Listing': 'bg-purple-50 text-purple-800'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Promotions & Featured Listings</h2>
          <p className="text-xs text-slate-500 mt-1">Manage homepage features, discount codes, and sponsored listing placements.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-black">
          <Tag className="w-4 h-4" />
          Create Promotion
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Promotions', value: promos.filter(p => p.status === 'active').length, color: 'text-emerald-600' },
          { label: 'Scheduled', value: promos.filter(p => p.status === 'scheduled').length, color: 'text-blue-600' },
          { label: 'Total Impressions', value: promos.reduce((acc, p) => acc + p.impressions, 0).toLocaleString(), color: 'text-slate-900' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Promo Cards */}
      <div className="space-y-4">
        {promos.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[p.type]}`}>
                    {p.type}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">#{p.id}</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500">Host: {p.host} • Placement: {p.placement}</p>
                <p className="text-xs text-slate-400">{p.startDate} → {p.endDate}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[p.status]}`}>
                  {p.status}
                </span>
                <span className="text-xs font-bold text-slate-900">{p.impressions.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
