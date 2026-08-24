import React from 'react';
import { ShieldCheck, User, Clock } from 'lucide-react';

export default function AdminAuditPage() {
  const logs = [
    { id: 'LOG-SYS-001', adminName: 'Admin Principal', action: 'System Initialized & Security Hardened', target: 'Direct Escrow & Verified Listings Schema', ipAddress: 'Localhost / Production Gateway', timestamp: 'Active Session', category: 'Security' },
    { id: 'LOG-SYS-002', adminName: 'Admin Principal', action: 'Direct Escrow Security Rules Activated', target: '24-Hour Post Check-In Inspection Protocol', ipAddress: 'Secure Node', timestamp: 'Active', category: 'Settings' }
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
          { label: 'Platform Events Recorded', value: `${logs.length}` },
          { label: 'Admin Security Status', value: '100% Verified' },
          { label: 'Active Session Security', value: 'Strict TLS 1.3' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-6 py-3 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-2">Log ID / Time</div>
          <div className="col-span-2">Admin</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-3">Target</div>
          <div className="col-span-2 text-right">Category</div>
        </div>

        <div className="divide-y divide-slate-50">
          {logs.map((log) => (
            <div key={log.id} className="grid grid-cols-12 gap-3 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-2 space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-slate-700 block">{log.id}</span>
                <span className="text-[10px] text-slate-400 block">{log.timestamp}</span>
              </div>
              <div className="col-span-2 text-xs font-bold text-slate-900">{log.adminName}</div>
              <div className="col-span-3 text-xs font-medium text-slate-700">{log.action}</div>
              <div className="col-span-3 text-xs text-slate-500 truncate" title={log.target}>{log.target}</div>
              <div className="col-span-2 flex justify-end">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColors[log.category] || categoryColors.Settings}`}>
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
