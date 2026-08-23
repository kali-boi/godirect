import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState([
    {
      id: 'dsp-301',
      type: 'Escrow Release Dispute',
      raisedBy: 'Alexander Wright (Renter)',
      against: 'Eleanor Vance (Host)',
      property: 'The Skyview Horizon Penthouse',
      amount: 3570,
      description: 'Guest claims property was not as described — pool was under maintenance during stay.',
      raisedDate: '23 Aug 2026',
      status: 'open',
      priority: 'High'
    },
    {
      id: 'dsp-302',
      type: 'Misrepresentation Claim',
      raisedBy: 'Amara Al-Zahra (Renter)',
      against: 'Lord George Sterling (Host)',
      property: 'Belgravia Terrace Residence',
      amount: 4200,
      description: 'Listing showed 5 bedrooms, property had 3 on arrival.',
      raisedDate: '20 Aug 2026',
      status: 'under_review',
      priority: 'High'
    },
    {
      id: 'dsp-303',
      type: 'Damage Claim',
      raisedBy: 'Eleanor Vance (Host)',
      against: 'Dr. Julian Thorne (Renter)',
      property: 'The Skyview Horizon Penthouse',
      amount: 800,
      description: 'Host claims guest damaged a Bulthaup kitchen island during stay.',
      raisedDate: '18 Aug 2026',
      status: 'resolved',
      priority: 'Low'
    }
  ]);

  const priorityColors = { High: 'text-rose-600 bg-rose-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-slate-600 bg-slate-100' };
  const statusColors = {
    open: 'bg-rose-50 text-rose-800 border-rose-200',
    under_review: 'bg-amber-50 text-amber-800 border-amber-200',
    resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  const resolveDispute = (id) => setDisputes(disputes.map(d => d.id === id ? { ...d, status: 'resolved' } : d));
  const escalate = (id) => setDisputes(disputes.map(d => d.id === id ? { ...d, status: 'under_review', priority: 'High' } : d));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Dispute Resolution Center</h2>
        <p className="text-xs text-slate-500 mt-1">Mediate guest-host disputes, manage escrow release decisions, and log resolutions.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Open Disputes', value: disputes.filter(d => d.status === 'open').length, color: 'text-rose-600', icon: AlertTriangle },
          { label: 'Under Review', value: disputes.filter(d => d.status === 'under_review').length, color: 'text-amber-600', icon: MessageSquare },
          { label: 'Resolved This Month', value: disputes.filter(d => d.status === 'resolved').length, color: 'text-emerald-600', icon: CheckCircle2 }
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

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((d) => (
          <div key={d.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{d.type}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[d.priority]}`}>
                    {d.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-500">{d.property} • Raised {d.raisedDate} • Dispute #{d.id}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${statusColors[d.status]}`}>
                {d.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block mb-0.5">Raised By</span>
                <span className="font-bold text-slate-900">{d.raisedBy}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block mb-0.5">Against</span>
                <span className="font-bold text-slate-900">{d.against}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              "{d.description}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">Escrow at Risk: ${d.amount.toLocaleString()}</span>
              {d.status !== 'resolved' && (
                <div className="flex items-center gap-2">
                  {d.status === 'open' && (
                    <button onClick={() => escalate(d.id)} className="px-3.5 py-1.5 rounded-xl border border-amber-300 text-amber-700 text-xs font-bold">
                      Escalate
                    </button>
                  )}
                  <button onClick={() => resolveDispute(d.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
