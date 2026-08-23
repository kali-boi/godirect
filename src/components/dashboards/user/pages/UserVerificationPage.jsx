import React from 'react';
import { ShieldCheck, Upload, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function UserVerificationPage() {
  const steps = [
    {
      id: 1,
      label: 'Email Verified',
      desc: 'Your email address is confirmed.',
      status: 'done',
      date: 'Jan 15, 2024'
    },
    {
      id: 2,
      label: 'Phone Number Verified',
      desc: 'Mobile number confirmed via OTP.',
      status: 'done',
      date: 'Jan 15, 2024'
    },
    {
      id: 3,
      label: 'Government-Issued ID',
      desc: "Upload a valid passport, national ID, or driver's licence.",
      status: 'done',
      date: 'Jan 20, 2024',
      docType: 'UK Passport'
    },
    {
      id: 4,
      label: 'Address Verification',
      desc: 'Upload a utility bill or bank statement dated within 90 days.',
      status: 'pending',
      date: null,
      docType: null
    },
    {
      id: 5,
      label: 'Tier 3 Enhanced Verification',
      desc: 'Required for bookings above $10,000. A GoDirect agent will contact you.',
      status: 'not_started',
      date: null,
      docType: null
    }
  ];

  const statusConfig = {
    done: { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2, label: 'Verified' },
    pending: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Clock, label: 'Action Required' },
    not_started: { color: 'text-slate-400', bg: 'bg-slate-100 border-slate-200', icon: AlertTriangle, label: 'Not Started' }
  };

  const completedSteps = steps.filter(s => s.status === 'done').length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Identity Verification</h2>
        <p className="text-xs text-slate-500 mt-1">Verify your identity to unlock full platform access and higher-value bookings.</p>
      </div>

      {/* Current Tier Card */}
      <div className="bg-[#0B2545] text-white rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold text-white/50 uppercase tracking-wider">Current Status</p>
            <h3 className="text-xl font-black mt-1">Tier 2 — Verified Renter</h3>
            <p className="text-xs text-white/60 mt-1">Bookings up to $9,999 enabled. Complete Tier 3 for unlimited access.</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">{completedSteps} of {steps.length} steps complete</span>
            <span className="font-bold text-amber-400">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const config = statusConfig[step.status];
          const Icon = config.icon;
          return (
            <div key={step.id} className={`bg-white p-5 rounded-2xl border shadow-sm ${step.status === 'pending' ? 'border-amber-200' : 'border-slate-200'}`}>
              <div className="flex items-start gap-4">
                {/* Step number + icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{step.label}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                  {step.status === 'done' && (
                    <p className="text-[11px] text-emerald-600 font-bold">✓ Completed {step.date}{step.docType ? ` — ${step.docType}` : ''}</p>
                  )}
                </div>
              </div>

              {/* Action for pending */}
              {step.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#0B2545] cursor-pointer text-slate-500 hover:text-[#0B2545] text-xs font-bold transition-all group">
                    <Upload className="w-4 h-4" />
                    Upload Proof of Address
                    <input type="file" className="hidden" />
                  </label>
                  <p className="text-[10px] text-slate-400 text-center mt-1.5">Accepted: PDF, JPG, PNG • Max 5MB</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
