import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, MessageSquare, RefreshCw } from 'lucide-react';
import { getAllDisputes } from '../../../../services/supabaseService';
import { supabase } from '../../../../lib/supabaseClient';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const data = await getAllDisputes();
      setDisputes(data || []);
    } catch (err) {
      console.warn('Error fetching disputes:', err);
      setDisputes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const priorityColors = { High: 'text-rose-600 bg-rose-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-slate-600 bg-slate-100' };
  const statusColors = {
    open: 'bg-rose-50 text-rose-800 border-rose-200',
    under_review: 'bg-amber-50 text-amber-800 border-amber-200',
    resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  const resolveDispute = async (id) => {
    try {
      await supabase.from('disputes').update({ status: 'resolved' }).eq('id', id);
      setDisputes(disputes.map(d => d.id === id ? { ...d, status: 'resolved' } : d));
    } catch (err) {
      console.error('Failed to resolve dispute:', err);
    }
  };

  const escalate = async (id) => {
    try {
      await supabase.from('disputes').update({ status: 'under_review' }).eq('id', id);
      setDisputes(disputes.map(d => d.id === id ? { ...d, status: 'under_review', priority: 'High' } : d));
    } catch (err) {
      console.error('Failed to escalate dispute:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Dispute Resolution Center</h2>
          <p className="text-xs text-slate-500 mt-1">Mediate guest-host disputes, manage escrow release decisions, and log resolutions.</p>
        </div>
        <button 
          onClick={fetchDisputes}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Open Disputes', value: disputes.filter(d => d.status === 'open').length, color: 'text-rose-600', icon: AlertTriangle },
          { label: 'Under Review', value: disputes.filter(d => d.status === 'under_review').length, color: 'text-amber-600', icon: MessageSquare },
          { label: 'Resolved', value: disputes.filter(d => d.status === 'resolved').length, color: 'text-emerald-600', icon: CheckCircle2 }
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
        {disputes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            Zero active disputes. All transactions, check-ins, and escrow holds are running smoothly without flags.
          </div>
        ) : (
          disputes.map((d) => (
            <div key={d.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{d.type || 'Escrow Dispute'}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[d.priority || 'Medium']}`}>
                      {d.priority || 'Standard'} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{d.property || d.bookings?.properties?.title} • Dispute #{d.id?.slice(0, 8)}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${statusColors[d.status] || statusColors.open}`}>
                  {d.status?.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase block mb-0.5">Raised By</span>
                  <span className="font-bold text-slate-900">{d.raisedBy || d.raised_by || 'Guest'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase block mb-0.5">Against</span>
                  <span className="font-bold text-slate-900">{d.against || 'Host'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                "{d.description || d.reason || 'No description provided.'}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-black text-slate-900">Escrow at Risk: ₦{Number(d.amount || 0).toLocaleString()}</span>
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
          ))
        )}
      </div>

    </div>
  );
}
