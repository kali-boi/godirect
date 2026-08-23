import React, { useState } from 'react';
import { Headphones, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

export default function UserSupportPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: '', category: '', message: '' });

  const [tickets, setTickets] = useState([
    {
      id: 'TKT-U-201',
      subject: 'Dispute refund not received after resolution',
      category: 'Payments',
      message: 'My dispute (dsp-401) was marked as resolved with a $420 refund on Jul 17, but funds have not appeared in my account.',
      submittedDate: '20 Jul 2026',
      status: 'resolved',
      adminReply: 'Apologies for the delay. The $420 refund was processed to your original payment method on Jul 20. Please allow 3–5 business days for it to reflect.'
    }
  ]);

  const handleSubmit = () => {
    if (!form.subject || !form.category || !form.message) return;
    const newTicket = {
      id: `TKT-U-${Date.now()}`,
      subject: form.subject,
      category: form.category,
      message: form.message,
      submittedDate: 'Today',
      status: 'open',
      adminReply: null
    };
    setTickets([newTicket, ...tickets]);
    setShowForm(false);
    setForm({ subject: '', category: '', message: '' });
  };

  const statusColors = {
    open: 'bg-rose-50 text-rose-800 border-rose-200',
    in_progress: 'bg-amber-50 text-amber-800 border-amber-200',
    resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Help & Support</h2>
          <p className="text-xs text-slate-500 mt-1">Get help from the GoDirect support team. We typically respond within 4 hours.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
            + Open Ticket
          </button>
        )}
      </div>

      {/* FAQ quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'How Escrow Works', icon: '🔒' },
          { label: 'Cancellation Policy', icon: '📋' },
          { label: 'Refund Timeline', icon: '💰' },
          { label: 'Verify My Identity', icon: '🪪' }
        ].map((faq, i) => (
          <button key={i} className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1.5 hover:bg-slate-50 transition-all">
            <span className="text-xl">{faq.icon}</span>
            <p className="text-xs font-bold text-slate-700">{faq.label}</p>
          </button>
        ))}
      </div>

      {/* New ticket form */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Submit Support Ticket</h3>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase block mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-[#0B2545]/20">
                <option value="">Select category...</option>
                <option>Payments & Escrow</option>
                <option>Booking Issue</option>
                <option>Property Dispute</option>
                <option>Account & Verification</option>
                <option>Technical Problem</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase block mb-1">Subject</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Brief description of your issue..."
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-[#0B2545]/20" />
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase block mb-1">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Provide as much detail as possible..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
                rows={4} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">Cancel</button>
            <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">Submit Ticket</button>
          </div>
        </div>
      )}

      {/* Ticket list */}
      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{t.subject}</h4>
                <p className="text-xs text-slate-500">Category: {t.category} • {t.submittedDate} • #{t.id}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${statusColors[t.status]}`}>
                {t.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">"{t.message}"</p>
            {t.adminReply && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-1">
                <span className="text-[10px] font-extrabold text-blue-700 uppercase">Support Response</span>
                <p className="text-xs text-blue-900">{t.adminReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
