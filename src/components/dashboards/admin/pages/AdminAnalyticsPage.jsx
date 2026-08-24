import React from 'react';

export default function AdminAnalyticsPage({ properties = [] }) {
  const topMarkets = [
    { city: 'Ikoyi, Lagos', gmv: '₦0.00', share: 50, listings: properties.filter(p => p.location?.includes('Ikoyi') || p.city?.includes('Ikoyi')).length || 1 },
    { city: 'Maitama, Abuja', gmv: '₦0.00', share: 25, listings: properties.filter(p => p.location?.includes('Maitama') || p.city?.includes('Maitama')).length || 1 },
    { city: 'Victoria Island, Lagos', gmv: '₦0.00', share: 25, listings: properties.filter(p => p.location?.includes('Victoria') || p.city?.includes('Victoria')).length || 1 }
  ];

  const conversionMetrics = [
    { label: 'Deed Verification Rate', value: '100%', change: 'Verified', up: true },
    { label: 'Direct Escrow Settlement', value: '100%', change: '24h Hold', up: true },
    { label: 'Broker Fee Savings', value: '100%', change: '0% Agent Fees', up: true },
    { label: 'Platform Uptime & Security', value: '99.9%', change: 'Active', up: true }
  ];

  return (
    <div className="space-y-8 animate-fade-in font-['Host_Grotesk']">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Analytics & Platform Intelligence</h2>
          <p className="text-xs text-slate-500 mt-1">Platform-wide performance metrics, escrow volume, and market health.</p>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Escrow GMV', value: '₦0.00', change: '₦0.00 Volume', desc: 'Active escrow volume' },
          { label: 'Platform Commission', value: '₦0.00', change: '0% Fee Model', desc: 'Direct landlord model' },
          { label: 'Active Listings', value: `${properties.length}`, change: '100% Verified', desc: 'Title deeds verified' },
          { label: 'Active Disputes', value: '0', change: '0.0%', desc: 'Platform dispute rate' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</span>
            <div className="text-2xl font-black text-slate-900">{kpi.value}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold text-emerald-600">{kpi.change}</span>
              <span className="text-[11px] text-slate-400">• {kpi.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Market Distribution */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-extrabold text-base text-slate-900">Active Prime Hubs by Listings</h3>
          <div className="space-y-4">
            {topMarkets.map((mkt, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-5 text-xs font-black text-slate-400">#{i + 1}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{mkt.city}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-slate-900">{mkt.gmv}</span>
                      <span className="text-slate-400">{mkt.listings} listings</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0B2545] rounded-full" style={{ width: `${mkt.share}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Health */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Platform Operational Health</h3>
          <div className="space-y-3">
            {conversionMetrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">{m.value}</span>
                    <span className="font-bold text-[10px] text-emerald-600">
                      {m.change}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
