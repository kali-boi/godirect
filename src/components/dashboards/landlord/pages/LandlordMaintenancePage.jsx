import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle2, AlertTriangle, PlusCircle } from 'lucide-react';

export default function LandlordMaintenancePage() {
  const [tasks, setTasks] = useState([]);

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
          Log Maintenance Task
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Tasks', value: tasks.filter(t => t.status === 'pending').length, icon: Clock, color: 'text-amber-600' },
          { label: 'Scheduled Visits', value: tasks.filter(t => t.status === 'scheduled').length, icon: Wrench, color: 'text-blue-600' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2, color: 'text-emerald-600' }
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

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No maintenance tasks or repair logs recorded. All verified properties are fully inspected and operational.
          </div>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{t.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[t.priority]}`}>
                      {t.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{t.property} • Category: {t.category}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[t.status]}`}>
                    {t.status}
                  </span>
                  <span className="font-black text-sm text-slate-900">{t.cost}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                "{t.description}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400">Scheduled Date: {t.scheduledDate}</span>
                {t.status !== 'completed' && (
                  <button onClick={() => complete(t.id)} className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
