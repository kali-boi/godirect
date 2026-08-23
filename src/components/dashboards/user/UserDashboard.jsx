import React, { useState } from 'react';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';
import UserOverviewPage from './UserOverviewPage';

export default function UserDashboard({ 
  wishlistProperties = [], 
  onSelectProperty, 
  onOpenChatWithHost,
  onReturnToPublic 
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
        
        {/* HEADER COMPONENT */}
        <UserHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          setActiveNav={setActiveNav} 
          onReturnToPublic={onReturnToPublic} 
        />

        {/* BODY PAGE CONTAINER */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProperties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-44 rounded-xl object-cover" />
                    <h3 className="font-bold text-base text-slate-900">{prop.title}</h3>
                    <p className="text-xs text-slate-500">{prop.location}</p>
                    <button onClick={() => onSelectProperty(prop)} className="w-full py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
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
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Messages & Inquiries</h2>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Eleanor Vance" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Eleanor Vance (Host)</h4>
                    <p className="text-xs text-slate-500">"Looking forward to hosting your stay at Skyview Penthouse!"</p>
                  </div>
                </div>
                <button onClick={() => onOpenChatWithHost({ hostName: 'Eleanor Vance', propertyName: 'Skyview Penthouse' })} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                  Open Chat
                </button>
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
              <h2 className="text-2xl font-black text-slate-900">Payments & Escrow Security Vault</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Escrow Security Hold</span>
                <div className="text-3xl font-black text-slate-900">$3,570.00</div>
                <p className="text-xs text-slate-500">Funds held in isolated Escrow until 24h post check-in.</p>
              </div>
            </div>
          )}

          {activeNav === 'profile' && (
            <div className="space-y-6 max-w-xl animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">User Profile</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center font-bold text-xl text-slate-700">
                  DA
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Alexander Wright</h3>
                <p className="text-xs text-slate-500">Property Seeker • Tier 3 Verified Renter</p>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
