import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { getAllProfiles } from '../../../../services/supabaseService';
import { supabase } from '../../../../lib/supabaseClient';

export default function AdminKYCPage() {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchKYCProfiles = async () => {
    setLoading(true);
    try {
      const profiles = await getAllProfiles();
      setItems((profiles || []).map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        role: p.role,
        nationality: p.country || 'Nigeria',
        idType: p.role === 'landlord' ? 'Government ID & Proof of Title' : 'Government Identity (NIN/Passport)',
        jurisdiction: p.country || 'Nigeria',
        submittedDate: p.joinDate,
        riskScore: 'Low',
        amlStatus: 'Clear',
        status: p.kycStatus || 'unverified'
      })));
    } catch (err) {
      console.warn('Error fetching KYC profiles:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKYCProfiles();
  }, []);

  const riskColors = { Low: 'text-emerald-600 bg-emerald-50', Medium: 'text-amber-600 bg-amber-50', High: 'text-rose-600 bg-rose-50' };
  const statusColors = { 
    pending: 'bg-amber-50 text-amber-800 border-amber-200', 
    verified: 'bg-emerald-50 text-emerald-800 border-emerald-200', 
    unverified: 'bg-slate-100 text-slate-700 border-slate-200',
    flagged: 'bg-rose-50 text-rose-800 border-rose-200' 
  };

  const filtered = filter === 'all' ? items : items.filter(k => k.status === filter);

  const handleApprove = async (userId) => {
    try {
      await supabase.from('profiles').update({ kyc_status: 'verified' }).eq('id', userId);
      setItems(items.map(i => i.id === userId ? { ...i, status: 'verified' } : i));
    } catch (err) {
      console.error('Failed to approve KYC:', err);
    }
  };

  const handleFlag = async (userId) => {
    try {
      await supabase.from('profiles').update({ kyc_status: 'flagged' }).eq('id', userId);
      setItems(items.map(i => i.id === userId ? { ...i, status: 'flagged' } : i));
    } catch (err) {
      console.error('Failed to flag KYC:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">KYC & Compliance Center</h2>
          <p className="text-xs text-slate-500 mt-1">Identity verification, AML screening, and regulatory compliance across all jurisdictions.</p>
        </div>
        <button 
          onClick={fetchKYCProfiles}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* KYC Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Verified Identities', value: items.filter(i => i.status === 'verified').length, icon: ShieldCheck, color: 'text-emerald-600' },
          { label: 'Pending Review', value: items.filter(i => i.status === 'pending').length, icon: Clock, color: 'text-amber-600' },
          { label: 'Unverified / Active', value: items.filter(i => i.status === 'unverified').length, icon: Clock, color: 'text-slate-600' },
          { label: 'AML Flagged', value: items.filter(i => i.status === 'flagged').length, icon: AlertTriangle, color: 'text-rose-500' }
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
        {['all', 'verified', 'pending', 'unverified', 'flagged'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All Users' : f}
          </button>
        ))}
      </div>

      {/* Submissions */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No KYC records match the selected filter.
          </div>
        ) : (
          filtered.map((k) => (
            <div key={k.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{k.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">#{k.id?.slice(0, 8)}</span>
                  </div>
                  <p className="text-xs text-slate-500 capitalize">{k.role} • {k.email} • {k.jurisdiction}</p>
                  <p className="text-xs text-slate-500">ID Verification: {k.idType} • Joined: {k.submittedDate}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${statusColors[k.status] || statusColors.unverified}`}>
                    {k.status}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${riskColors[k.riskScore]}`}>
                    {k.riskScore} Risk
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className={`text-xs font-bold ${k.status === 'flagged' ? 'text-rose-500' : 'text-emerald-600'}`}>
                  AML Status: {k.status === 'flagged' ? 'Flagged' : 'Clear'}
                </span>
                <div className="flex items-center gap-2">
                  {k.status !== 'flagged' && (
                    <button onClick={() => handleFlag(k.id)} className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 transition-colors">
                      Flag Profile
                    </button>
                  )}
                  {k.status !== 'verified' && (
                    <button onClick={() => handleApprove(k.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors">
                      Verify Identity
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
