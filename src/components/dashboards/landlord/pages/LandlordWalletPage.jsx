import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  CreditCard, 
  Download, 
  Plus, 
  Lock, 
  Percent, 
  X,
  Zap,
  Smartphone,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { getUserWallet, getBankAccounts, addBankAccount, requestWithdrawal } from '../../../../services/supabaseService';
import { supabase } from '../../../../lib/supabaseClient';

export default function LandlordWalletPage() {
  const { user, profile } = useAuth();

  // Currency Toggle: NGN (Default) or USD
  const [currency, setCurrency] = useState('NGN'); // 'NGN' | 'USD'
  const exchangeRate = 1620; // 1 USD = 1,620 NGN

  // Wallet Balances in NGN
  const [availableBalanceNGN, setAvailableBalanceNGN] = useState(0);
  const [escrowPendingNGN, setEscrowPendingNGN] = useState(0);
  const [totalLifetimePaidNGN, setTotalLifetimePaidNGN] = useState(0);
  const [platformFeesPaidNGN, setPlatformFeesPaidNGN] = useState(0);
  const [loading, setLoading] = useState(true);

  // Linked NUBAN Nigerian Bank Accounts
  const [bankAccounts, setBankAccounts] = useState([]);

  // Load live wallet and bank accounts from Supabase
  useEffect(() => {
    if (user?.id) {
      // 1. Fetch wallet
      getUserWallet(user.id).then((wallet) => {
        if (wallet) {
          setAvailableBalanceNGN(wallet.available_balance || 0);
          setEscrowPendingNGN(wallet.escrow_locked_balance || 0);
          setTotalLifetimePaidNGN(wallet.total_withdrawn || 0);
          setPlatformFeesPaidNGN(Math.round((wallet.total_withdrawn || 0) * 0.05));
        }
      });

      // 2. Fetch bank accounts
      getBankAccounts(user.id).then((accounts) => {
        if (accounts && accounts.length > 0) {
          setBankAccounts(accounts);
          setSelectedBankId(accounts[0].id);
        } else {
          setBankAccounts([]);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  // Withdrawal Modal State
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedBankId, setSelectedBankId] = useState('');
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState('');
  const [isProcessingWithdrawal, setIsProcessingWithdrawal] = useState(false);

  // Add Bank Modal State
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [newBankForm, setNewBankForm] = useState({
    bankCode: '058',
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '',
    accountName: '',
    isVerifyingNuban: false,
    verifiedSuccessfully: false
  });

  // Nigerian Commercial Banks List
  const nigerianBanksList = [
    { code: '058', name: 'Guaranty Trust Bank (GTBank)' },
    { code: '044', name: 'Access Bank' },
    { code: '057', name: 'Zenith Bank' },
    { code: '011', name: 'First Bank of Nigeria' },
    { code: '039', name: 'Stanbic IBTC Bank' },
    { code: '101', name: 'Providus Bank' },
    { code: '50211', name: 'Kuda Microfinance Bank' },
    { code: '999992', name: 'OPay Digital Services' },
    { code: '999991', name: 'PalmPay' },
    { code: '033', name: 'United Bank for Africa (UBA)' }
  ];

  // Escrow Pipeline Items (Live from Supabase)
  const [escrowBookings, setEscrowBookings] = useState([]);

  // Nigerian Financial Statement Ledger (Live from Supabase)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user?.id) {
      // 1. Fetch wallet
      getUserWallet(user.id).then((wallet) => {
        if (wallet) {
          setAvailableBalanceNGN(wallet.available_balance || 0);
          setEscrowPendingNGN(wallet.escrow_locked_balance || 0);
          setTotalLifetimePaidNGN(wallet.total_withdrawn || 0);
          setPlatformFeesPaidNGN(Math.round((wallet.total_withdrawn || 0) * 0.05));
        }
      });

      // 2. Fetch bank accounts
      getBankAccounts(user.id).then((accounts) => {
        if (accounts && accounts.length > 0) {
          setBankAccounts(accounts);
          setSelectedBankId(accounts[0].id);
        } else {
          setBankAccounts([]);
        }
        setLoading(false);
      });

      // 3. Fetch escrows
      getEscrowTransactions(user.id).then((escrows) => {
        if (escrows && escrows.length > 0) {
          setEscrowBookings(escrows.map(e => ({
            id: e.id,
            bookingId: e.booking_id || e.id,
            property: e.bookings?.properties?.title || 'Verified Property',
            location: e.bookings?.properties?.location || 'Lagos, Nigeria',
            guestName: e.bookings?.profiles?.full_name || 'Verified Guest',
            guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            grossAmountNGN: Number(e.amount || 0),
            platformCutRate: 5,
            platformFeeNGN: Math.round(Number(e.amount || 0) * 0.05),
            netToHostNGN: Math.round(Number(e.amount || 0) * 0.95),
            checkInDate: 'Scheduled',
            inspectionWindowRemaining: '24 hours inspection window',
            status: e.status,
            gateway: 'Direct Escrow Vault'
          })));
        } else {
          setEscrowBookings([]);
        }
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  // Helper Formatter
  const formatMoney = (amountNGN) => {
    if (currency === 'USD') {
      const valUSD = amountNGN / exchangeRate;
      return `$${valUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₦${amountNGN.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Simulate Instant NUBAN Name Lookup
  const handleVerifyNuban = () => {
    if (newBankForm.accountNumber.length !== 10) {
      alert('Please enter a valid 10-digit NUBAN account number.');
      return;
    }

    setNewBankForm(prev => ({ ...prev, isVerifyingNuban: true }));

    setTimeout(() => {
      const liveName = (user?.user_metadata?.full_name || profile?.full_name || 'Verified Direct Landlord').toUpperCase();
      setNewBankForm(prev => ({
        ...prev,
        isVerifyingNuban: false,
        accountName: liveName,
        verifiedSuccessfully: true
      }));
    }, 800);
  };

  // Handle Withdrawal Submission via Paystack/NIP Transfer
  const handleExecuteWithdrawal = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }

    const maxAllowed = currency === 'USD' ? availableBalanceNGN / exchangeRate : availableBalanceNGN;
    if (amountNum > maxAllowed) {
      alert('Withdrawal amount exceeds your available wallet balance.');
      return;
    }

    const amountInNGN = currency === 'USD' ? amountNum * exchangeRate : amountNum;
    const selectedBankObj = bankAccounts.find(b => b.id === selectedBankId) || bankAccounts[0] || {
      bankName: 'Guaranty Trust Bank',
      accountNumber: '0123456789'
    };

    setIsProcessingWithdrawal(true);

    try {
      if (user?.id) {
        await requestWithdrawal(user.id, amountInNGN, selectedBankObj.id);
      }

      // Deduct from available balance
      setAvailableBalanceNGN(prev => prev - amountInNGN);
      setTotalLifetimePaidNGN(prev => prev + amountInNGN);

      // Record in ledger
      const newTxn = {
        id: `TXN-NG-${Math.floor(10000 + Math.random() * 90000)}`,
        type: 'debit',
        title: `NIP Transfer to ${selectedBankObj.bankName || selectedBankObj.bank_name} (${selectedBankObj.accountNumber || selectedBankObj.account_number})`,
        date: 'Just now',
        grossNGN: amountInNGN,
        feeNGN: 0,
        netNGN: -amountInNGN,
        status: 'Completed',
        category: 'NUBAN Payout',
        reference: `NIP-${Date.now().toString().slice(-6)}`,
        payoutBank: `${selectedBankObj.bankName || selectedBankObj.bank_name}`
      };

      setTransactions([newTxn, ...transactions]);
      setWithdrawSuccessMsg(`Payout of ${formatMoney(amountInNGN)} dispatched successfully to ${selectedBankObj.bankName || selectedBankObj.bank_name} (${selectedBankObj.accountNumber || selectedBankObj.account_number}) via Paystack / NIP.`);
      setWithdrawAmount('');

      setTimeout(() => {
        setIsWithdrawModalOpen(false);
        setWithdrawSuccessMsg('');
      }, 2500);
    } catch (err) {
      console.warn('Withdrawal error:', err);
    } finally {
      setIsProcessingWithdrawal(false);
    }
  };

  // Simulate Instant Escrow Release (Demonstrating check-in verification)
  const handleSimulateEscrowRelease = (escrowId) => {
    const target = escrowBookings.find(e => e.id === escrowId);
    if (!target) return;

    // Credit host wallet
    setAvailableBalanceNGN(prev => prev + target.netToHostNGN);
    setEscrowPendingNGN(prev => Math.max(0, prev - target.grossAmountNGN));
    setPlatformFeesPaidNGN(prev => prev + target.platformFeeNGN);

    // Add credit to ledger
    const newCredit = {
      id: `TXN-NG-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'credit',
      title: `Escrow Released: ${target.property} (${target.guestName})`,
      date: 'Just now',
      grossNGN: target.grossAmountNGN,
      feeNGN: target.platformFeeNGN,
      netNGN: target.netToHostNGN,
      status: 'Completed',
      category: 'Booking Settlement',
      reference: target.id,
      payoutBank: 'Wallet Cleared'
    };

    setTransactions([newCredit, ...transactions]);
    setEscrowBookings(escrowBookings.filter(e => e.id !== escrowId));
  };

  return (
    <div className="space-y-8 animate-fade-in font-['Host_Grotesk']">
      
      {/* ─── NIGERIAN FINANCIAL HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0B2545] via-[#122525] to-[#018F8B] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇳🇬</span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#CC9955]">
              Nigerian Escrow & NUBAN Settlement System
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Host Wallet & Payouts
          </h2>
          <p className="text-xs text-slate-200/90 max-w-xl">
            Guest payments vaulted securely upon booking. Once the 24-hour post check-in verification passes, the 5% platform fee is deducted and net funds drop instantly into your wallet for NUBAN bank withdrawal.
          </p>
        </div>

        {/* Action Controls & Currency Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Dual Currency Pill */}
          <div className="flex items-center bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20">
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                currency === 'NGN' ? 'bg-[#CC9955] text-slate-950 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              ₦ NGN
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                currency === 'USD' ? 'bg-[#018F8B] text-white shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>

          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#CC9955] to-[#e6b366] text-slate-950 text-xs font-black shadow-md transition-all duration-200 transform active:scale-95 hover:opacity-95"
          >
            <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Withdraw to NUBAN</span>
          </button>
        </div>
      </div>

      {/* ─── 4 METRIC CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Available Balance */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Available to Withdraw</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {formatMoney(availableBalanceNGN)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cleared for instant NIP transfer</span>
          </div>
        </div>

        {/* 2. Pending In Escrow */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Locked in Escrow</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {formatMoney(escrowPendingNGN)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{escrowBookings.length} bookings undergoing 24h verification</span>
          </div>
        </div>

        {/* 3. Platform Cut Summary */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Platform Take Rate</span>
            <div className="w-8 h-8 rounded-full bg-teal-50 text-[#018F8B] border border-teal-200 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            5.0% <span className="text-xs font-normal text-slate-400">flat fee</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span>{formatMoney(platformFeesPaidNGN)} settled YTD</span>
          </div>
        </div>

        {/* 4. Total Lifetime Paid Out */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total Payouts</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {formatMoney(totalLifetimePaidNGN)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span>Disbursed to Nigerian Bank NUBAN</span>
          </div>
        </div>

      </div>

      {/* ─── LIVE ESCROW VERIFICATION PIPELINE ─── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#018F8B]" />
              <h3 className="font-extrabold text-base text-slate-900">Live Escrow Pipeline (Nigeria Vault)</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Guest funds are secured upon checkout via Paystack/Flutterwave. You have full transparency on gross paid, 5% GoDirect platform fee, and net payout.
            </p>
          </div>
          
          <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            {escrowBookings.length} Active Escrow Vaults
          </span>
        </div>

        {escrowBookings.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs font-bold">
            All escrowed funds have been verified and credited to your available NUBAN wallet balance!
          </div>
        ) : (
          <div className="space-y-4">
            {escrowBookings.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-4">
                
                {/* Upper Details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img src={item.guestAvatar} alt={item.guestName} className="w-12 h-12 rounded-2xl object-cover border border-white shadow-xs" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-sm text-slate-900">{item.property}</h4>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{item.id}</span>
                        <span className="text-[10px] font-bold bg-[#018F8B]/10 text-[#018F8B] px-2 py-0.5 rounded-full">{item.gateway}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Guest: <strong className="text-slate-800">{item.guestName}</strong> • {item.location} • Check-in: {item.checkInDate}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-extrabold">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{item.inspectionWindowRemaining}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Math Breakdown (Gross -> 5% Cut -> Net Credit) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200/80 text-xs items-center">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Gross Guest Paid</span>
                    <span className="font-black text-sm text-slate-900">{formatMoney(item.grossAmountNGN)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-rose-500 block">GoDirect Cut ({item.platformCutRate}%)</span>
                    <span className="font-black text-sm text-rose-600">-{formatMoney(item.platformFeeNGN)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 block">Net Dropping to Wallet</span>
                    <span className="font-black text-sm text-emerald-700">+{formatMoney(item.netToHostNGN)}</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleSimulateEscrowRelease(item.id)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black shadow-xs transition-all flex items-center gap-1"
                      title="Simulate 24h inspection completion & credit wallet"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Verify & Release</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── LINKED NIGERIAN NUBAN BANK ACCOUNTS ─── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-slate-700" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Linked Nigerian NUBAN Accounts</h3>
              <p className="text-[11px] text-slate-400">Withdrawals are processed automatically via NIP instant settlement.</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddBankModalOpen(true)}
            className="flex items-center gap-1 text-xs font-bold text-[#018F8B] hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Bank Account</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bankAccounts.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">{b.bankName}</span>
                {b.isDefault && (
                  <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-sm font-mono font-black text-slate-800 tracking-wider">{b.accountNumber}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{b.accountName}</p>
              
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> NUBAN Verified
                </span>
                <span className="text-slate-400 font-normal">{b.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── TRANSACTION LEDGER & NIP PAYOUT HISTORY ─── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Wallet Statement & Payout Ledger</h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time ledger of verified escrow releases, 5% platform cuts, and NIP bank payouts.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Statement</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((txn) => {
            const isCredit = txn.type === 'credit';
            return (
              <div key={txn.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-all">
                
                {/* Left Icon & Title */}
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    isCredit ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {isCredit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{txn.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {txn.date} • Ref: <span className="font-mono">{txn.reference}</span>
                    </p>
                  </div>
                </div>

                {/* Right Amount & Status */}
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between gap-1">
                  <div className={`text-sm font-black ${isCredit ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {isCredit ? `+${formatMoney(txn.netNGN)}` : `-${formatMoney(Math.abs(txn.netNGN))}`}
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                    {txn.status}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ─── MODAL: PLACE WITHDRAWAL (NIP / NUBAN) ─── */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-fade-in relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#018F8B]/10 text-[#018F8B] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">NUBAN Direct Withdrawal</h3>
              </div>
              <button onClick={() => setIsWithdrawModalOpen(false)} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            {withdrawSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-extrabold text-emerald-900">{withdrawSuccessMsg}</p>
                <p className="text-[11px] text-emerald-700">Funds will reflect in your Nigerian bank account within minutes via NIP.</p>
              </div>
            ) : (
              <form onSubmit={handleExecuteWithdrawal} className="space-y-4">
                
                {/* Available Balance Helper */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Available Wallet Balance</span>
                  <span className="font-black text-slate-900">{formatMoney(availableBalanceNGN)}</span>
                </div>

                {/* Amount Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Withdrawal Amount ({currency === 'USD' ? '$ USD' : '₦ NGN'})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                      {currency === 'USD' ? '$' : '₦'}
                    </span>
                    <input
                      type="number"
                      step="any"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pl-8 pr-16 py-3 rounded-xl border border-slate-200 text-sm font-black text-slate-900 outline-none focus:border-[#018F8B] focus:ring-2 focus:ring-[#018F8B]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount((currency === 'USD' ? availableBalanceNGN / exchangeRate : availableBalanceNGN).toString())}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-[10px] font-extrabold hover:bg-slate-300"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {/* Destination Bank Account Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Destination NUBAN Account
                  </label>
                  <div className="space-y-2">
                    {bankAccounts.map((b) => (
                      <label
                        key={b.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedBankId === b.id ? 'border-[#018F8B] bg-teal-50/40 text-slate-900' : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-xs">
                          <input
                            type="radio"
                            name="payoutMethod"
                            checked={selectedBankId === b.id}
                            onChange={() => setSelectedBankId(b.id)}
                            className="accent-[#018F8B]"
                          />
                          <div>
                            <span className="font-bold block">{b.bankName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{b.accountNumber} • {b.accountName}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notice */}
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Payouts are settled instantly via Paystack Transfer API / NIBSS Instant Payment (NIP). ₦0 transfer fee deducted by GoDirect.
                </p>

                {/* Submit Action */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessingWithdrawal}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#018F8B] to-[#0B2545] text-white text-xs font-black shadow-md hover:opacity-95 flex items-center justify-center gap-2"
                  >
                    {isProcessingWithdrawal ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing NIP...</span>
                      </>
                    ) : (
                      <span>Disburse Payout</span>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* ─── MODAL: LINK NIGERIAN NUBAN ACCOUNT ─── */}
      {isAddBankModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Link Nigerian Bank Account</h3>
              <button onClick={() => setIsAddBankModalOpen(false)} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Select Bank */}
              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Select Bank</label>
                <select
                  value={newBankForm.bankCode}
                  onChange={(e) => {
                    const selected = nigerianBanksList.find(b => b.code === e.target.value);
                    setNewBankForm({
                      ...newBankForm,
                      bankCode: e.target.value,
                      bankName: selected?.name || '',
                      verifiedSuccessfully: false
                    });
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#018F8B] bg-white font-bold text-slate-800"
                >
                  {nigerianBanksList.map((bank) => (
                    <option key={bank.code} value={bank.code}>{bank.name}</option>
                  ))}
                </select>
              </div>

              {/* 10-Digit NUBAN Input */}
              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">10-Digit NUBAN Account Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="0123456789"
                    value={newBankForm.accountNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setNewBankForm({ ...newBankForm, accountNumber: val, verifiedSuccessfully: false, accountName: '' });
                    }}
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold outline-none focus:border-[#018F8B]"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyNuban}
                    disabled={newBankForm.accountNumber.length !== 10 || newBankForm.isVerifyingNuban}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800 disabled:opacity-50"
                  >
                    {newBankForm.isVerifyingNuban ? 'Verifying...' : 'Lookup Name'}
                  </button>
                </div>
              </div>

              {/* Verified Account Name Display */}
              {newBankForm.verifiedSuccessfully && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Account Verified
                  </span>
                  <p className="text-xs font-black text-emerald-950 font-mono">{newBankForm.accountName}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddBankModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newBankForm.verifiedSuccessfully}
                onClick={async () => {
                  const newAcc = {
                    id: `bank-${Date.now()}`,
                    userId: user?.id,
                    bankName: newBankForm.bankName,
                    bankCode: newBankForm.bankCode,
                    accountNumber: newBankForm.accountNumber,
                    accountName: newBankForm.accountName,
                    type: 'Verified NUBAN (NIP)',
                    isDefault: bankAccounts.length === 0
                  };
                  
                  if (user?.id) {
                    await addBankAccount(newAcc);
                  }

                  setBankAccounts([...bankAccounts, newAcc]);
                  setSelectedBankId(newAcc.id);
                  setIsAddBankModalOpen(false);
                  setNewBankForm({
                    bankCode: '058',
                    bankName: 'Guaranty Trust Bank (GTBank)',
                    accountNumber: '',
                    accountName: '',
                    isVerifyingNuban: false,
                    verifiedSuccessfully: false
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-black disabled:opacity-50"
              >
                Save Bank
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
