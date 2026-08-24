import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminOverviewPage from './AdminOverviewPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import AdminTransactionsPage from './pages/AdminTransactionsPage';
import AdminKYCPage from './pages/AdminKYCPage';
import AdminDisputesPage from './pages/AdminDisputesPage';
import AdminContentPage from './pages/AdminContentPage';
import AdminSupportPage from './pages/AdminSupportPage';
import AdminAuditPage from './pages/AdminAuditPage';
import AdminRefundsPage from './pages/AdminRefundsPage';
import AdminRegionsPage from './pages/AdminRegionsPage';
import AdminPromotionsPage from './pages/AdminPromotionsPage';
import UserProfileSettingsPage from '../common/UserProfileSettingsPage';
import { getAllProfiles, getAllEscrows, getAdminPlatformStats } from '../../../services/supabaseService';
import { supabase } from '../../../lib/supabaseClient';
import { Search, Ban, Eye, Check, X, Edit2, ToggleLeft, ToggleRight, Save, RefreshCw } from 'lucide-react';

export default function AdminDashboard({ 
  properties = [], 
  onReturnToPublic,
  onSelectPortal 
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Live state from Supabase
  const [userDirectory, setUserDirectory] = useState([]);
  const [escrowRecords, setEscrowRecords] = useState([]);
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 0,
    verifiedListings: properties.length,
    pendingDeeds: 0,
    totalGMV: 0,
    activeEscrowsCount: 0,
    systemUptime: '100%'
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch live admin data from Supabase
  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      const [users, escrows, stats] = await Promise.all([
        getAllProfiles(),
        getAllEscrows(),
        getAdminPlatformStats()
      ]);
      setUserDirectory(users || []);
      setEscrowRecords(escrows || []);
      setPlatformStats(stats || {
        totalUsers: (users || []).length,
        verifiedListings: properties.length,
        pendingDeeds: properties.filter(p => p.verificationStatus === 'pending').length,
        totalGMV: 0,
        activeEscrowsCount: 0,
        systemUptime: '100%'
      });
    } catch (err) {
      console.warn('Error loading admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [properties]);

  // Deed Verifications: dynamically derived from real properties
  const verifications = useMemo(() => {
    return properties
      .filter(p => p.verificationStatus === 'pending')
      .map(p => ({
        id: p.id,
        landlordName: p.hostName || 'Verified Host',
        email: p.hostId || 'Direct Host',
        docType: 'Title Deed & Government ID',
        submittedDate: 'Pending Review',
        status: 'pending',
        propertyTitle: p.title
      }));
  }, [properties]);

  const handleApprove = async (propertyId) => {
    try {
      await supabase
        .from('properties')
        .update({ verification_status: 'verified' })
        .eq('id', propertyId);
      loadAdminData();
    } catch (err) {
      console.error('Failed to approve deed:', err);
    }
  };

  const pendingCount = verifications.length;

  // ── USER DIRECTORY STATE ──
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [bannedUsers, setBannedUsers] = useState([]);

  const filteredUsers = useMemo(() => {
    return userDirectory.filter(u => {
      const matchSearch = !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      const matchStatus = userStatusFilter === 'all' || u.kycStatus === userStatusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [userSearch, userRoleFilter, userStatusFilter, userDirectory, bannedUsers]);

  const getInitials = (name) => (name || 'GD').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const avatarColors = ['bg-teal-500', 'bg-indigo-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-emerald-500'];

  const escrowStatusMeta = {
    vaulted:           { label: 'Vaulted',           className: 'bg-blue-50 text-blue-800 border-blue-200' },
    inspection_active: { label: 'Inspection Active', className: 'bg-amber-50 text-amber-800 border-amber-200' },
    released:          { label: 'Released',          className: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    refunded:          { label: 'Refunded',          className: 'bg-slate-50 text-slate-600 border-slate-200' },
    frozen_dispute:    { label: 'Frozen – Dispute',  className: 'bg-rose-50 text-rose-800 border-rose-200' }
  };

  const escrowKPIs = [
    { label: 'Total GMV Vault',       value: `₦${Number(platformStats.totalGMV || 0).toLocaleString()}`, color: 'text-slate-900',   sub: 'All time gross value' },
    { label: 'Active Escrows',        value: String(platformStats.activeEscrowsCount || 0),              color: 'text-amber-600',   sub: 'Vaulted or in inspection' },
    { label: 'Released Today',        value: '₦0.00',                                                   color: 'text-emerald-600', sub: 'Paid out to host' },
    { label: 'Frozen (Disputes)',     value: '0',                                                       color: 'text-rose-600',    sub: 'Pending admin resolution' },
    { label: 'Platform Fee Earned',   value: `₦${Math.round(Number(platformStats.totalGMV || 0) * 0.05).toLocaleString()}`, color: 'text-teal-700', sub: '5% of disbursed amounts' }
  ];

  // ── SYSTEM SETTINGS STATE ──
  const [settings, setSettings] = useState({
    platformFee: '5',
    escrowWindow: '24',
    deedRequired: true,
    kycRequired: true,
    maintenanceMode: false,
    autoRelease: true
  });
  const [editingField, setEditingField] = useState(null);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSaveSettings = () => {
    setEditingField(null);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const notificationsList = [
    { id: 'ann-1', title: 'System Maintenance Scheduled', body: 'GoDirect will undergo routine maintenance on 30 Aug 2026 from 02:00–04:00 UTC.', sentTo: 'All Users', date: '23 Aug 2026', status: 'scheduled' },
    { id: 'ann-2', title: 'New Feature: Escrow Dispute Portal', body: 'Guests and hosts can now raise escrow disputes directly from their dashboards.', sentTo: 'All Users', date: '20 Aug 2026', status: 'sent' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Host_Grotesk'] flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <AdminSidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        pendingVerificationsCount={pendingCount} 
        propertiesCount={properties.length} 
        onReturnToPublic={onReturnToPublic}
        onSelectPortal={onSelectPortal} 
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* HEADER — desktop only (mobile uses sidebar top bar) */}
        <div className="hidden md:block">
          <AdminHeader 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            pendingCount={pendingCount} 
            setActiveNav={setActiveNav} 
            onReturnToPublic={onReturnToPublic}
            onSelectPortal={onSelectPortal} 
          />
        </div>

        {/* PAGE BODY — pt-16 on mobile clears the fixed top bar */}
        <main className="pt-16 md:pt-0 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* OVERVIEW */}
          {activeNav === 'dashboard' && (
            <AdminOverviewPage 
              properties={properties} 
              verifications={verifications} 
              usersCount={platformStats.totalUsers || userDirectory.length}
              totalGMV={platformStats.totalGMV || 0}
              recentActivities={[]}
              handleApprove={handleApprove} 
              setActiveNav={setActiveNav} 
            />
          )}

          {/* ANALYTICS */}
          {activeNav === 'analytics' && <AdminAnalyticsPage properties={properties} />}

          {/* DEED VERIFICATIONS */}
          {activeNav === 'verifications' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Title Deed Verification Queue</h2>
              <div className="space-y-4">
                {verifications.map((v) => (
                  <div key={v.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">{v.landlordName}</h4>
                        <p className="text-xs text-slate-500">{v.email} • Property: {v.propertyTitle}</p>
                        <p className="text-xs text-slate-400">Doc: {v.docType} • Submitted: {v.submittedDate}</p>
                      </div>
                      <span className="text-xs font-mono text-slate-400">#{v.id}</span>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-slate-100">
                      {v.status === 'pending' ? (
                        <button onClick={() => handleApprove(v.id)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs">
                          Approve Deed & Publish
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                          ✓ Verified & Active
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALL LISTINGS */}
          {activeNav === 'listings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">All Marketplace Listings ({properties.length})</h2>
              {properties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">No listings yet. Run the seed script to add properties.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((prop) => (
                    <div key={prop.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                      <img src={prop.images?.[0]} alt={prop.title} className="w-full h-44 rounded-xl object-cover" />
                      <h3 className="font-bold text-base text-slate-900">{prop.title}</h3>
                      <p className="text-xs text-slate-500">
                        {prop.location} •{' '}
                        {prop.isShortLet
                          ? `₦${Number(prop.pricePerNight).toLocaleString()}/night`
                          : `₦${Number(prop.pricePerYear).toLocaleString()}/year`}
                      </p>
                      <span className="text-[11px] font-bold text-emerald-600 block">✓ Verified & Active</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CONTENT MODERATION */}
          {activeNav === 'content' && <AdminContentPage />}

          {/* USER DIRECTORY */}
          {activeNav === 'users' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">User Directory</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{filteredUsers.length} of {userDirectory.length} users shown</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#018F8B] bg-white"
                  />
                </div>
                <select value={userRoleFilter} onChange={e => setUserRoleFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white outline-none focus:border-[#018F8B]">
                  <option value="all">All Roles</option>
                  <option value="user">Renter / User</option>
                  <option value="landlord">Landlord / Host</option>
                  <option value="admin">Admin</option>
                </select>
                <select value={userStatusFilter} onChange={e => setUserStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white outline-none focus:border-[#018F8B]">
                  <option value="all">All KYC Status</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-4">User</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">KYC Status</div>
                  <div className="col-span-2">Joined</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {filteredUsers.length === 0 && (
                    <div className="px-6 py-10 text-center text-xs text-slate-400">No users match your filters.</div>
                  )}
                  {filteredUsers.map((u, i) => {
                    const isBanned = bannedUsers.includes(u.id);
                    return (
                      <div key={u.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${isBanned ? 'opacity-50 bg-rose-50/40' : 'hover:bg-slate-50/80'}`}>
                        {/* Avatar + name */}
                        <div className="col-span-4 flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-black shrink-0`}>
                            {getInitials(u.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{u.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{u.email}</p>
                          </div>
                        </div>
                        {/* Role badge */}
                        <div className="col-span-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${
                            u.role === 'admin' ? 'bg-violet-50 text-violet-800 border-violet-200'
                            : u.role === 'landlord' ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>{u.role}</span>
                        </div>
                        {/* KYC status */}
                        <div className="col-span-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            u.kycStatus === 'verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : u.kycStatus === 'rejected' ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>{u.kycStatus}</span>
                        </div>
                        {/* Join date */}
                        <div className="col-span-2 text-xs text-slate-500">{u.joinDate}</div>
                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-end gap-1.5">
                          <button title="View Profile" className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title={isBanned ? 'Unban User' : 'Ban User'}
                            onClick={() => setBannedUsers(prev => isBanned ? prev.filter(id => id !== u.id) : [...prev, u.id])}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isBanned ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700' : 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                            }`}>
                            {isBanned ? <Check className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* KYC */}
          {activeNav === 'kyc' && <AdminKYCPage />}

          {/* TRANSACTIONS */}
          {activeNav === 'transactions' && <AdminTransactionsPage />}

          {/* ESCROW VAULT */}
          {activeNav === 'escrow' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Platform Escrow Vault Control</h2>

              {/* 5-stat KPI strip */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {escrowKPIs.map((kpi, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{kpi.label}</span>
                    <div className={`text-xl font-black ${kpi.color}`}>{kpi.value}</div>
                    <p className="text-[10px] text-slate-400">{kpi.sub}</p>
                  </div>
                ))}
              </div>

              {/* Escrow Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-3 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-3">Escrow ID</div>
                  <div className="col-span-3">Property</div>
                  <div className="col-span-2">Guest</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1">Age</div>
                  <div className="col-span-1 text-right">Status</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {escrowRecords.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                      No escrow holds in vault yet. Escrow deposits will appear here as bookings are placed.
                    </div>
                  ) : (
                    escrowRecords.map(e => {
                      const meta = escrowStatusMeta[e.status] || escrowStatusMeta.vaulted;
                      return (
                        <div key={e.id} className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-slate-50/60 transition-colors">
                          <div className="col-span-3">
                            <p className="text-xs font-mono font-bold text-[#0B2545]">{e.id}</p>
                            <p className="text-[10px] text-slate-400">{e.booking}</p>
                          </div>
                          <div className="col-span-3 text-xs text-slate-700 font-medium truncate">{e.property}</div>
                          <div className="col-span-2 text-xs text-slate-500 truncate">{e.guest}</div>
                          <div className="col-span-2 text-xs font-black text-slate-900">₦{Number(e.amount || 0).toLocaleString()}</div>
                          <div className="col-span-1 text-xs text-slate-400">{e.age}</div>
                          <div className="col-span-1 flex justify-end">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${meta.className}`}>{meta.label}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* REFUNDS */}
          {activeNav === 'refunds' && <AdminRefundsPage />}

          {/* DISPUTES */}
          {activeNav === 'disputes' && <AdminDisputesPage />}

          {/* SUPPORT */}
          {activeNav === 'support' && <AdminSupportPage />}

          {/* ANNOUNCEMENTS / NOTIFICATIONS */}
          {activeNav === 'notifications' && (
            <div className="space-y-6 animate-fade-in font-['Host_Grotesk']">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Platform Announcements</h2>
                  <p className="text-xs text-slate-500 mt-1">Broadcast system-wide notices or SMS/Email alerts to users and hosts.</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                  + New Announcement
                </button>
              </div>
              <div className="space-y-4">
                {notificationsList.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
                    No active announcements broadcasted yet. Create a notice to notify all registered landlords and renters.
                  </div>
                ) : (
                  notificationsList.map((n) => (
                    <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-slate-900">{n.title}</h4>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          n.status === 'sent' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {n.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.body}</p>
                      <p className="text-[10px] text-slate-400">Sent to: {n.sentTo} • {n.date}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* AUDIT LOGS */}
          {activeNav === 'audit' && <AdminAuditPage />}

          {/* REGIONS */}
          {activeNav === 'regions' && <AdminRegionsPage properties={properties} />}

          {/* PROMOTIONS */}
          {activeNav === 'promotions' && <AdminPromotionsPage />}

          {/* SETTINGS */}
          {activeNav === 'settings' && (
            <div className="space-y-6 max-w-2xl animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">System Settings</h2>
                {settingsSaved && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl animate-fade-in">✓ Settings saved</span>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                {/* Numeric / text editable fields */}
                {[
                  { key: 'platformFee',   label: 'Platform Commission Fee (%)',    suffix: '%',      hint: 'Percentage deducted from each disbursement to the host.' },
                  { key: 'escrowWindow',  label: 'Escrow Inspection Window (hrs)', suffix: ' hrs',   hint: 'Hours after check-in before funds are auto-released to host.' }
                ].map(field => (
                  <div key={field.key} className="flex items-center justify-between px-6 py-4 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{field.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{field.hint}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {editingField === field.key ? (
                        <input
                          type="number"
                          value={settings[field.key]}
                          onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                          className="w-20 text-center px-2 py-1.5 rounded-lg border border-[#018F8B] text-xs font-bold outline-none"
                          autoFocus
                        />
                      ) : (
                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                          {settings[field.key]}{field.suffix}
                        </span>
                      )}
                      <button
                        onClick={() => editingField === field.key ? handleSaveSettings() : setEditingField(field.key)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        title={editingField === field.key ? 'Save' : 'Edit'}
                      >
                        {editingField === field.key ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Toggle fields */}
                {[
                  { key: 'deedRequired',     label: 'Deed Verification Required',  hint: 'Hosts must upload a title deed before listing.' },
                  { key: 'kycRequired',      label: 'KYC Required for All Hosts',  hint: 'Full KYC + AML check mandatory before first payout.' },
                  { key: 'autoRelease',      label: 'Auto-Release After Window',   hint: 'Automatically release escrow when inspection window expires.' },
                  { key: 'maintenanceMode',  label: 'Maintenance Mode',            hint: 'Disables new bookings and shows a maintenance banner.' }
                ].map(toggle => (
                  <div key={toggle.key} className="flex items-center justify-between px-6 py-4 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{toggle.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{toggle.hint}</p>
                    </div>
                    <button
                      onClick={() => { setSettings(s => ({ ...s, [toggle.key]: !s[toggle.key] })); setSettingsSaved(false); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        settings[toggle.key]
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {settings[toggle.key]
                        ? <><ToggleRight className="w-4 h-4" /> ON</>
                        : <><ToggleLeft className="w-4 h-4" /> OFF</>}
                    </button>
                  </div>
                ))}

                {/* Static info */}
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="text-xs font-bold text-slate-800">Platform Version</p>
                  <span className="text-xs font-mono text-slate-400">v2.0.1-alpha</span>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-6 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#122525] transition-all"
              >
                Save All Settings
              </button>
            </div>
          )}

          {/* ── LIVE ADMIN PROFILE (CONNECTED TO SUPABASE) ── */}
          {activeNav === 'profile' && (
            <UserProfileSettingsPage portalType="admin" />
          )}

        </main>

      </div>

    </div>
  );
}
