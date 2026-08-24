import React, { useState } from 'react';
import { Headphones, CheckCircle2, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export default function UserSupportPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: '', category: '', message: '' });
  const [tickets, setTickets] = useState([]);

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
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Help & Concierge Support</h2>
          <p className="text-xs text-slate-500 mt-1">Get 24/7 assistance from GoDirect support team regarding escrow, tours, or landlord verification.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
            + Open Support Ticket
          </button>
        )}
      </div>

      {/* FAQ quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'How Escrow Works', icon: '🔒' },
          { label: 'Inspection Policy', icon: '📋' },
          { label: 'Scheduled Tours', icon: '🚶‍♂️' },
          { label: 'Direct Payments', icon: '💳' }
        ].map((faq) => (
          <div key={faq.label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors flex items-center gap-3">
            <span className="text-xl">{faq.icon}</span>
            <span className="font-bold text-xs text-slate-900">{faq.label}</span>
          </div>
        ))}
      </div>

      {/* New ticket form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm animate-fade-in">
          <h3 className="font-extrabold text-sm text-slate-900">Submit a Support Ticket</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject</label>
              <input
                type="text"
                placeholder="Brief summary of your inquiry..."
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#018F8B]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none bg-white focus:border-[#018F8B]">
                <option value="">Select a category...</option>
                <option>Escrow & Payments</option>
                <option>Booking Confirmation</option>
                <option>Physical Viewing Tours</option>
                <option>Identity & KYC</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe what you need help with..."
                className="w-full p-3 border border-slate-200 rounded-xl resize-none outline-none focus:border-[#018F8B]"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-[#0B2545] text-white font-bold">
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No Support Tickets Open</p>
            <p>Need help with a payment, tour, or landlord question? Click "Open Support Ticket" above.</p>
          </div>
        ) : (
          tickets.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">#{t.id} • {t.submittedDate}</span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{t.subject}</h4>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{t.category}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[t.status]}`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                "{t.message}"
              </p>

              {t.adminReply && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-xs space-y-1">
                  <span className="font-bold text-[#018F8B] block">Support Reply:</span>
                  <p className="text-slate-700">{t.adminReply}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
