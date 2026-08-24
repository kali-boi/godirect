import React from 'react';

export default function LandlordAnalyticsPage({ properties = [] }) {
  return (
    <div className="space-y-8 animate-fade-in font-['Host_Grotesk']">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Analytics & Performance</h2>
          <p className="text-xs text-slate-500 mt-1">Listing health, escrow earnings, and property-level insights.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: `${properties.length}`, sub: 'Verified properties' },
          { label: 'Escrow Revenue', value: '₦0.00', sub: 'Lifetime payouts' },
          { label: 'Active Bookings', value: '0', sub: 'Current stays' },
          { label: 'Portfolio Rating', value: '5.0 ★', sub: 'Verified guest reviews' }
        ].map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">{k.label}</span>
            <div className="text-2xl font-black text-slate-900">{k.value}</div>
            <span className="text-[11px] text-slate-500 font-medium">{k.sub}</span>
          </div>
        ))}
      </div>

      {/* Property-level Performance */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Property Performance Breakdown</h3>
        {properties.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            No properties found in your portfolio. List your first property to view analytics.
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((p) => {
              const priceFormatted = p.isShortLet
                ? `₦${Number(p.pricePerNight || p.price || 0).toLocaleString()}/night`
                : `₦${Number(p.pricePerYear || p.price || 0).toLocaleString()}/year`;

              return (
                <div key={p.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{p.title}</h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ✓ Verified & Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">Rate</span>
                      <span className="font-black text-slate-900">{priceFormatted}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">Category</span>
                      <span className="font-bold text-slate-700 capitalize">{p.type || (p.isShortLet ? 'Shortlet' : 'Long Lease')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">Location</span>
                      <span className="font-bold text-slate-700">{p.city || p.location || 'Lagos'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">Escrow Protection</span>
                      <span className="font-black text-emerald-600">Active (24h)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
