import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function UserDocumentsPage() {
  const documents = [
    {
      id: 'doc-u-001',
      booking: 'BKG-001',
      property: 'The Skyview Horizon Penthouse',
      name: 'Booking Confirmation & Lease Agreement',
      type: 'Lease Agreement',
      generatedDate: '10 Oct 2026',
      size: '420 KB',
      status: 'active'
    },
    {
      id: 'doc-u-002',
      booking: 'BKG-001',
      property: 'The Skyview Horizon Penthouse',
      name: 'Escrow Deposit Receipt — $3,570.00',
      type: 'Receipt',
      generatedDate: '10 Oct 2026',
      size: '88 KB',
      status: 'active'
    },
    {
      id: 'doc-u-003',
      booking: 'BKG-002',
      property: 'The Azure Waterfront Villa',
      name: 'Booking Confirmation & Lease Agreement',
      type: 'Lease Agreement',
      generatedDate: '22 Aug 2026',
      size: '390 KB',
      status: 'active'
    },
    {
      id: 'doc-u-004',
      booking: 'BKG-003',
      property: 'Eiffel View Executive Suite',
      name: 'Booking Confirmation & Lease Agreement',
      type: 'Lease Agreement',
      generatedDate: '12 Jul 2026',
      size: '370 KB',
      status: 'completed'
    },
    {
      id: 'doc-u-005',
      booking: 'BKG-003',
      property: 'Eiffel View Executive Suite',
      name: 'Escrow Release & Payment Receipt — $4,250.00',
      type: 'Receipt',
      generatedDate: '15 Jul 2026',
      size: '95 KB',
      status: 'completed'
    },
    {
      id: 'doc-u-006',
      booking: 'BKG-003',
      property: 'Eiffel View Executive Suite',
      name: 'Dispute Resolution Certificate — $420 Refund',
      type: 'Legal',
      generatedDate: '17 Jul 2026',
      size: '140 KB',
      status: 'completed'
    }
  ];

  const typeColors = {
    'Lease Agreement': 'bg-blue-50 text-blue-800',
    'Receipt': 'bg-emerald-50 text-emerald-800',
    'Legal': 'bg-purple-50 text-purple-800',
    'Identity': 'bg-amber-50 text-amber-800'
  };

  const grouped = documents.reduce((acc, d) => {
    if (!acc[d.property]) acc[d.property] = [];
    acc[d.property].push(d);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Documents & Agreements</h2>
          <p className="text-xs text-slate-500 mt-1">Download signed lease agreements, booking confirmations, escrow receipts, and legal documents.</p>
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
          {documents.length} Documents
        </div>
      </div>

      {Object.entries(grouped).map(([property, docs]) => (
        <div key={property} className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#0B2545] inline-block" />
            {property}
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[doc.type]}`}>{doc.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Generated: {doc.generatedDate} • {doc.size}</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
