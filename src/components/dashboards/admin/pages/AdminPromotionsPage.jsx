import React, { useState } from 'react';
import { Tag, Star, Megaphone, Plus } from 'lucide-react';

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState([]);

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
          <Plus className="w-4 h-4" />
          Create Promotion
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Campaigns', value: promos.filter(p => p.status === 'active').length, color: 'text-emerald-600' },
          { label: 'Scheduled', value: promos.filter(p => p.status === 'scheduled').length, color: 'text-blue-600' },
          { label: 'Total Impressions', value: promos.reduce((acc, p) => acc + (p.impressions || 0), 0).toLocaleString(), color: 'text-slate-900' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Promo Cards */}
      <div className="space-y-4">
        {promos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No active promotions or discount campaigns configured.
          </div>
        ) : (
          promos.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[p.type] || 'bg-slate-100'}`}>
                      {p.type}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">{p.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">Placement: {p.placement} • Schedule: {p.startDate} - {p.endDate}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[p.status]}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
