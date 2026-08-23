import React from 'react';
import { ShieldCheck, User, Clock } from 'lucide-react';

export default function AdminAuditPage() {
  const logs = [
    { id: 'log-001', adminName: 'Super Admin (SA)', action: 'Approved Title Deed', target: 'Ikoyi Crest Waterfront Estate — Chief Adebayo Okonjo', ipAddress: '196.54.22.10 (Lagos)', timestamp: '23 Aug 2026, 09:44', category: 'Verification' },
    { id: 'log-002', adminName: 'Super Admin (SA)', action: 'Released Escrow Payout', target: 'TXN-7290 — $8,820 → Eleanor Vance', ipAddress: '212.54.11.3 (London)', timestamp: '22 Aug 2026, 16:50', category: 'Financial' },
    { id: 'log-003', adminName: 'Super Admin (SA)', action: 'Removed Listing', target: 'Flagged Listing: Luxury 3-Bed near Burj Khalifa (flg-403)', ipAddress: '212.54.11.3 (London)', timestamp: '21 Aug 2026, 14:10', category: 'Content Moderation' },
    { id: 'log-004', adminName: 'Super Admin (SA)', action: 'Flagged KYC for Review', target: 'Chief Adebayo Okonjo — AML Medium Risk', ipAddress: '212.54.11.3 (London)', timestamp: '20 Aug 2026, 11:30', category: 'Compliance' },
    { id: 'log-005', adminName: 'Super Admin (SA)', action: 'Updated System Setting', target: 'Escrow Inspection Window changed to 24h', ipAddress: '212.54.11.3 (London)', timestamp: '18 Aug 2026, 09:00', category: 'Settings' },
    { id: 'log-006', adminName: 'Super Admin (SA)', action: 'User Account Suspended', target: 'Suspicious User: anon@temp.com', ipAddress: '196.54.22.10 (Lagos)', timestamp: '15 Aug 2026, 17:45', category: 'Security' }
  ];

  const categoryColors = {
    Verification: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Financial: 'bg-blue-50 text-blue-800 border-blue-200',
    'Content Moderation': 'bg-amber-50 text-amber-800 border-amber-200',
    Compliance: 'bg-purple-50 text-purple-800 border-purple-200',
    Settings: 'bg-slate-100 text-slate-700 border-slate-200',
    Security: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Platform Audit Logs</h2>
          <p className="text-xs text-slate-500 mt-1">Immutable record of all admin actions performed on the platform.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
          <ShieldCheck className="w-4 h-4" />
          Audit-Grade Immutable Log
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Logged Actions', value: '1,247' },
          { label: 'Actions Today', value: '14' },
          { label: 'Unique Admin Sessions', value: '3' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-2">Log ID</div>
          <div className="col-span-2">Admin</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-3">Target</div>
          <div className="col-span-2">Category</div>
        </div>

        <div className="divide-y divide-slate-50">
          {logs.map((log) => (
            <div key={log.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-start">
              <div className="col-span-2 space-y-0.5">
                <span className="text-[11px] font-mono text-slate-500 block">{log.id}</span>
                <span className="text-[10px] text-slate-400 block">{log.timestamp}</span>
              </div>
              <div className="col-span-2 text-xs font-bold text-slate-900">{log.adminName}</div>
              <div className="col-span-3 text-xs font-medium text-slate-700">{log.action}</div>
              <div className="col-span-3 text-xs text-slate-500 truncate">{log.target}</div>
              <div className="col-span-2">
                <span className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-bold ${categoryColors[log.category]}`}>
                  {log.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
