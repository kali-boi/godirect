import React, { useState } from 'react';
import { Globe, Check, Tag } from 'lucide-react';

export default function AdminRegionsPage() {
  const [regions] = useState([
    { country: 'United Kingdom', flag: '🇬🇧', currency: 'GBP (£)', vat: '20%', amlBody: 'FCA', gdpr: true, activeListings: 142, status: 'active' },
    { country: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED (د.إ)', vat: '5%', amlBody: 'CBUAE', gdpr: false, activeListings: 98, status: 'active' },
    { country: 'Nigeria', flag: '🇳🇬', currency: 'NGN (₦)', vat: '7.5%', amlBody: 'FINTRAC / CBN', gdpr: false, activeListings: 85, status: 'active' },
    { country: 'France', flag: '🇫🇷', currency: 'EUR (€)', vat: '20%', amlBody: 'AMF / BdF', gdpr: true, activeListings: 115, status: 'active' },
    { country: 'United States', flag: '🇺🇸', currency: 'USD ($)', vat: 'N/A (State-level)', amlBody: 'FinCEN', gdpr: false, activeListings: 160, status: 'active' },
    { country: 'South Africa', flag: '🇿🇦', currency: 'ZAR (R)', vat: '15%', amlBody: 'FSCA / FIC', gdpr: false, activeListings: 0, status: 'pending' }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Geographic & Jurisdiction Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Country-level tax rates, regulatory compliance frameworks, and currency configurations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
          <Globe className="w-4 h-4" />
          Add New Region
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Markets', value: regions.filter(r => r.status === 'active').length },
          { label: 'GDPR-Compliant Markets', value: regions.filter(r => r.gdpr).length },
          { label: 'Total Active Listings', value: regions.reduce((acc, r) => acc + r.activeListings, 0) }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Regions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3">Country</div>
          <div className="col-span-2">Currency</div>
          <div className="col-span-1">VAT/Tax</div>
          <div className="col-span-2">AML Body</div>
          <div className="col-span-1">GDPR</div>
          <div className="col-span-1">Listings</div>
          <div className="col-span-2">Status</div>
        </div>

        <div className="divide-y divide-slate-50">
          {regions.map((r, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-3 flex items-center gap-2">
                <span className="text-xl">{r.flag}</span>
                <span className="text-xs font-bold text-slate-900">{r.country}</span>
              </div>
              <div className="col-span-2 text-xs text-slate-600">{r.currency}</div>
              <div className="col-span-1 text-xs font-bold text-slate-900">{r.vat}</div>
              <div className="col-span-2 text-xs text-slate-600">{r.amlBody}</div>
              <div className="col-span-1">
                {r.gdpr ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="text-[11px] text-slate-400">N/A</span>
                )}
              </div>
              <div className="col-span-1 text-xs font-bold text-slate-900">{r.activeListings}</div>
              <div className="col-span-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  r.status === 'active' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
