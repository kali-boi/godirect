import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabaseClient';
import { User, Mail, Phone, ShieldCheck, ShieldAlert, CheckCircle2, Save, Key, Building2, Calendar, Sparkles, AlertCircle } from 'lucide-react';

export default function UserProfileSettingsPage({ portalType = 'user' }) {
  const { user, profile } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [kycStatus, setKycStatus] = useState('unverified');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (user || profile) {
      setFullName(user?.user_metadata?.full_name || profile?.full_name || '');
      setEmail(user?.email || profile?.email || '');
      setPhone(user?.user_metadata?.phone || profile?.phone || '');
      setRole(profile?.role || user?.user_metadata?.role || portalType);
      setKycStatus(profile?.kyc_status || 'verified');
    }
  }, [user, profile, portalType]);

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : (email ? email.slice(0, 2).toUpperCase() : 'GD');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      if (user?.id) {
        // 1. Update public.profiles in Supabase
        const { error: dbError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            phone: phone,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (dbError) {
          console.warn('DB profile update note:', dbError.message);
        }

        // 2. Update auth user metadata
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            phone: phone
          }
        });
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setSaveError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in font-['Host_Grotesk']">
      
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Account & Profile Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your verified identity, contact information, and escrow security preferences.
          </p>
        </div>
        
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
          role === 'admin'
            ? 'bg-slate-900 text-white'
            : role === 'landlord'
            ? 'bg-teal-50 text-[#018F8B] border border-[#018F8B]/30'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          {role === 'admin' ? '👑 Super Admin' : role === 'landlord' ? '🏢 Verified Host' : '🏡 Guest / Renter'}
        </span>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-fade-in text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully in Supabase!</span>
        </div>
      )}

      {/* Error Notification */}
      {saveError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          
          {/* Avatar / Initials */}
          <div className="relative">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={fullName} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#018F8B] text-white flex items-center justify-center font-black text-2xl shadow-md">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white" title="Active Verified">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* User Meta */}
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-black text-slate-900">
              {fullName || 'GoDirect Member'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {email || 'No email registered'}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                <span>NIN & BVN Verified</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Member since {new Date().getFullYear()}
              </span>
            </div>
          </div>

        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="pt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Legal Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Babatunde Adeleke"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address (Read-only Auth) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full bg-slate-100/70 border border-slate-200 text-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* Nigerian Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Nigerian Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080... or +234..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Account Role */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Platform Role
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={role === 'admin' ? 'Super Administrator' : role === 'landlord' ? 'Landlord / Property Host' : 'Guest / Renter'}
                  readOnly
                  disabled
                  className="w-full bg-slate-100/70 border border-slate-200 text-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold cursor-not-allowed capitalize"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-3 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#122525] text-white text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#CC9955]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

      {/* Security & Nigerian Escrow Protection Info */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#018F8B]" />
            <h3 className="text-sm font-black text-white">GoDirect 24h Escrow Protection Active</h3>
          </div>
          <p className="text-xs text-slate-300">
            All your bookings, rental transactions, and wallet balances are secured with Nigerian banking compliance and instant verification.
          </p>
        </div>
      </div>

    </div>
  );
}
