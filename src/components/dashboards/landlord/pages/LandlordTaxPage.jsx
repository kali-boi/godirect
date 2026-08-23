import React from 'react';
import { Download, FileSpreadsheet, Receipt } from 'lucide-react';

export default function LandlordTaxPage() {
  const incomeStatements = [
    { period: 'Aug 2026 (MTD)', grossIncome: '$35,840', vat: '$0', withholdingTax: '$0', netIncome: '$35,840', status: 'current' },
    { period: 'Jul 2026', grossIncome: '$28,600', vat: '$0', withholdingTax: '$0', netIncome: '$28,600', status: 'available' },
    { period: 'Jun 2026', grossIncome: '$31,200', vat: '$0', withholdingTax: '$0', netIncome: '$31,200', status: 'available' },
    { period: 'Q2 2026 (Apr–Jun)', grossIncome: '$89,450', vat: '$0', withholdingTax: '$0', netIncome: '$89,450', status: 'available' },
    { period: 'FY 2025', grossIncome: '$312,800', vat: '$0', withholdingTax: '$0', netIncome: '$312,800', status: 'available' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Tax & Income Statements</h2>
          <p className="text-xs text-slate-500 mt-1">Download monthly, quarterly, and annual income reports for your accountant or tax filings.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold">
          <FileSpreadsheet className="w-4 h-4" />
          Export All to CSV
        </button>
      </div>

      {/* Tax Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
        <strong>Tax Note:</strong> GoDirect operates a zero-commission, peer-to-peer model. All income shown is gross rental income. 
        Hosts are solely responsible for declaring this income to their local tax authority 
        (HMRC in UK, FTA in UAE, FIRS in Nigeria). GoDirect provides this data for your records only.
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Gross Income (YTD)', value: '$223,640' },
          { label: 'GoDirect Commission', value: '$0 (0%)' },
          { label: 'Net Payout (YTD)', value: '$223,640' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Income Statements Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3">Period</div>
          <div className="col-span-2">Gross Income</div>
          <div className="col-span-2">VAT (if applicable)</div>
          <div className="col-span-2">WHT</div>
          <div className="col-span-2">Net Income</div>
          <div className="col-span-1">Download</div>
        </div>
        <div className="divide-y divide-slate-50">
          {incomeStatements.map((s, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-3">
                <span className="text-xs font-bold text-slate-900">{s.period}</span>
                {s.status === 'current' && (
                  <span className="ml-2 text-[9px] font-extrabold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">LIVE</span>
                )}
              </div>
              <div className="col-span-2 text-xs font-bold text-slate-900">{s.grossIncome}</div>
              <div className="col-span-2 text-xs text-slate-500">{s.vat}</div>
              <div className="col-span-2 text-xs text-slate-500">{s.withholdingTax}</div>
              <div className="col-span-2 text-xs font-black text-emerald-700">{s.netIncome}</div>
              <div className="col-span-1">
                {s.status !== 'current' && (
                  <button className="text-slate-400 hover:text-slate-700">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
