import React from 'react';

export default function AdminAnalyticsPage() {
  const topMarkets = [
    { city: 'London, UK', gmv: '$62,400', share: 42, bookings: 128 },
    { city: 'Dubai, UAE', gmv: '$38,800', share: 26, bookings: 81 },
    { city: 'Lagos, Nigeria', gmv: '$21,200', share: 14, bookings: 63 },
    { city: 'Paris, France', gmv: '$16,500', share: 11, bookings: 44 },
    { city: 'New York, USA', gmv: '$9,600', share: 7, bookings: 29 }
  ];

  const revenueTrend = [
    { month: 'Mar', value: 62 },
    { month: 'Apr', value: 78 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 89 },
    { month: 'Jul', value: 95 },
    { month: 'Aug', value: 100 }
  ];

  const conversionMetrics = [
    { label: 'Inquiry → Booking', value: '34.2%', change: '+2.1%', up: true },
    { label: 'Listing Click → Inquiry', value: '18.7%', change: '+0.8%', up: true },
    { label: 'Search → Listing Click', value: '61.4%', change: '-1.2%', up: false },
    { label: 'Platform Visitor → Search', value: '72.9%', change: '+3.4%', up: true }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Analytics & Revenue Intelligence</h2>
          <p className="text-xs text-slate-500 mt-1">Platform-wide performance metrics and market insights.</p>
        </div>
        <select className="text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 outline-none">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last 12 Months</option>
          <option>All Time</option>
        </select>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total GMV', value: '$148,500', change: '+18.4%', desc: 'vs last period' },
          { label: 'Platform Revenue', value: '$0', change: '0% Fee', desc: 'Zero commission model' },
          { label: 'Avg Booking Value', value: '$1,420', change: '+9.2%', desc: 'Per completed booking' },
          { label: 'Refund Rate', value: '1.2%', change: '-0.3%', desc: 'Healthy threshold <5%' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</span>
            <div className="text-2xl font-black text-slate-900">{kpi.value}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold text-emerald-600">{kpi.change}</span>
              <span className="text-[11px] text-slate-400">{kpi.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Revenue Trend Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-extrabold text-base text-slate-900">Monthly Revenue Trend</h3>
          <div className="flex items-end gap-3 h-36">
            {revenueTrend.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#0B2545] to-[#1a4080] transition-all"
                  style={{ height: `${m.value}%` }}
                />
                <span className="text-[10px] font-bold text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Conversion Funnel</h3>
          <div className="space-y-3">
            {conversionMetrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">{m.value}</span>
                    <span className={`font-bold text-[10px] ${m.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {m.change}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0B2545] rounded-full"
                    style={{ width: m.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Markets Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="font-extrabold text-base text-slate-900">Top Markets by GMV</h3>
        <div className="space-y-3">
          {topMarkets.map((mkt, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-5 text-xs font-black text-slate-400">#{i + 1}</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{mkt.city}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-slate-900">{mkt.gmv}</span>
                    <span className="text-slate-400">{mkt.bookings} bookings</span>
                    <span className="font-bold text-slate-500">{mkt.share}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${mkt.share}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
