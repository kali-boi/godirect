import React, { useState } from 'react';
import { Eye, Flag, CheckCircle2, XCircle, Building2, ShieldCheck } from 'lucide-react';

export default function AdminContentPage() {
  const [items, setItems] = useState([]);

  const statusColors = {
    pending_review: 'bg-amber-50 text-amber-800 border-amber-200',
    cleared: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    removed: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  const clearItem = (id) => setItems(items.map(i => i.id === id ? { ...i, status: 'cleared' } : i));
  const removeItem = (id) => setItems(items.map(i => i.id === id ? { ...i, status: 'removed' } : i));

  return (
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Content Moderation & Image Audit</h2>
        <p className="text-xs text-slate-500 mt-1">Review flagged listings, reported property media, and fraud prevention alerts.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Moderation', value: items.filter(i => i.status === 'pending_review').length, color: 'text-amber-600' },
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
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No Flagged Listings in Queue</p>
            <p>All active marketplace listings comply with title deed verification and authentic photo standards.</p>
          </div>
        ) : (
          items.map((item) => (
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
          ))
        )}
      </div>

    </div>
  );
}
