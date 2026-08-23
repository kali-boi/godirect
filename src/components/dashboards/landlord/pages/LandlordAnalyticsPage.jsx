import React from 'react';

export default function LandlordAnalyticsPage({ properties = [] }) {
  const occupancyData = [
    { month: 'Mar', rate: 68 },
    { month: 'Apr', rate: 82 },
    { month: 'May', rate: 75 },
    { month: 'Jun', rate: 91 },
    { month: 'Jul', rate: 88 },
    { month: 'Aug', rate: 95 }
  ];

  const propertyPerformance = [
    { name: 'The Skyview Horizon Penthouse', occupancy: '92%', revenue: '$14,280', inquiries: 34, avgRating: 4.9 },
    { name: 'The Azure Waterfront Villa', occupancy: '85%', revenue: '$21,560', inquiries: 28, avgRating: 4.8 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Analytics & Performance</h2>
          <p className="text-xs text-slate-500 mt-1">Occupancy trends, revenue analytics, and property-level insights.</p>
        </div>
        <select className="text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 bg-white outline-none">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last 12 Months</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Occupancy Rate', value: '88.2%', change: '+4.1%', up: true },
          { label: 'Total Revenue', value: '$35,840', change: '+12.8%', up: true },
          { label: 'Total Bookings', value: '62', change: '+7', up: true },
          { label: 'Avg Guest Rating', value: '4.87 ★', change: '+0.09', up: true }
        ].map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">{k.label}</span>
            <div className="text-2xl font-black text-slate-900">{k.value}</div>
            <span className={`text-[11px] font-bold ${k.up ? 'text-emerald-600' : 'text-rose-500'}`}>{k.change} vs last period</span>
          </div>
        ))}
      </div>

      {/* Occupancy Trend */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="font-extrabold text-base text-slate-900">Monthly Occupancy Rate</h3>
        <div className="flex items-end gap-4 h-32">
          {occupancyData.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-slate-500">{m.rate}%</span>
              <div className="w-full rounded-t-xl bg-gradient-to-t from-[#0B2545] to-[#1a4080]" style={{ height: `${m.rate}%` }} />
              <span className="text-[10px] font-bold text-slate-400">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property-level Performance */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Property Performance Breakdown</h3>
        <div className="space-y-4">
          {propertyPerformance.map((p, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Occupancy', value: p.occupancy },
                  { label: 'Revenue', value: p.revenue },
                  { label: 'Inquiries', value: p.inquiries },
                  { label: 'Avg Rating', value: p.avgRating + ' ★' }
                ].map((stat, j) => (
                  <div key={j}>
                    <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                    <span className="font-black text-sm text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
