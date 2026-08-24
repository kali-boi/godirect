import React, { useState, useEffect } from 'react';
import { XCircle, DollarSign, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { getAllEscrows } from '../../../../services/supabaseService';
import { supabase } from '../../../../lib/supabaseClient';

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      const data = await getAllEscrows();
      setRefunds((data || []).filter(e => e.status === 'refunded' || e.status === 'refund_requested'));
    } catch (err) {
      console.warn('Error fetching refunds:', err);
      setRefunds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  const statusColors = {
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    refund_requested: 'bg-amber-50 text-amber-800 border-amber-200',
    approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    refunded: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    rejected: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  const approveRefund = async (id) => {
    try {
      await supabase.from('escrows').update({ status: 'refunded' }).eq('id', id);
      setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'refunded' } : r));
    } catch (err) {
      console.error('Failed to approve refund:', err);
    }
  };

  const rejectRefund = async (id) => {
    try {
      await supabase.from('escrows').update({ status: 'vaulted' }).eq('id', id);
      setRefunds(refunds.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to reject refund:', err);
    }
  };

  const totalRefundedValue = refunds
    .filter(r => r.status === 'refunded' || r.status === 'approved')
    .reduce((acc, r) => acc + Number(r.amount || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Refund Management</h2>
          <p className="text-xs text-slate-500 mt-1">Review, approve, and process guest refund requests. All refunds release from Escrow vault.</p>
        </div>
        <button 
          onClick={fetchRefunds}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Refund Requests', value: refunds.filter(r => r.status === 'pending' || r.status === 'refund_requested').length, color: 'text-amber-600', icon: Clock },
          { label: 'Approved & Settled', value: refunds.filter(r => r.status === 'refunded' || r.status === 'approved').length, color: 'text-emerald-600', icon: CheckCircle2 },
          { label: 'Total Refunded Value', value: `₦${totalRefundedValue.toLocaleString()}`, color: 'text-slate-900', icon: DollarSign }
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
        {refunds.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No refund requests in the queue. All escrow disbursements are current.
          </div>
        ) : (
          refunds.map((r) => (
            <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{r.guest || 'Guest'}</h4>
                    <span className="font-mono text-[10px] text-slate-400">#{r.id}</span>
                  </div>
                  <p className="text-xs text-slate-500">Property: {r.property}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize ${statusColors[r.status] || statusColors.pending}`}>
                    {r.status?.replace('_', ' ')}
                  </span>
                  <span className="font-black text-lg text-slate-900">₦{Number(r.amount || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                {(r.status === 'pending' || r.status === 'refund_requested') && (
                  <>
                    <button onClick={() => rejectRefund(r.id)} className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50">
                      Reject
                    </button>
                    <button onClick={() => approveRefund(r.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                      Approve & Refund Escrow
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
