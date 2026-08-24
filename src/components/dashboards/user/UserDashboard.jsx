import React, { useState } from 'react';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';
import UserOverviewPage from './UserOverviewPage';
import UserBookingsPage from './pages/UserBookingsPage';
import UserEscrowPage from './pages/UserEscrowPage';
import UserReviewsPage from './pages/UserReviewsPage';
import UserDisputePage from './pages/UserDisputePage';
import UserDocumentsPage from './pages/UserDocumentsPage';
import UserSupportPage from './pages/UserSupportPage';
import UserVerificationPage from './pages/UserVerificationPage';
import UserProfileSettingsPage from '../common/UserProfileSettingsPage';

export default function UserDashboard({ 
  wishlistProperties = [], 
  onSelectProperty, 
  onOpenChatWithHost,
  onReturnToPublic,
  onSelectPortal
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const appointments = [
    {
      id: 'app-1',
      propertyName: 'The Skyview Horizon Penthouse',
      location: 'Mayfair, London',
      hostName: 'Eleanor Vance',
      date: 'Oct 12, 2026',
      time: '3:00 PM GMT',
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const savedSearches = [
    { id: 's-1', title: 'Mayfair 3-Bed Penthouses', filter: 'Penthouse • London' },
    { id: 's-2', title: 'Paris Short-Let Executive Suites', filter: 'Shortlet • Paris' }
  ];

  const notificationsList = [
    { id: 'n-1', title: 'Escrow Deposit Vaulted', desc: '$3,570.00 is secured in Escrow for Skyview Penthouse.', time: 'Today 09:30 AM' },
    { id: 'n-2', title: 'Viewing Confirmed', desc: 'Eleanor Vance confirmed your viewing on Oct 12 at 3:00 PM.', time: 'Yesterday' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Host_Grotesk'] flex flex-col md:flex-row pb-20 md:pb-0">
      
      {/* SIDEBAR COMPONENT */}
      <UserSidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        wishlistCount={wishlistProperties.length} 
        onReturnToPublic={onReturnToPublic} 
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* HEADER COMPONENT — desktop only */}
        <div className="hidden md:block">
          <UserHeader 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            setActiveNav={setActiveNav} 
            onReturnToPublic={onReturnToPublic} 
            onSelectPortal={onSelectPortal}
          />
        </div>

        {/* BODY PAGE CONTAINER */}
        <main className="p-4 sm:p-6 lg:p-8 pb-28 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {activeNav === 'dashboard' && (
            <UserOverviewPage 
              wishlistProperties={wishlistProperties} 
              onSelectProperty={onSelectProperty} 
              setActiveNav={setActiveNav} 
              onReturnToPublic={onReturnToPublic} 
            />
          )}

          {activeNav === 'properties' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Marketplace Properties</h2>
                  <p className="text-xs text-slate-500">Browse verified shortlets and long-term rental leases.</p>
                </div>
                <button onClick={onReturnToPublic} className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                  Explore Full Marketplace
                </button>
              </div>
              {wishlistProperties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlistProperties.map(prop => (
                    <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                      <div className="relative">
                        <img src={prop.images?.[0]} alt={prop.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                        {prop.isShortLet && <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#018F8B] text-white">Short-Let</span>}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h3>
                        <p className="text-xs text-slate-500">{prop.location}</p>
                        <p className="text-sm font-black text-[#0B2545]">
                          {prop.isShortLet
                            ? `₦${Number(prop.pricePerNight).toLocaleString()}/night`
                            : `₦${Number(prop.pricePerYear).toLocaleString()}/year`}
                        </p>
                        <button onClick={() => onSelectProperty(prop)} className="w-full py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#122525] transition-colors">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeNav === 'saved' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Saved Wishlist ({wishlistProperties.length})</h2>
                <button onClick={onReturnToPublic} className="text-xs font-bold text-slate-600 hover:text-slate-900">
                  Add More →
                </button>
              </div>

              {wishlistProperties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <p className="text-slate-400 text-sm">Your wishlist is empty.</p>
                  <button onClick={onReturnToPublic} className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold">Browse Properties</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProperties.map((prop) => (
                    <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                      <div className="relative">
                        <img src={prop.images?.[0]} alt={prop.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                        {prop.isShortLet && <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#018F8B] text-white">Short-Let</span>}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h3>
                        <p className="text-xs text-slate-500">{prop.location}</p>
                        <p className="text-sm font-black text-[#0B2545]">
                          {prop.isShortLet
                            ? `₦${Number(prop.pricePerNight).toLocaleString()}/night`
                            : `₦${Number(prop.pricePerYear).toLocaleString()}/year`}
                        </p>
                        <button onClick={() => onSelectProperty(prop)} className="w-full py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#122525] transition-colors">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeNav === 'searches' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Saved Searches & Alerts</h2>
              <div className="space-y-3">
                {savedSearches.map((s) => (
                  <div key={s.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{s.title}</h4>
                      <p className="text-xs text-slate-400">{s.filter}</p>
                    </div>
                    <button onClick={onReturnToPublic} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold">
                      Run Search
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'appointments' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Scheduled Tours & Appointments</h2>
              <div className="space-y-4">
                {appointments.map((app) => (
                  <div key={app.id} className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={app.image} alt={app.propertyName} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {app.status}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 mt-1">{app.propertyName}</h4>
                        <p className="text-xs text-slate-500">{app.date} • {app.time}</p>
                      </div>
                    </div>
                    <button onClick={() => onOpenChatWithHost(app)} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                      Chat Host
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'messages' && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Messages & Inquiries</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50 overflow-hidden">
                {[
                  { id: 'uc-1', name: 'Ikoyi Penthouse Host', initials: 'IH', color: 'bg-teal-500',   snippet: 'Looking forward to hosting your stay!', time: '10:42 AM', unread: true },
                  { id: 'uc-2', name: 'VI 2-Bed Suite Host',  initials: 'VS', color: 'bg-indigo-500', snippet: 'Hi, your booking is confirmed for Nov 1.', time: 'Yesterday', unread: false }
                ].map(conv => (
                  <div key={conv.id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full ${conv.color} flex items-center justify-center text-white text-xs font-black shrink-0 relative`}>
                        {conv.initials}
                        {conv.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#018F8B] rounded-full border-2 border-white" />}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs truncate ${conv.unread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>{conv.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{conv.snippet}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400">{conv.time}</span>
                      <button
                        onClick={() => onOpenChatWithHost({ hostName: conv.name })}
                        className="px-3 py-1.5 rounded-xl bg-[#0B2545] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Open Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Notifications</h2>
              <div className="space-y-3">
                {notificationsList.map((n) => (
                  <div key={n.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <h4 className="font-bold text-xs text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-500">{n.desc}</p>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'payments' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Payments & Escrow Vault</h2>

              {/* Active escrow card */}
              <div className="bg-gradient-to-br from-[#0B2545] to-[#018F8B] rounded-2xl p-6 text-white space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">Active Escrow Security Hold</span>
                <div className="text-3xl font-black">₦0.00</div>
                <p className="text-xs text-white/70">No active escrow holds. Funds will appear here once you make a booking.</p>
                <div className="flex gap-3 pt-2">
                  {['Escrow Deposited', 'Check-in Verified', '24h Inspection', 'Released to Host'].map((step, i) => (
                    <div key={step} className="flex-1 text-center">
                      <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-black mb-1 ${ i === 0 ? 'bg-amber-400 text-slate-900' : 'bg-white/20 text-white/50' }`}>{i + 1}</div>
                      <p className="text-[9px] text-white/60 leading-tight">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment history table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900">Payment History</h3>
                </div>
                <div className="p-10 text-center text-xs text-slate-400">
                  No payments yet. Complete your first booking to see transaction history here.
                </div>
              </div>
            </div>
          )}

          {/* ── LIVE USER PROFILE (CONNECTED TO SUPABASE) ── */}
          {activeNav === 'profile' && (
            <UserProfileSettingsPage portalType="user" />
          )}


          {/* ── NEW PAGES ── */}
          {activeNav === 'bookings' && <UserBookingsPage onOpenChatWithHost={onOpenChatWithHost} />}
          {activeNav === 'escrow' && <UserEscrowPage />}
          {activeNav === 'reviews' && <UserReviewsPage />}
          {activeNav === 'disputes' && <UserDisputePage />}
          {activeNav === 'documents' && <UserDocumentsPage />}
          {activeNav === 'support' && <UserSupportPage />}
          {activeNav === 'verification' && <UserVerificationPage />}

        </main>

      </div>

    </div>
  );
}
