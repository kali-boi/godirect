import React from 'react';
import { Lock, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function UserEscrowPage() {
  const escrows = [
    {
      id: 'ESC-7291',
      booking: 'BKG-001',
      property: 'The Skyview Horizon Penthouse',
      host: 'Eleanor Vance',
      amount: 3570,
      currency: 'USD',
      depositedDate: '10 Oct 2026',
      checkIn: 'Oct 12, 2026',
      checkOut: 'Oct 16, 2026',
      inspectionWindow: '24 hours after check-in',
      releaseDate: 'Oct 13, 2026 (3:00 PM)',
      status: 'held',
      timeline: [
        { label: 'Escrow Deposited', done: true, date: '10 Oct 2026' },
        { label: 'Booking Confirmed by Host', done: true, date: '10 Oct 2026' },
        { label: 'Check-in Begins', done: false, date: 'Oct 12, 2026' },
        { label: '24h Inspection Window Starts', done: false, date: 'Oct 12, 2026' },
        { label: 'Funds Released to Host', done: false, date: 'Oct 13, 2026' }
      ]
    },
    {
      id: 'ESC-7110',
      booking: 'BKG-003',
      property: 'Eiffel View Executive Suite',
      host: 'Pierre Dupont',
      amount: 4250,
      currency: 'USD',
      depositedDate: '12 Jul 2026',
      checkIn: 'Jul 14, 2026',
      checkOut: 'Jul 19, 2026',
      inspectionWindow: '24 hours after check-in',
      releaseDate: 'Jul 15, 2026',
      status: 'released',
      timeline: [
        { label: 'Escrow Deposited', done: true, date: '12 Jul 2026' },
        { label: 'Booking Confirmed by Host', done: true, date: '12 Jul 2026' },
        { label: 'Check-in Began', done: true, date: 'Jul 14, 2026' },
        { label: '24h Inspection Window', done: true, date: 'Jul 14–15, 2026' },
        { label: 'Funds Released to Host', done: true, date: 'Jul 15, 2026' }
      ]
    }
  ];

  const statusStyles = {
    held: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: Lock, label: 'In Escrow' },
    released: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle2, label: 'Released' },
    pending: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Clock, label: 'Pending Deposit' }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Escrow Security Tracker</h2>
        <p className="text-xs text-slate-500 mt-1">Track the real-time status of your payments. Funds are always held in isolated escrow — never held by the host until your stay is verified.</p>
      </div>

      {/* How it works */}
      <div className="bg-[#0B2545] text-white rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h3 className="font-extrabold text-sm">How GoDirect Escrow Works</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {[
            { step: '1', title: 'You Deposit', desc: 'Your funds go into an isolated vault — never to the host.' },
            { step: '2', title: '24h Inspection', desc: 'After check-in you have 24 hours to verify the property.' },
            { step: '3', title: 'Funds Released', desc: 'If no dispute is raised, funds release to the host automatically.' }
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">{s.step}</span>
              <div>
                <p className="font-extrabold text-white/90">{s.title}</p>
                <p className="text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escrow Cards */}
      <div className="space-y-5">
        {escrows.map((e) => {
          const style = statusStyles[e.status];
          const StatusIcon = style.icon;
          return (
            <div key={e.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{e.property}</h4>
                    <p className="text-xs text-slate-500">Host: {e.host} • {e.checkIn} → {e.checkOut}</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">{e.id}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${style.bg} ${style.border} ${style.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {style.label}
                    </span>
                    <span className="text-2xl font-black text-slate-900">${e.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2 pt-2">
                  {e.timeline.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {step.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`text-xs font-bold ${step.done ? 'text-slate-700' : 'text-slate-400'}`}>{step.label}</span>
                        <span className="text-[10px] text-slate-400">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Raise dispute (only for held) */}
                {e.status === 'held' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">Inspection window closes: <strong className="text-slate-700">{e.releaseDate}</strong></p>
                    <button className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50">
                      Raise Dispute
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
