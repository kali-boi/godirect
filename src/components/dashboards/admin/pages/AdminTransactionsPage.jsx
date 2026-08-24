import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, XCircle, DollarSign, Download, RefreshCw } from 'lucide-react';
import { getAllEscrows } from '../../../../services/supabaseService';

export default function AdminTransactionsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const escrows = await getAllEscrows();
      setTransactions(escrows || []);
    } catch (err) {
      console.warn('Error loading transactions:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalVolume = transactions.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const platformCut = Math.round(totalVolume * 0.05);
  const inEscrow = transactions
    .filter(t => t.status === 'inspection_active' || t.status === 'vaulted' || t.status === 'held')
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const hostPayouts = transactions
    .filter(t => t.status === 'released')
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const totalRefunded = transactions
    .filter(t => t.status === 'refunded')
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const statusColors = {
    completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    released: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    held: 'bg-amber-50 text-amber-800 border-amber-200',
    inspection_active: 'bg-amber-50 text-amber-800 border-amber-200',
    vaulted: 'bg-blue-50 text-blue-800 border-blue-200',
    refunded: 'bg-rose-50 text-rose-800 border-rose-200',
    pending: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const statusIcons = {
    completed: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    released: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    held: <Clock className="w-3.5 h-3.5 text-amber-600" />,
    inspection_active: <Clock className="w-3.5 h-3.5 text-amber-600" />,
    vaulted: <Clock className="w-3.5 h-3.5 text-blue-600" />,
    refunded: <XCircle className="w-3.5 h-3.5 text-rose-500" />
  };

  const filtered = filterStatus === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === filterStatus);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Financial Ledger & Transactions</h2>
          <p className="text-xs text-slate-500 mt-1">Full audit trail of all platform escrow deposits, payouts, and refunds.</p>
        </div>
        <button 
          onClick={fetchTransactions}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Volume', value: `₦${totalVolume.toLocaleString()}`, icon: DollarSign, color: 'text-slate-900' },
          { label: 'Platform Cut (5%)', value: `₦${platformCut.toLocaleString()}`, icon: CheckCircle2, color: 'text-[#018F8B]' },
          { label: 'Currently in Escrow', value: `₦${inEscrow.toLocaleString()}`, icon: Clock, color: 'text-amber-600' },
          { label: 'Host Payouts', value: `₦${hostPayouts.toLocaleString()}`, icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Total Refunded', value: `₦${totalRefunded.toLocaleString()}`, icon: XCircle, color: 'text-rose-500' }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2">
        {['all', 'inspection_active', 'vaulted', 'released', 'refunded'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filterStatus === f ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All Transactions' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3">Txn ID / Code</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Property</div>
          <div className="col-span-2">Guest</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        <div className="divide-y divide-slate-50">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No transactions recorded in database yet. Live transactions will appear here as bookings are placed.
            </div>
          ) : (
            filtered.map((txn) => (
              <div key={txn.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
                <div className="col-span-3 text-xs font-mono font-bold text-slate-700">{txn.id}</div>
                <div className="col-span-2 text-xs font-medium text-slate-700">Direct Escrow</div>
                <div className="col-span-3 text-xs text-slate-600 truncate">{txn.property}</div>
                <div className="col-span-2 text-xs font-bold text-slate-900 truncate">{txn.guest}</div>
                <div className="col-span-1 text-xs font-black text-slate-900">₦{Number(txn.amount || 0).toLocaleString()}</div>
                <div className="col-span-1 flex justify-end">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold capitalize ${statusColors[txn.status] || statusColors.pending}`}>
                    {statusIcons[txn.status]}
                    {txn.status?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
