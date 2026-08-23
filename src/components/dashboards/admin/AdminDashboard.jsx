import React, { useState } from 'react';
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

export default function AdminDashboard({ 
  properties = [], 
  onReturnToPublic 
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const [verifications, setVerifications] = useState([
    {
      id: 'ver-901',
      landlordName: 'Lord George Sterling',
      email: 'george@sterlingestates.co.uk',
      docType: 'Mayfair Title Deed & Govt Passport',
      submittedDate: 'Today, 09:14 AM',
      status: 'pending',
      propertyTitle: 'Belgravia Terrace Residence'
    },
    {
      id: 'ver-902',
      landlordName: 'Fatima Al-Hassan',
      email: 'fatima@dubailux.ae',
      docType: 'Dubai Land Dept Ownership Certificate',
      submittedDate: 'Yesterday, 04:30 PM',
      status: 'pending',
      propertyTitle: 'Downtown Dubai Executive Suite'
    }
  ]);

  const handleApprove = (id) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'verified' } : v));
  };

  const pendingCount = verifications.filter(v => v.status === 'pending').length;

  const userDirectory = [
    { id: 'u-1', name: 'Alexander Wright', email: 'alex@email.com', role: 'Renter', status: 'Verified', joinDate: 'Jan 2024', country: 'UK' },
    { id: 'u-2', name: 'Eleanor Vance', email: 'eleanor@godirect-vip.com', role: 'Superhost', status: 'Superhost', joinDate: 'Mar 2022', country: 'UK' },
    { id: 'u-3', name: 'Lord George Sterling', email: 'george@sterlingestates.co.uk', role: 'Host', status: 'Pending Deed', joinDate: 'Aug 2026', country: 'UK' },
    { id: 'u-4', name: 'Chief Adebayo Okonjo', email: 'adebayo@realty.ng', role: 'Host', status: 'Verified', joinDate: 'Jun 2024', country: 'Nigeria' },
    { id: 'u-5', name: 'Dr. Julian Thorne', email: 'julian@med.co.uk', role: 'Renter', status: 'Verified', joinDate: 'May 2025', country: 'UK' }
  ];

  const notificationsList = [
    { id: 'ann-1', title: 'System Maintenance Scheduled', body: 'GoDirect will undergo routine maintenance on 30 Aug 2026 from 02:00–04:00 UTC. No bookings will be disrupted.', sentTo: 'All Users', date: '23 Aug 2026', status: 'scheduled' },
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
          />
        </div>

        {/* PAGE BODY — pt-16 on mobile clears the fixed top bar */}
        <main className="pt-16 md:pt-0 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* OVERVIEW */}
          {activeNav === 'dashboard' && (
            <AdminOverviewPage 
              properties={properties} 
              verifications={verifications} 
              handleApprove={handleApprove} 
              setActiveNav={setActiveNav} 
            />
          )}

          {/* ANALYTICS */}
          {activeNav === 'analytics' && <AdminAnalyticsPage />}

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-44 rounded-xl object-cover" />
                    <h3 className="font-bold text-base text-slate-900">{prop.title}</h3>
                    <p className="text-xs text-slate-500">{prop.location} • ${prop.price}/{prop.pricePeriod}</p>
                    <span className="text-[11px] font-bold text-emerald-600 block">✓ Verified & Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT MODERATION */}
          {activeNav === 'content' && <AdminContentPage />}

          {/* USER DIRECTORY */}
          {activeNav === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">User Directory ({userDirectory.length} Shown • 1,420 Registered)</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Country</div>
                  <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {userDirectory.map((u) => (
                    <div key={u.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 items-center">
                      <div className="col-span-3 text-xs font-bold text-slate-900">{u.name}</div>
                      <div className="col-span-3 text-xs text-slate-500 truncate">{u.email}</div>
                      <div className="col-span-2 text-xs text-slate-600">{u.role}</div>
                      <div className="col-span-2 text-xs text-slate-600">{u.country}</div>
                      <div className="col-span-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          u.status === 'Verified' || u.status === 'Superhost'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {u.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* KYC */}
          {activeNav === 'kyc' && <AdminKYCPage />}

          {/* TRANSACTIONS */}
          {activeNav === 'transactions' && <AdminTransactionsPage />}

          {/* ESCROW */}
          {activeNav === 'escrow' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Platform Escrow Vault Control</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Total GMV Vault', value: '$148,500.00', sub: 'Gross marketplace value processed', color: 'text-slate-900' },
                  { label: 'Currently Held in Escrow', value: '$3,570.00', sub: 'Pending 24h inspection windows', color: 'text-amber-600' },
                  { label: 'Total Disbursed', value: '$140,610.00', sub: 'Released to verified hosts', color: 'text-emerald-600' }
                ].map((e, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">{e.label}</span>
                    <div className={`text-3xl font-black ${e.color}`}>{e.value}</div>
                    <p className="text-xs text-slate-500">{e.sub}</p>
                  </div>
                ))}
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
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Platform Announcements</h2>
                <button className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                  + New Announcement
                </button>
              </div>
              <div className="space-y-4">
                {notificationsList.map((n) => (
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
                ))}
              </div>
            </div>
          )}

          {/* AUDIT LOGS */}
          {activeNav === 'audit' && <AdminAuditPage />}

          {/* REGIONS */}
          {activeNav === 'regions' && <AdminRegionsPage />}

          {/* PROMOTIONS */}
          {activeNav === 'promotions' && <AdminPromotionsPage />}

          {/* SETTINGS */}
          {activeNav === 'settings' && (
            <div className="space-y-6 max-w-xl animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">System Settings</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                {[
                  { label: 'Platform Commission Fee', value: '0% (Zero Broker Fee)' },
                  { label: 'Escrow Inspection Window', value: '24 Hours Post Check-in' },
                  { label: 'Listing Verification Required', value: 'Yes — Title Deed Mandatory' },
                  { label: 'KYC Requirement', value: 'All Hosts — Full KYC + AML' },
                  { label: 'Supported Currencies', value: 'USD, GBP, AED, EUR, NGN' },
                  { label: 'Platform Version', value: 'v2.0.1-alpha' }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4">
                    <span className="text-xs font-bold text-slate-700">{s.label}</span>
                    <span className="text-xs font-mono font-bold text-slate-500">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN PROFILE */}
          {activeNav === 'profile' && (
            <div className="space-y-6 max-w-xl animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Admin Profile</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-slate-900 text-white mx-auto flex items-center justify-center font-bold text-xl">
                  SA
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Super Administrator</h3>
                <p className="text-xs text-slate-500">God Mode Access • All Permissions</p>
                <p className="text-xs text-slate-400 font-mono">admin@godirect.co</p>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
