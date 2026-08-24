import React, { useState } from 'react';
import { Users, Star, MessageSquare, ShieldCheck } from 'lucide-react';

export default function LandlordGuestsPage() {
  const [filter, setFilter] = useState('all');
  const [guests, setGuests] = useState([]);

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
          { label: 'Total Guests Hosted', value: guests.length, icon: Users, color: 'text-slate-900' },
          { label: 'Repeat Guests', value: guests.filter(g => g.staysCount > 1).length, icon: ShieldCheck, color: 'text-emerald-600' },
          { label: 'Avg Guest Trust Score', value: guests.length > 0 ? '100%' : 'N/A', icon: Star, color: 'text-amber-500' }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Guests List */}
      <div className="space-y-4">
        {guests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No guest history recorded yet. Verified guests who reserve your listings will appear here.
          </div>
        ) : (
          guests.map((g) => (
            <div key={g.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={g.avatar} alt={g.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{g.name}</h4>
                    {g.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{g.country} • {g.staysCount} stays • Last Stay: {g.lastStay}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <span className="text-sm font-black text-slate-900 block">{g.totalSpent}</span>
                  <span className="text-[10px] text-slate-400">Lifetime Paid</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${trustColors[g.trustScore] || 'text-slate-600 bg-slate-100'}`}>
                  {g.trustScore} Trust
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
