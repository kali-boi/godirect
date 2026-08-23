import React, { useState } from 'react';
import { Eye, Flag, CheckCircle2, XCircle, Building2 } from 'lucide-react';

export default function AdminContentPage() {
  const [items, setItems] = useState([
    {
      id: 'flg-401',
      listingTitle: 'Minimalist Loft in Hackney',
      flaggedReason: 'Misleading images — stock photos used instead of actual property.',
      reportedBy: 'User: james.k@proton.me',
      listingHost: 'Anonymous Host (Unverified)',
      reportedDate: '23 Aug 2026',
      status: 'pending_review',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'flg-402',
      listingTitle: 'Prime Commercial Space — Canary Wharf',
      flaggedReason: 'Listing posted in wrong category — it is commercial but listed as residential.',
      reportedBy: 'User: sarah.m@gmail.com',
      listingHost: 'David Osei (Pending KYC)',
      reportedDate: '22 Aug 2026',
      status: 'pending_review',
      image: 'https://images.unsplash.com/photo-1565953522043-baea26b83b7e?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'flg-403',
      listingTitle: 'Luxury 3-Bed near Burj Khalifa',
      flaggedReason: 'Price listed in USD but property requires AED payment — currency fraud suspected.',
      reportedBy: 'User: yusuf.b@outlook.ae',
      listingHost: 'Hamdan Al-Rashid (Verified)',
      reportedDate: '20 Aug 2026',
      status: 'removed',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80'
    }
  ]);

  const statusColors = {
    pending_review: 'bg-amber-50 text-amber-800 border-amber-200',
    cleared: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    removed: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  const clearItem = (id) => setItems(items.map(i => i.id === id ? { ...i, status: 'cleared' } : i));
  const removeItem = (id) => setItems(items.map(i => i.id === id ? { ...i, status: 'removed' } : i));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Content Moderation</h2>
        <p className="text-xs text-slate-500 mt-1">Review flagged listings, suspicious property images, and fraudulent content reports.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: items.filter(i => i.status === 'pending_review').length, color: 'text-amber-600' },
          { label: 'Cleared Listings', value: items.filter(i => i.status === 'cleared').length, color: 'text-emerald-600' },
          { label: 'Removed Listings', value: items.filter(i => i.status === 'removed').length, color: 'text-rose-500' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Flagged Listings */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex gap-4">
              <img src={item.image} alt={item.listingTitle} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{item.listingTitle}</h4>
                    <p className="text-xs text-slate-500">Host: {item.listingHost} • Reported by: {item.reportedBy}</p>
                    <p className="text-xs text-slate-400">{item.reportedDate} • Report #{item.id}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${statusColors[item.status]}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 leading-relaxed">
                  <Flag className="w-3 h-3 inline mr-1" />
                  {item.flaggedReason}
                </div>

                {item.status === 'pending_review' && (
                  <div className="flex items-center gap-2 pt-1">
                    <button onClick={() => clearItem(item.id)} className="px-3.5 py-1.5 rounded-xl border border-emerald-300 text-emerald-700 text-xs font-bold hover:bg-emerald-50">
                      Clear — Listing OK
                    </button>
                    <button onClick={() => removeItem(item.id)} className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">
                      Remove Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
