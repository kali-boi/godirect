import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

export default function UserDisputePage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ booking: '', type: '', description: '' });

  const [disputes, setDisputes] = useState([
    {
      id: 'dsp-401',
      booking: 'BKG-003 — Eiffel View Executive Suite',
      type: 'Property Misrepresentation',
      description: 'The listing showed a dedicated workspace with high-speed fibre internet. On arrival, there was no desk and the WiFi was mobile hotspot only — unusable for remote work.',
      submittedDate: '15 Jul 2026',
      status: 'resolved',
      resolution: 'Partial refund of $420 approved by GoDirect Admin. Funds released from escrow.',
      adminNote: 'Host acknowledged the WiFi issue. Partial compensation applied.'
    }
  ]);

  const handleSubmit = () => {
    if (!form.booking || !form.type || !form.description) return;
    const newDispute = {
      id: `dsp-${Date.now()}`,
      booking: form.booking,
      type: form.type,
      description: form.description,
      submittedDate: 'Today',
      status: 'open',
      resolution: null,
      adminNote: null
    };
    setDisputes([newDispute, ...disputes]);
    setShowForm(false);
    setForm({ booking: '', type: '', description: '' });
  };

  const statusColors = {
    open: 'bg-rose-50 text-rose-800 border-rose-200',
    under_review: 'bg-amber-50 text-amber-800 border-amber-200',
    resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Dispute Center</h2>
          <p className="text-xs text-slate-500 mt-1">Raise and track disputes against hosts. Escrow funds are protected until any dispute is resolved.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">
            + Raise Dispute
          </button>
        )}
      </div>

      {/* How disputes work */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 space-y-1">
        <strong className="block">Important:</strong>
        You have <strong>24 hours from check-in</strong> to raise a dispute and block escrow release. After this window, funds are automatically released to the host.
        All disputes are reviewed by GoDirect Admins within 48 hours.
      </div>

      {/* Dispute form */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">New Dispute</h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase block mb-1">Booking Reference</label>
              <select value={form.booking} onChange={(e) => setForm({ ...form, booking: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-[#0B2545]/20">
                <option value="">Select a booking...</option>
                <option value="BKG-001 — The Skyview Horizon Penthouse">BKG-001 — The Skyview Horizon Penthouse</option>
                <option value="BKG-002 — The Azure Waterfront Villa">BKG-002 — The Azure Waterfront Villa</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase block mb-1">Dispute Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-[#0B2545]/20">
                <option value="">Select type...</option>
                <option>Property Misrepresentation</option>
                <option>Amenity Unavailable</option>
                <option>Cleanliness / Condition</option>
                <option>Host No-Show / Access Issue</option>
                <option>Escrow / Payment Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase block mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue in detail. Be specific — what was promised vs what you experienced..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">
              Submit Dispute
            </button>
          </div>
        </div>
      )}

      {/* Existing disputes */}
      <div className="space-y-4">
        {disputes.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">No disputes raised. We hope your stays are always flawless!</div>
        )}
        {disputes.map((d) => (
          <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{d.type}</h4>
                <p className="text-xs text-slate-500">{d.booking} • Submitted: {d.submittedDate}</p>
                <p className="text-[11px] font-mono text-slate-400">#{d.id}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${statusColors[d.status]}`}>
                {d.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              "{d.description}"
            </p>

            {d.resolution && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1">
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase">Resolution</span>
                <p className="text-xs text-emerald-900">{d.resolution}</p>
                {d.adminNote && <p className="text-[11px] text-emerald-700 italic">Admin note: {d.adminNote}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
