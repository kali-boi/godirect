import React, { useState } from 'react';
import LandlordSidebar from './LandlordSidebar';
import LandlordHeader from './LandlordHeader';
import LandlordOverviewPage from './LandlordOverviewPage';
import { PlusCircle } from 'lucide-react';

export default function LandlordDashboard({ 
  properties = [], 
  onOpenHostPortal, 
  onOpenChatWithHost,
  onSelectProperty,
  onReturnToPublic
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const [requests, setRequests] = useState([
    {
      id: 'req-201',
      propertyName: 'The Skyview Horizon Penthouse',
      guestName: 'Dr. Julian Thorne',
      guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      dates: 'Oct 12 - Oct 16 (4 Nights)',
      guestsCount: 4,
      totalAmount: 3570,
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: 'req-202',
      propertyName: 'The Azure Waterfront Villa',
      guestName: 'Amara Al-Zahra',
      guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      dates: 'Nov 01 - Nov 07 (6 Nights)',
      guestsCount: 8,
      totalAmount: 8820,
      status: 'approved',
      timestamp: 'Yesterday'
    }
  ]);

  const handleApproveRequest = (reqId) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
  };

  const handleDeclineRequest = (reqId) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'declined' } : r));
  };

  const pendingRequestsCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Host_Grotesk'] flex flex-col md:flex-row">
      
      {/* SIDEBAR COMPONENT */}
      <LandlordSidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        propertiesCount={properties.length} 
        pendingRequestsCount={pendingRequestsCount} 
        onOpenHostPortal={onOpenHostPortal} 
        onReturnToPublic={onReturnToPublic} 
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* HEADER COMPONENT — desktop only */}
        <div className="hidden md:block">
          <LandlordHeader 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            setActiveNav={setActiveNav} 
            onReturnToPublic={onReturnToPublic} 
          />
        </div>

        {/* BODY PAGES */}
        <main className="pt-16 md:pt-0 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {activeNav === 'dashboard' && (
            <LandlordOverviewPage 
              properties={properties} 
              onSelectProperty={onSelectProperty} 
              onOpenHostPortal={onOpenHostPortal} 
              setActiveNav={setActiveNav} 
            />
          )}

          {activeNav === 'properties' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Your Property Portfolio</h2>
                <button onClick={onOpenHostPortal} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4" /> Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-44 rounded-xl object-cover" />
                    <h3 className="font-bold text-base text-slate-900">{prop.title}</h3>
                    <p className="text-xs text-slate-500">{prop.location} • ${prop.price}/{prop.pricePeriod}</p>
                    <button onClick={() => onSelectProperty(prop)} className="w-full py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                      Manage Listing
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'requests' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Booking Requests ({pendingRequestsCount} Pending)</h2>
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={req.guestAvatar} alt={req.guestName} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{req.guestName}</h4>
                          <p className="text-xs text-slate-500">{req.propertyName} • {req.dates}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-slate-900">${req.totalAmount}</span>
                        <span className="block text-[10px] text-slate-400">Total Revenue</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      {req.status === 'pending' ? (
                        <>
                          <button onClick={() => handleDeclineRequest(req.id)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">
                            Decline
                          </button>
                          <button onClick={() => handleApproveRequest(req.id)} className="px-5 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                            Approve Booking
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold capitalize">
                          Status: {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'earnings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Host Earnings & Escrow Payouts</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Monthly Portfolio Revenue</span>
                <div className="text-3xl font-black text-slate-900">$24,850.00</div>
                <p className="text-xs text-emerald-700 font-bold">✓ 0% Commission Deducted by GoDirect</p>
              </div>
            </div>
          )}

          {activeNav === 'calendar' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Calendar & Rates Management</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500 py-12">
                All property calendars synchronized with 100% real-time availability.
              </div>
            </div>
          )}

          {activeNav === 'messages' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Guest Messages</h2>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Dr. Julian Thorne</h4>
                  <p className="text-xs text-slate-500">"Hi Eleanor, is early check-in available on Oct 12?"</p>
                </div>
                <button onClick={() => onOpenChatWithHost({ hostName: 'Dr. Julian Thorne', propertyName: 'Skyview Penthouse' })} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                  Reply
                </button>
              </div>
            </div>
          )}

          {activeNav === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Host Notifications</h2>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <h4 className="font-bold text-xs text-slate-900">New Booking Request</h4>
                <p className="text-xs text-slate-500">Dr. Julian Thorne requested 4 nights at Skyview Penthouse.</p>
              </div>
            </div>
          )}

          {activeNav === 'profile' && (
            <div className="space-y-6 max-w-xl animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Host Profile</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-900 border border-amber-300 mx-auto flex items-center justify-center font-bold text-xl">
                  EV
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Eleanor Vance</h3>
                <p className="text-xs text-slate-500">Verified Superhost & Property Owner</p>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
