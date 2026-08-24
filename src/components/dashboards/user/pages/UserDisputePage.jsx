import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export default function UserDisputePage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ booking: '', type: '', description: '' });
  const [disputes, setDisputes] = useState([]);

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
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Dispute & Resolution Center</h2>
          <p className="text-xs text-slate-500 mt-1">Raise and track claims against landlords. Escrow funds are frozen in the vault until any dispute is formally resolved.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">
            + File a Claim
          </button>
        )}
      </div>

      {/* How disputes work */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>24-Hour Stay Escrow Protection</span>
        </div>
        <p className="text-rose-800 leading-relaxed pl-5">
          If a property does not match its listing, or has critical power/amenity failure, file a dispute within 24 hours of check-in.
          GoDirect freezes the escrow payout to the landlord and our dispute resolution team mediates within 4 hours.
        </p>
      </div>

      {/* Raise dispute form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm animate-fade-in">
          <h3 className="font-extrabold text-sm text-slate-900">File a Formal Dispute</h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Booking Reference</label>
              <input
                type="text"
                placeholder="e.g. BKG-101 (Ikoyi Penthouse)"
                value={form.booking}
                onChange={e => setForm({ ...form, booking: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#018F8B]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Dispute Reason</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 outline-none bg-white focus:border-[#018F8B]">
                <option value="">Select a reason...</option>
                <option value="Property Misrepresentation">Property Misrepresentation (Photos / Amenities inaccurate)</option>
                <option value="Power / Utility Outage">Power / Generator / Water failure</option>
                <option value="Access / Check-in Denied">Access / Check-in Denied by Host</option>
                <option value="Security / Safety Concern">Security / Safety Concern</option>
                <option value="Unauthorized Charge">Unauthorized Charge / Double Billing</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Detailed Description of Issue</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Provide specific details about what went wrong..."
                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#018F8B] resize-none"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700">
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disputes list */}
      <div className="space-y-4">
        {disputes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No Active Disputes Filed</p>
            <p>All your stays and escrow deposits are operating safely under GoDirect 24-Hour Stay Escrow.</p>
          </div>
        ) : (
          disputes.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">#{d.id} • {d.submittedDate}</span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{d.type}</h4>
                  <p className="text-xs text-slate-500 font-bold">{d.booking}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[d.status]}`}>
                  {d.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                "{d.description}"
              </p>

              {d.resolution && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
                  <span className="font-bold text-emerald-900 block">Resolution Outcome:</span>
                  <p className="text-emerald-800">{d.resolution}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
