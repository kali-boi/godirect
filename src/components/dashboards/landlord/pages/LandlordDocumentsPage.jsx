import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, Plus } from 'lucide-react';

export default function LandlordDocumentsPage({ properties = [] }) {
  const [documents, setDocuments] = useState([]);

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
          <Plus className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Vault Documents', value: documents.length },
          { label: 'Verified & Active', value: documents.filter(d => d.status === 'verified').length },
          { label: 'Pending Review', value: documents.filter(d => d.status === 'pending').length }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Documents by Property */}
      <div className="space-y-6">
        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No documents uploaded to the vault yet. Title deeds and government IDs uploaded during listing creation or KYC will appear here.
          </div>
        ) : (
          Object.entries(grouped).map(([propName, docs]) => (
            <div key={propName} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-extrabold text-base text-slate-900">{propName}</h3>
              <div className="space-y-3">
                {docs.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{d.name}</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${typeColors[d.type] || 'bg-slate-200'}`}>
                            {d.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">Uploaded {d.uploadedDate} • {d.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[d.status]}`}>
                        {d.status.replace('_', ' ')}
                      </span>
                      <button className="p-2 rounded-xl hover:bg-white text-slate-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
