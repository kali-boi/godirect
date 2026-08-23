import React, { useState } from 'react';
import { CheckCircle2, Clock, XCircle, DollarSign, Download } from 'lucide-react';

export default function AdminTransactionsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const transactions = [
    { id: 'TXN-7291', type: 'Escrow Deposit', user: 'Alexander Wright', property: 'The Skyview Horizon Penthouse', amount: 3570, currency: 'USD', status: 'completed', date: '23 Aug 2026, 09:14' },
    { id: 'TXN-7290', type: 'Escrow Payout', user: 'Eleanor Vance', property: 'The Azure Waterfront Villa', amount: 8820, currency: 'USD', status: 'completed', date: '22 Aug 2026, 16:45' },
    { id: 'TXN-7289', type: 'Escrow Deposit', user: 'Dr. Julian Thorne', property: 'The Skyview Horizon Penthouse', amount: 3570, currency: 'USD', status: 'held', date: '23 Aug 2026, 08:30' },
    { id: 'TXN-7288', type: 'Refund', user: 'Amara Al-Zahra', property: 'Eiffel View Executive Suite', amount: 2100, currency: 'USD', status: 'refunded', date: '21 Aug 2026, 11:20' },
    { id: 'TXN-7287', type: 'Escrow Payout', user: 'Chief Adebayo Okonjo', property: 'Ikoyi Crest Waterfront Estate', amount: 12400, currency: 'USD', status: 'completed', date: '20 Aug 2026, 14:00' }
  ];

  const statusColors = {
    completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    held: 'bg-amber-50 text-amber-800 border-amber-200',
    refunded: 'bg-rose-50 text-rose-800 border-rose-200',
    pending: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const statusIcons = {
    completed: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    held: <Clock className="w-3.5 h-3.5 text-amber-600" />,
    refunded: <XCircle className="w-3.5 h-3.5 text-rose-500" />
  };

  const filtered = filterStatus === 'all' ? transactions : transactions.filter(t => t.status === filterStatus);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Financial Ledger & Transactions</h2>
          <p className="text-xs text-slate-500 mt-1">Full audit trail of all platform escrow deposits, payouts, and refunds.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700">
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Processed', value: '$148,500', icon: DollarSign, color: 'text-slate-900' },
          { label: 'Currently Held', value: '$3,570', icon: Clock, color: 'text-amber-600' },
          { label: 'Total Payouts', value: '$140,610', icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Total Refunded', value: '$4,320', icon: XCircle, color: 'text-rose-500' }
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
        {['all', 'completed', 'held', 'refunded'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filterStatus === f ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All Transactions' : f}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-2">Txn ID</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Property</div>
          <div className="col-span-2">User</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-2">Status</div>
        </div>

        <div className="divide-y divide-slate-50">
          {filtered.map((txn) => (
            <div key={txn.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-2 text-xs font-mono font-bold text-slate-500">{txn.id}</div>
              <div className="col-span-2 text-xs font-medium text-slate-700">{txn.type}</div>
              <div className="col-span-3 text-xs text-slate-600 truncate">{txn.property}</div>
              <div className="col-span-2 text-xs font-bold text-slate-900 truncate">{txn.user}</div>
              <div className="col-span-1 text-xs font-black text-slate-900">${txn.amount.toLocaleString()}</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold capitalize ${statusColors[txn.status]}`}>
                  {statusIcons[txn.status]}
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
