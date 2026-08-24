import React from 'react';
import { Globe, Check } from 'lucide-react';

export default function AdminRegionsPage({ properties = [] }) {
  const regions = [
    { country: 'Nigeria (Lagos & Abuja)', flag: '🇳🇬', currency: 'NGN (₦)', vat: '7.5%', amlBody: 'SCUML / CBN / NFIU', gdpr: true, activeListings: properties.length, status: 'active' },
    { country: 'United Kingdom (Diaspora Hub)', flag: '🇬🇧', currency: 'GBP (£) / NGN', vat: '20%', amlBody: 'FCA', gdpr: true, activeListings: 0, status: 'active' },
    { country: 'United Arab Emirates (Diaspora Hub)', flag: '🇦🇪', currency: 'AED (د.إ) / NGN', vat: '5%', amlBody: 'CBUAE', gdpr: false, activeListings: 0, status: 'active' },
    { country: 'United States (Diaspora Hub)', flag: '🇺🇸', currency: 'USD ($) / NGN', vat: 'State-level', amlBody: 'FinCEN', gdpr: false, activeListings: 0, status: 'active' },
    { country: 'Ghana (Expansion Hub)', flag: '🇬🇭', currency: 'GHS (₵)', vat: '15%', amlBody: 'FIC Ghana', gdpr: false, activeListings: 0, status: 'pending' }
  ];

  return (
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Geographic & Jurisdiction Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Country-level tax rates, regulatory compliance frameworks, and currency configurations.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Operational Markets', value: regions.filter(r => r.status === 'active').length },
          { label: 'AML/KYC Compliant Hubs', value: regions.length },
          { label: 'Total Verified Listings', value: properties.length }
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
          <div className="col-span-4">Country / Region</div>
          <div className="col-span-2">Accepted Currency</div>
          <div className="col-span-1">VAT/Tax</div>
          <div className="col-span-2">Regulatory Body</div>
          <div className="col-span-1">NDPR/GDPR</div>
          <div className="col-span-1">Listings</div>
          <div className="col-span-1">Status</div>
        </div>

        <div className="divide-y divide-slate-50">
          {regions.map((r, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-4 flex items-center gap-2">
                <span className="text-xl">{r.flag}</span>
                <span className="text-xs font-bold text-slate-900">{r.country}</span>
              </div>
              <div className="col-span-2 text-xs text-slate-600 font-semibold">{r.currency}</div>
              <div className="col-span-1 text-xs font-bold text-slate-900">{r.vat}</div>
              <div className="col-span-2 text-xs text-slate-600 font-medium">{r.amlBody}</div>
              <div className="col-span-1">
                {r.gdpr ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="text-[11px] text-slate-400">N/A</span>
                )}
              </div>
              <div className="col-span-1 text-xs font-black text-slate-900">{r.activeListings}</div>
              <div className="col-span-1">
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
