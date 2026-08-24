import React from 'react';
import { ShieldCheck, Upload, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';

export default function UserVerificationPage() {
  const { user, profile } = useAuth();

  const isEmailVerified = Boolean(user?.email);
  const isPhoneVerified = Boolean(profile?.phone || user?.user_metadata?.phone);
  const isKycVerified = profile?.kyc_status === 'verified';

  const steps = [
    {
      id: 1,
      label: 'Email Verified',
      desc: user?.email ? `Confirmed as ${user.email}` : 'Confirm your active email address.',
      status: isEmailVerified ? 'done' : 'pending'
    },
    {
      id: 2,
      label: 'Phone Number Verified',
      desc: isPhoneVerified ? `Linked: ${profile?.phone || user?.user_metadata?.phone}` : 'Add and confirm your phone number in Profile Settings.',
      status: isPhoneVerified ? 'done' : 'pending'
    },
    {
      id: 3,
      label: 'Government-Issued Identity (NIN / Passport / Driver License)',
      desc: isKycVerified ? 'Identity document verified by GoDirect compliance team.' : 'Upload a government-issued photo ID for AML compliance.',
      status: isKycVerified ? 'done' : 'pending'
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
    <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Identity & KYC Verification</h2>
        <p className="text-xs text-slate-500 mt-1">Verify your identity to unlock direct escrow bookings and escorted property tours.</p>
      </div>

      {/* Current Tier Card */}
      <div className="bg-[#0B2545] text-white rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold text-[#CC9955] uppercase tracking-wider">Account Trust Tier</p>
            <h3 className="text-xl font-black mt-1">
              {isKycVerified ? 'Tier 2 — Verified Direct Renter' : 'Tier 1 — Member'}
            </h3>
            <p className="text-xs text-white/70 mt-1">
              {isKycVerified
                ? 'Full escrow booking & agent-escorted inspection access enabled.'
                : 'Complete all steps to unlock escrow protections and instant booking.'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-[#CC9955] flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-[#CC9955]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">{completedSteps} of {steps.length} steps complete</span>
            <span className="font-bold text-[#CC9955]">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#CC9955] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const config = statusConfig[step.status];
          const Icon = config.icon;
          return (
            <div key={step.id} className={`bg-white p-5 rounded-2xl border shadow-sm ${step.status === 'pending' ? 'border-amber-200' : 'border-slate-200'}`}>
              <div className="flex items-start gap-4">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
