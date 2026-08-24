import React, { useState } from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export default function UserDocumentsPage() {
  const [documents, setDocuments] = useState([]);

  const typeColors = {
    'Lease Agreement': 'bg-blue-50 text-blue-800 border-blue-200',
    'Receipt': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Dispute Certificate': 'bg-purple-50 text-purple-800 border-purple-200'
  };

  const statusColors = {
    active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    completed: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Documents & Digital Leases</h2>
          <p className="text-xs text-slate-500 mt-1">Access verified tenancy agreements, escrow receipts, and inspection certificates.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Documents', value: documents.length },
          { label: 'Lease Agreements', value: documents.filter(d => d.type === 'Lease Agreement').length },
          { label: 'Escrow Receipts', value: documents.filter(d => d.type === 'Receipt').length }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No Documents or Receipts Yet</p>
            <p>When you complete a booking or tour, digital lease agreements and escrow receipts will be generated automatically here.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                  <p className="text-xs text-slate-400">{doc.property} • {doc.generatedDate} • {doc.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${typeColors[doc.type] || 'bg-slate-100'}`}>
                  {doc.type}
                </span>
                <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
