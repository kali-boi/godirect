import React from 'react';
import { DollarSign, Building2, ShieldCheck, Users, BarChart3 } from 'lucide-react';

export default function AdminOverviewPage({ 
  properties = [], 
  verifications = [], 
  usersCount = 0,
  totalGMV = 0,
  recentActivities = [],
  handleApprove, 
  setActiveNav 
}) {
  const pendingCount = verifications.filter(v => v.status === 'pending' || v.verificationStatus === 'pending').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome back, admin
        </h1>
        <p className="text-xs text-slate-500 mt-1">Real-time marketplace oversight and compliance control.</p>
      </div>

      {/* 5-COLUMN METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Platform GMV</span>
            <DollarSign className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">₦{Number(totalGMV || 0).toLocaleString()}</div>
          <p className="text-[11px] text-slate-400 font-medium">Gross marketplace value</p>
        </div>

        <div onClick={() => setActiveNav('listings')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Verified Listings</span>
            <Building2 className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{properties.length}</div>
          <p className="text-[11px] text-slate-400 font-medium">Verified active properties</p>
        </div>

        <div onClick={() => setActiveNav('verifications')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Pending Deeds</span>
            <ShieldCheck className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingCount}</div>
          <p className="text-[11px] text-slate-400 font-medium">Deed claims queue</p>
        </div>

        <div onClick={() => setActiveNav('users')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Total Users</span>
            <Users className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersCount}</div>
          <p className="text-[11px] text-slate-400 font-medium">Registered platform users</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">System Uptime</span>
            <BarChart3 className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">100%</div>
          <p className="text-[11px] text-slate-400 font-medium">Platform availability</p>
        </div>
      </div>

      {/* TWO COLUMN LOWER CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900">Pending Title Deed Verifications</h3>
            <span className="text-xs font-bold text-slate-400 font-mono">Queue: {pendingCount}</span>
          </div>

          <div className="space-y-4">
            {verifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                All property deeds are verified. No pending reviews in queue.
              </div>
            ) : (
              verifications.map((v) => (
                <div key={v.id} className="p-4 rounded-xl border border-slate-100 hover:border-slate-300 transition-all space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{v.landlordName || v.hostName || 'Landlord'}</h4>
                      <p className="text-slate-400">{v.propertyTitle || v.title}</p>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">#{v.id}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500">{v.docType || 'Title Deed & Government ID'}</span>
                    {v.status === 'pending' || v.verificationStatus === 'pending' ? (
                      <button 
                        onClick={() => handleApprove(v.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-black"
                      >
                        Approve Deed
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold">✓ Verified</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900">Recent Activity</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                No recent activity logged yet. Actions will appear here.
              </div>
            ) : (
              recentActivities.map((act) => (
                <div key={act.id} className="flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-slate-900">{act.title}</h5>
                    <p className="text-slate-500 font-medium">{act.subtitle}</p>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full shrink-0">
                    {act.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
