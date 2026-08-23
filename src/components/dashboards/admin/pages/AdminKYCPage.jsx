import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

export default function AdminKYCPage() {
  const [filter, setFilter] = useState('all');

  const kycSubmissions = [
    {
      id: 'kyc-001',
      name: 'Lord George Sterling',
      role: 'Host',
      nationality: 'British',
      idType: 'Passport + Title Deed',
      jurisdiction: 'United Kingdom',
      submittedDate: '23 Aug 2026',
      riskScore: 'Low',
      amlStatus: 'Clear',
      status: 'pending'
    },
    {
      id: 'kyc-002',
      name: 'Fatima Al-Hassan',
      role: 'Host',
      nationality: 'Emirati',
      idType: 'Emirates ID + Land Cert.',
      jurisdiction: 'United Arab Emirates',
      submittedDate: '22 Aug 2026',
      riskScore: 'Low',
      amlStatus: 'Clear',
      status: 'pending'
    },
    {
      id: 'kyc-003',
      name: 'Eleanor Vance',
      role: 'Host',
      nationality: 'British',
      idType: 'Passport + Land Registry',
      jurisdiction: 'United Kingdom',
      submittedDate: '01 Jan 2022',
      riskScore: 'Low',
      amlStatus: 'Clear',
      status: 'verified'
    },
    {
      id: 'kyc-004',
      name: 'Chief Adebayo Okonjo',
      role: 'Host',
      nationality: 'Nigerian',
      idType: 'NIN + Gov Certificate of Occupancy',
      jurisdiction: 'Nigeria',
      submittedDate: '15 Jun 2024',
      riskScore: 'Medium',
      amlStatus: 'Flagged',
      status: 'flagged'
    }
  ];

  const riskColors = { Low: 'text-emerald-600 bg-emerald-50', Medium: 'text-amber-600 bg-amber-50', High: 'text-rose-600 bg-rose-50' };
  const statusColors = { pending: 'bg-amber-50 text-amber-800 border-amber-200', verified: 'bg-emerald-50 text-emerald-800 border-emerald-200', flagged: 'bg-rose-50 text-rose-800 border-rose-200' };

  const [items, setItems] = useState(kycSubmissions);

  const filtered = filter === 'all' ? items : items.filter(k => k.status === filter);

  const handleApprove = (id) => setItems(items.map(i => i.id === id ? { ...i, status: 'verified' } : i));
  const handleFlag = (id) => setItems(items.map(i => i.id === id ? { ...i, status: 'flagged' } : i));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">KYC & Compliance Center</h2>
        <p className="text-xs text-slate-500 mt-1">Identity verification, AML screening, and regulatory compliance across all jurisdictions.</p>
      </div>

      {/* KYC Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Verified Identities', value: items.filter(i => i.status === 'verified').length, icon: ShieldCheck, color: 'text-emerald-600' },
          { label: 'Pending Review', value: items.filter(i => i.status === 'pending').length, icon: Clock, color: 'text-amber-600' },
          { label: 'AML Flagged', value: items.filter(i => i.amlStatus === 'Flagged').length, icon: AlertTriangle, color: 'text-rose-500' },
          { label: 'Jurisdictions', value: '5', icon: ShieldCheck, color: 'text-slate-700' }
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

      {/* Filter pills */}
      <div className="flex items-center gap-2">
        {['all', 'pending', 'verified', 'flagged'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All Submissions' : f}
          </button>
        ))}
      </div>

      {/* Submissions */}
      <div className="space-y-4">
        {filtered.map((k) => (
          <div key={k.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{k.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">#{k.id}</span>
                </div>
                <p className="text-xs text-slate-500">{k.role} • {k.nationality} • {k.jurisdiction}</p>
                <p className="text-xs text-slate-500">ID Type: {k.idType} • Submitted: {k.submittedDate}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[k.status]}`}>
                  {k.status}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${riskColors[k.riskScore]}`}>
                  {k.riskScore} Risk
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className={`text-xs font-bold ${k.amlStatus === 'Clear' ? 'text-emerald-600' : 'text-rose-500'}`}>
                AML Status: {k.amlStatus}
              </span>
              {k.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button onClick={() => handleFlag(k.id)} className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50">
                    Flag for Review
                  </button>
                  <button onClick={() => handleApprove(k.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                    Approve KYC
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
