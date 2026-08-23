import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export default function LandlordDocumentsPage() {
  const documents = [
    { id: 'doc-1', property: 'The Skyview Horizon Penthouse', name: 'Land Registry Title Deed', type: 'Title Deed', uploadedDate: '01 Jan 2022', status: 'verified', size: '2.4 MB' },
    { id: 'doc-2', property: 'The Skyview Horizon Penthouse', name: 'UK Passport (Eleanor Vance)', type: 'Identity Document', uploadedDate: '01 Jan 2022', status: 'verified', size: '1.1 MB' },
    { id: 'doc-3', property: 'The Skyview Horizon Penthouse', name: 'Property Insurance Certificate 2026', type: 'Insurance', uploadedDate: '01 Jan 2026', status: 'verified', size: '890 KB' },
    { id: 'doc-4', property: 'The Azure Waterfront Villa', name: 'Jersey Land Registry Certificate', type: 'Title Deed', uploadedDate: '14 Mar 2023', status: 'verified', size: '3.1 MB' },
    { id: 'doc-5', property: 'The Azure Waterfront Villa', name: 'Property & Contents Insurance 2026', type: 'Insurance', uploadedDate: '01 Jan 2026', status: 'verified', size: '760 KB' },
    { id: 'doc-6', property: 'The Azure Waterfront Villa', name: 'Gas Safety Certificate 2026', type: 'Compliance', uploadedDate: '15 Mar 2026', status: 'expiring_soon', size: '540 KB' }
  ];

  const typeColors = {
    'Title Deed': 'bg-blue-50 text-blue-800',
    'Identity Document': 'bg-purple-50 text-purple-800',
    'Insurance': 'bg-emerald-50 text-emerald-800',
    'Compliance': 'bg-amber-50 text-amber-800'
  };

  const statusColors = {
    verified: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    expiring_soon: 'bg-amber-50 text-amber-800 border-amber-200',
    pending: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const grouped = documents.reduce((acc, doc) => {
    if (!acc[doc.property]) acc[doc.property] = [];
    acc[doc.property].push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Document Vault</h2>
          <p className="text-xs text-slate-500 mt-1">Securely store title deeds, identity documents, insurance certificates, and compliance files.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
          <FileText className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Documents', value: documents.length },
          { label: 'Verified & Active', value: documents.filter(d => d.status === 'verified').length },
          { label: 'Expiring Soon', value: documents.filter(d => d.status === 'expiring_soon').length }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Documents by Property */}
      {Object.entries(grouped).map(([property, docs]) => (
        <div key={property} className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#0B2545] inline-block" />
            {property}
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[doc.type]}`}>{doc.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Uploaded: {doc.uploadedDate} • {doc.size}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[doc.status]}`}>
                      {doc.status === 'expiring_soon' ? 'Expiring Soon' : doc.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-700 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
