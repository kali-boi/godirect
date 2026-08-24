import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ShieldCheck, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Zap,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'signin',
  onAuthSuccess 
}) {
  const { signInWithPassword, signUpWithRole } = useAuth();
  
  const [mode, setMode] = useState(initialMode);
  const [selectedRole, setSelectedRole] = useState('user');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // All hooks above — safe to early return now
  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { score: 2, label: 'Good', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full legal name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please agree to GoDirect terms and escrow safety policies.');
        return;
      }

      setLoading(true);
      const res = await signUpWithRole(email, password, fullName, selectedRole, phone);
      setLoading(false);

      if (!res.success) {
        // If Supabase returns an error, show message
        setErrorMsg(res.error || 'Failed to create account.');
      } else {
        setSuccessMsg('Account created successfully! Redirecting to your dashboard...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(selectedRole);
          onClose();
        }, 1500);
      }
    } else if (mode === 'signin') {
      setLoading(true);
      const res = await signInWithPassword(email, password);
      setLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || 'Invalid email or password.');
      } else {
        setSuccessMsg('Signed in successfully! Redirecting...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(res.profile?.role || 'user');
          onClose();
        }, 1200);
      }
    } else if (mode === 'forgot') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg('Password reset instructions have been sent to your email.');
      }, 1000);
    }
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-['Host_Grotesk'] overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto space-y-5 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1 pt-1">
          <img src="/images/logo.png" alt="GoDirect" className="h-8 w-auto mx-auto object-contain" />
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'signup' ? 'Create GoDirect Account' : mode === 'signin' ? 'Welcome Back to GoDirect' : 'Reset Your Password'}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'signup' 
              ? 'Join Nigeria’s direct property platform with 24h Escrow Protection.'
              : mode === 'signin'
              ? 'Access your saved properties, bookings, or landlord wallet.'
              : 'Enter your registered email address to receive a recovery link.'}
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Sign Up) */}
        {mode !== 'forgot' && (
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                mode === 'signin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register Account
            </button>
          </div>
        )}

        {/* Alerts */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ─── ROLE SELECTOR (ONLY ON SIGNUP) ─── */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedRole === 'user'
                      ? 'border-[#018F8B] bg-teal-50/50 ring-2 ring-[#018F8B]/20 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className={`w-4 h-4 ${selectedRole === 'user' ? 'text-[#018F8B]' : 'text-slate-400'}`} />
                    <span className="font-black text-xs">Guest / Renter</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">Book short-lets & rent direct</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('landlord')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedRole === 'landlord'
                      ? 'border-[#018F8B] bg-teal-50/50 ring-2 ring-[#018F8B]/20 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className={`w-4 h-4 ${selectedRole === 'landlord' ? 'text-[#018F8B]' : 'text-slate-400'}`} />
                    <span className="font-black text-xs">Landlord / Host</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">List properties & earn in wallet</p>
                </button>
              </div>
            </div>
          )}

          {/* Full Name (Sign Up only) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Babatunde Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20"
                required
              />
            </div>
          </div>

          {/* Nigerian Phone Number (Sign Up only) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block">Nigerian Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20"
                />
              </div>
            </div>
          )}

          {/* Password (Sign In & Sign Up) */}
          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold uppercase text-slate-400 block">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-[10px] font-bold text-[#018F8B] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator on Signup */}
              {mode === 'signup' && password && (
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className="font-extrabold text-slate-700">{strength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirm Password (Sign Up only) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20"
                  required
                />
              </div>
            </div>
          )}

          {/* Terms Agreement (Sign Up only) */}
          {mode === 'signup' && (
            <label className="flex items-start gap-2 text-[11px] text-slate-500 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 accent-[#018F8B] rounded"
              />
              <span>
                I agree to GoDirect's <strong className="text-slate-800">Terms of Service</strong>, <strong className="text-slate-800">Privacy Policy</strong>, and <strong className="text-slate-800">24h Escrow Protection Rules</strong>.
              </span>
            </label>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#018F8B] via-[#0B2545] to-[#122525] text-white text-xs font-black shadow-lg shadow-[#018F8B]/20 hover:opacity-95 transition-all transform active:scale-98 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{mode === 'signup' ? 'Complete Registration' : mode === 'signin' ? 'Sign In to Account' : 'Send Recovery Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Back to sign in from forgot password */}
          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 py-1"
            >
              ← Back to Sign In
            </button>
          )}

        </form>

      </div>
    </div>
  );
}
