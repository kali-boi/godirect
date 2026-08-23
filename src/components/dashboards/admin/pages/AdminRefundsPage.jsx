import React, { useState } from 'react';
import { XCircle, DollarSign, CheckCircle2, Clock } from 'lucide-react';

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState([
    {
      id: 'rfnd-601',
      user: 'Amara Al-Zahra',
      email: 'amara@email.ae',
      property: 'Eiffel View Executive Suite',
      host: 'Pierre Dupont',
      amount: 2100,
      reason: 'Cancelled within 24h free cancellation window.',
      requestedDate: '21 Aug 2026',
      status: 'pending'
    },
    {
      id: 'rfnd-602',
      user: 'Dr. Julian Thorne',
      email: 'julian.thorne@med.co.uk',
      property: 'The Skyview Horizon Penthouse',
      host: 'Eleanor Vance',
      amount: 850,
      reason: 'Partial refund requested — property amenity (rooftop pool) unavailable.',
      requestedDate: '20 Aug 2026',
      status: 'pending'
    },
    {
      id: 'rfnd-603',
      user: 'Yusuf Balogun',
      email: 'yusuf.b@outlook.ng',
      property: 'Ikoyi Crest Waterfront Estate',
      host: 'Chief Adebayo Okonjo',
      amount: 4800,
      reason: 'Booking cancelled by host due to property emergency.',
      requestedDate: '15 Aug 2026',
      status: 'approved'
    }
  ]);

  const statusColors = {
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    rejected: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  const approveRefund = (id) => setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  const rejectRefund = (id) => setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'rejected' } : r));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Refund Management</h2>
        <p className="text-xs text-slate-500 mt-1">Review, approve, and process guest refund requests. All refunds release from Escrow vault.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Refunds', value: refunds.filter(r => r.status === 'pending').length, color: 'text-amber-600', icon: Clock },
          { label: 'Approved This Month', value: refunds.filter(r => r.status === 'approved').length, color: 'text-emerald-600', icon: CheckCircle2 },
          { label: 'Total Refunded Value', value: `$${refunds.filter(r => r.status === 'approved').reduce((acc, r) => acc + r.amount, 0).toLocaleString()}`, color: 'text-slate-900', icon: DollarSign }
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

      {/* Refund Queue */}
      <div className="space-y-4">
        {refunds.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{r.user}</h4>
                  <span className="font-mono text-[10px] text-slate-400">#{r.id}</span>
                </div>
                <p className="text-xs text-slate-500">{r.email} • Property: {r.property} • Host: {r.host}</p>
                <p className="text-xs text-slate-400">Requested: {r.requestedDate}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[r.status]}`}>
                  {r.status}
                </span>
                <span className="font-black text-lg text-slate-900">${r.amount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              Reason: {r.reason}
            </p>

            {r.status === 'pending' && (
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => rejectRefund(r.id)} className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50">
                  Reject Refund
                </button>
                <button onClick={() => approveRefund(r.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                  Approve & Release Escrow
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
