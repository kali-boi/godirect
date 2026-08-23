import React, { useState } from 'react';
import { Users, Star, MessageSquare, ShieldCheck } from 'lucide-react';

export default function LandlordGuestsPage() {
  const [filter, setFilter] = useState('all');

  const guests = [
    {
      id: 'g-001',
      name: 'Dr. Julian Thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      country: 'United Kingdom',
      staysCount: 2,
      totalSpent: '$7,140',
      avgRating: 5.0,
      lastStay: 'The Skyview Horizon Penthouse • Aug 2026',
      trustScore: 'Excellent',
      verified: true
    },
    {
      id: 'g-002',
      name: 'Amara Al-Zahra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      country: 'United Arab Emirates',
      staysCount: 1,
      totalSpent: '$8,820',
      avgRating: 4.0,
      lastStay: 'The Azure Waterfront Villa • Nov 2026',
      trustScore: 'Good',
      verified: true
    },
    {
      id: 'g-003',
      name: 'Alexander Wright',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
      country: 'United Kingdom',
      staysCount: 3,
      totalSpent: '$10,710',
      avgRating: 5.0,
      lastStay: 'The Skyview Horizon Penthouse • Jul 2026',
      trustScore: 'Excellent',
      verified: true
    }
  ];

  const trustColors = { Excellent: 'text-emerald-600 bg-emerald-50', Good: 'text-blue-600 bg-blue-50', Fair: 'text-amber-600 bg-amber-50' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Guest Management</h2>
        <p className="text-xs text-slate-500 mt-1">Full guest history, trust scores, verified status, and lifetime spend across all your properties.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Unique Guests', value: guests.length, icon: Users, color: 'text-slate-900' },
          { label: 'Repeat Guests', value: guests.filter(g => g.staysCount > 1).length, icon: ShieldCheck, color: 'text-emerald-600' },
          { label: 'Avg Trust Score', value: 'Excellent', icon: Star, color: 'text-amber-500' }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Guest Cards */}
      <div className="space-y-4">
        {guests.map((g) => (
          <div key={g.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <img src={g.avatar} alt={g.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{g.name}</h4>
                  {g.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trustColors[g.trustScore]}`}>
                    {g.trustScore} Trust
                  </span>
                </div>
                <p className="text-xs text-slate-500">{g.country} • {g.staysCount} stay{g.staysCount !== 1 ? 's' : ''} • Lifetime spend: {g.totalSpent}</p>
                <p className="text-xs text-slate-400">Last Stay: {g.lastStay}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-black text-sm text-slate-900">{g.avgRating}</span>
                </div>
                <span className="text-[10px] text-slate-400">Avg rating given</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
