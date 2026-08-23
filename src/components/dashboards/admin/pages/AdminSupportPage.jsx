import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-501',
      subject: 'Unable to release escrow after stay',
      user: 'Alexander Wright',
      email: 'alex.wright@email.com',
      category: 'Escrow',
      priority: 'High',
      status: 'open',
      createdDate: '23 Aug 2026, 10:15',
      lastMessage: "I checked out 2 days ago and the funds are still not released."
    },
    {
      id: 'TKT-502',
      subject: 'Listing not showing in search results',
      user: 'Eleanor Vance',
      email: 'eleanor.vance@godirect-vip.com',
      category: 'Listing',
      priority: 'Medium',
      status: 'in_progress',
      createdDate: '22 Aug 2026, 09:30',
      lastMessage: "My Mayfair penthouse listing was verified but does not appear on search."
    },
    {
      id: 'TKT-503',
      subject: 'Refund not processed after cancellation',
      user: 'Amara Al-Zahra',
      email: 'amara@email.ae',
      category: 'Payments',
      priority: 'High',
      status: 'open',
      createdDate: '21 Aug 2026, 15:45',
      lastMessage: "I cancelled within the 24h window but my refund has not come."
    },
    {
      id: 'TKT-504',
      subject: 'Cannot upload property images',
      user: 'Lord George Sterling',
      email: 'george@sterlingestates.co.uk',
      category: 'Technical',
      priority: 'Low',
      status: 'resolved',
      createdDate: '18 Aug 2026, 12:00',
      lastMessage: "The issue was resolved after clearing browser cache. Thanks!"
    }
  ]);

  const priorityColors = { High: 'text-rose-600 bg-rose-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-slate-600 bg-slate-100' };
  const statusColors = {
    open: 'bg-rose-50 text-rose-800 border-rose-200',
    in_progress: 'bg-amber-50 text-amber-800 border-amber-200',
    resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  const resolve = (id) => setTickets(tickets.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
  const progress = (id) => setTickets(tickets.map(t => t.id === id ? { ...t, status: 'in_progress' } : t));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Support Tickets</h2>
        <p className="text-xs text-slate-500 mt-1">Manage user and host support requests across all ticket categories.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Open Tickets', value: tickets.filter(t => t.status === 'open').length, color: 'text-rose-600', icon: MessageSquare },
          { label: 'In Progress', value: tickets.filter(t => t.status === 'in_progress').length, color: 'text-amber-600', icon: Clock },
          { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, color: 'text-emerald-600', icon: CheckCircle2 }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{t.subject}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[t.priority]}`}>
                    {t.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{t.user} ({t.email}) • Category: {t.category} • {t.createdDate}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${statusColors[t.status]}`}>
                {t.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
              "{t.lastMessage}"
            </p>

            {t.status !== 'resolved' && (
              <div className="flex items-center gap-2 pt-1">
                {t.status === 'open' && (
                  <button onClick={() => progress(t.id)} className="px-3.5 py-1.5 rounded-xl border border-amber-300 text-amber-700 text-xs font-bold">
                    Mark In Progress
                  </button>
                )}
                <button onClick={() => resolve(t.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                  Resolve Ticket
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
