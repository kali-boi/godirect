import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { getEscrowTransactions } from '../../../../services/supabaseService';

export default function UserEscrowPage() {
  const { user } = useAuth();
  const [escrows, setEscrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getEscrowTransactions(user.id).then((data) => {
        if (data && data.length > 0) {
          setEscrows(data);
        } else {
          setEscrows([]);
        }
        setLoading(false);
      });
    } else {
      setEscrows([]);
      setLoading(false);
    }
  }, [user]);

  const statusStyles = {
    held: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: Lock, label: 'In Escrow Vault' },
    released: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle2, label: 'Settled to Host' },
    pending: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Clock, label: 'Pending Payment' }
  };

  return (
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Escrow Security Tracker</h2>
        <p className="text-xs text-slate-500 mt-1">
          Track the real-time status of your Nigerian payments. Funds are held in GoDirect's isolated escrow vault — never released to the landlord until your 24h stay inspection is complete.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-[#0B2545] text-white rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#CC9955]" />
          <h3 className="font-extrabold text-sm text-white">How GoDirect Escrow Protection Works</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {[
            { step: '1', title: 'Payment Vaulted', desc: 'Your money is deposited into an isolated escrow holding account via Paystack/Flutterwave.' },
            { step: '2', title: '24h Stay Inspection', desc: 'Upon check-in, you have 24 hours to verify the property condition, power, amenities, and security.' },
            { step: '3', title: 'Automated Settlement', desc: 'If no dispute is filed, the 5% platform fee is deducted and the net balance is released to the host.' }
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#CC9955] text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">
                {s.step}
              </span>
              <div>
                <p className="font-extrabold text-white/95">{s.title}</p>
                <p className="text-white/60 leading-relaxed mt-0.5">{s.desc}</p>
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
            <div key={e.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-slate-900">{e.property}</h4>
                      <span className="text-[10px] font-bold bg-[#018F8B]/10 text-[#018F8B] px-2 py-0.5 rounded-full">{e.gateway}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Host: {e.host} • {e.checkIn} → {e.checkOut}</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">{e.id}</p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 self-start sm:self-auto ${style.bg} ${style.border} ${style.text}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {style.label}
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      ₦{e.amount.toLocaleString('en-NG')}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
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
                        <span className={`text-xs font-bold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Raise dispute (only for held) */}
                {e.status === 'held' && (
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      Inspection window closes: <strong className="text-slate-800">{e.releaseDate}</strong>
                    </p>
                    <button className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all self-start sm:self-auto">
                      Raise Dispute / Block Release
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
