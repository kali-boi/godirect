import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle2, AlertTriangle, PlusCircle } from 'lucide-react';

export default function LandlordMaintenancePage() {
  const [tasks, setTasks] = useState([
    {
      id: 'maint-001',
      property: 'The Skyview Horizon Penthouse',
      title: 'Rooftop Pool Heating System Repair',
      description: 'Pool heating unit fault reported by guest Dr. Julian Thorne. Contractor scheduled for 25 Aug 2026.',
      category: 'Plumbing / HVAC',
      cost: '$840',
      reportedDate: '20 Aug 2026',
      scheduledDate: '25 Aug 2026',
      status: 'scheduled',
      priority: 'High'
    },
    {
      id: 'maint-002',
      property: 'The Azure Waterfront Villa',
      title: 'Bulthaup Kitchen Island Surface Chip',
      description: 'Minor surface chip on the kitchen island noted during post-stay inspection.',
      category: 'Interior / Furniture',
      cost: '$320',
      reportedDate: '18 Aug 2026',
      scheduledDate: '30 Aug 2026',
      status: 'pending',
      priority: 'Low'
    },
    {
      id: 'maint-003',
      property: 'The Skyview Horizon Penthouse',
      title: 'Smart Home System Software Update',
      description: 'Annual Lutron smart lighting system update completed by certified technician.',
      category: 'Technology',
      cost: '$0',
      reportedDate: '10 Aug 2026',
      scheduledDate: '10 Aug 2026',
      status: 'completed',
      priority: 'Low'
    }
  ]);

  const statusColors = {
    scheduled: 'bg-blue-50 text-blue-800 border-blue-200',
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    completed: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };
  const priorityColors = { High: 'text-rose-600 bg-rose-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-slate-600 bg-slate-100' };

  const complete = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Maintenance & Inspections</h2>
          <p className="text-xs text-slate-500 mt-1">Track repair requests, contractor visits, costs, and post-stay inspection logs.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
          <PlusCircle className="w-4 h-4" />
          Log Issue
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Issues', value: tasks.filter(t => t.status !== 'completed').length, color: 'text-amber-600', icon: AlertTriangle },
          { label: 'Scheduled', value: tasks.filter(t => t.status === 'scheduled').length, color: 'text-blue-600', icon: Clock },
          { label: 'Total Maintenance Cost', value: `$${tasks.reduce((a, t) => a + parseInt(t.cost.replace('$', '') || 0), 0).toLocaleString()}`, color: 'text-slate-900', icon: Wrench }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Maintenance Tasks */}
      <div className="space-y-4">
        {tasks.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{t.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[t.priority]}`}>{t.priority}</span>
                </div>
                <p className="text-xs text-slate-500">{t.property} • Category: {t.category}</p>
                <p className="text-xs text-slate-400">Reported: {t.reportedDate} • Scheduled: {t.scheduledDate} • Cost: <strong className="text-slate-700">{t.cost}</strong></p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${statusColors[t.status]}`}>
                {t.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              {t.description}
            </p>
            {t.status !== 'completed' && (
              <button onClick={() => complete(t.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                Mark as Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
