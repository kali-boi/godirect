import React, { useState, useMemo } from 'react';
import LandlordSidebar from './LandlordSidebar';
import LandlordHeader from './LandlordHeader';
import LandlordOverviewPage from './LandlordOverviewPage';
import LandlordAnalyticsPage from './pages/LandlordAnalyticsPage';
import LandlordReviewsPage from './pages/LandlordReviewsPage';
import LandlordGuestsPage from './pages/LandlordGuestsPage';
import LandlordMaintenancePage from './pages/LandlordMaintenancePage';
import LandlordDocumentsPage from './pages/LandlordDocumentsPage';
import LandlordWalletPage from './pages/LandlordWalletPage';
import LandlordTaxPage from './pages/LandlordTaxPage';
import UserProfileSettingsPage from '../common/UserProfileSettingsPage';
import { PlusCircle, ChevronLeft, ChevronRight, MessageSquare, BellDot, CheckCheck } from 'lucide-react';

export default function LandlordDashboard({ 
  properties = [], 
  onOpenHostPortal, 
  onOpenChatWithHost,
  onSelectProperty,
  onReturnToPublic,
  onSelectPortal
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // ── BOOKING REQUESTS ──
  const [requests, setRequests] = useState([
    { id: 'req-201', propertyName: 'Ikoyi Waterfront Penthouse', guestName: 'Dr. Julian Thorne', guestAvatar: null, dates: 'Oct 12 - Oct 16 (4 Nights)', guestsCount: 4, totalAmount: 740000, status: 'pending', timestamp: '2 hours ago' },
    { id: 'req-202', propertyName: 'Victoria Island 2-Bed Suite', guestName: 'Amara Al-Zahra', guestAvatar: null, dates: 'Nov 01 - Nov 07 (6 Nights)', guestsCount: 2, totalAmount: 450000, status: 'approved', timestamp: 'Yesterday' }
  ]);

  const handleApproveRequest = (reqId) => setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
  const handleDeclineRequest = (reqId) => setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'declined' } : r));
  const pendingRequestsCount = requests.filter(r => r.status === 'pending').length;

  // ── CALENDAR ──
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  // Sample booked days for demonstration
  const bookedDays = [3, 4, 5, 12, 13, 14, 15, 22, 23];
  const blockedDays = [8, 9, 29, 30];

  const calDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    return { firstDay, daysInMonth };
  }, [calMonth, calYear]);

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

  const getDayClass = (day) => {
    const isToday = calYear === today.getFullYear() && calMonth === today.getMonth() && day === today.getDate();
    if (isToday) return 'bg-amber-400 text-white font-black';
    if (bookedDays.includes(day)) return 'bg-[#0B2545] text-white font-bold';
    if (blockedDays.includes(day)) return 'bg-slate-300 text-slate-500';
    return 'hover:bg-teal-50 hover:text-teal-800 text-slate-700';
  };

  // ── MESSAGES ──
  const [hostMessages, setHostMessages] = useState([
    { id: 'm-1', guestName: 'Dr. Julian Thorne', initials: 'JT', color: 'bg-indigo-500', snippet: 'Hi, is early check-in available on Oct 12?', time: '10:42 AM', unread: true },
    { id: 'm-2', guestName: 'Amara Al-Zahra',    initials: 'AA', color: 'bg-rose-500',   snippet: 'Thanks for confirming! See you in November.', time: 'Yesterday', unread: false },
    { id: 'm-3', guestName: 'Marcus Obi',        initials: 'MO', color: 'bg-teal-500',   snippet: 'Is the property still available for Dec 20?', time: 'Mon', unread: true }
  ]);

  // ── NOTIFICATIONS ──
  const [hostNotifs, setHostNotifs] = useState([
    { id: 'n-1', title: 'New Booking Request',    desc: 'Dr. Julian Thorne requested 4 nights at Ikoyi Penthouse.',        time: 'Today 09:30 AM', unread: true },
    { id: 'n-2', title: 'Escrow Released',         desc: '₦458,333 has been released from Escrow to your wallet.',              time: 'Yesterday 2:15 PM', unread: true },
    { id: 'n-3', title: 'New Review Received',     desc: 'Amara Al-Zahra left a 5★ review on Victoria Island 2-Bed Suite.', time: '2 days ago', unread: false },
    { id: 'n-4', title: 'KYC Reminder',            desc: 'Complete your KYC verification to unlock full payout access.',       time: '3 days ago', unread: false }
  ]);

  const markAllRead = () => setHostNotifs(n => n.map(x => ({ ...x, unread: false })));

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
        onSelectPortal={onSelectPortal}
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
            onSelectPortal={onSelectPortal}
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

              {properties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <p className="text-slate-400 text-sm">No properties listed yet.</p>
                  <button onClick={onOpenHostPortal} className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold">List Your First Property</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((prop) => (
                    <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                      <div className="relative">
                        <img src={prop.images?.[0]} alt={prop.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          prop.status === 'active' ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : prop.status === 'draft' ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                        } capitalize`}>{prop.status || 'active'}</span>
                        {prop.isShortLet && (
                          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#018F8B] text-white">Short-Let</span>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h3>
                        <p className="text-xs text-slate-500">{prop.location}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-sm font-black text-[#0B2545]">
                            {prop.isShortLet
                              ? `₦${Number(prop.pricePerNight).toLocaleString()}/night`
                              : `₦${Number(prop.pricePerYear).toLocaleString()}/year`}
                          </span>
                          <span className="text-[10px] text-slate-400">{prop.beds} bed • {prop.baths} bath</span>
                        </div>
                        <button onClick={() => onSelectProperty(prop)} className="w-full py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#122525] transition-colors">
                          Manage Listing
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
            <LandlordWalletPage />
          )}

          {activeNav === 'calendar' && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Calendar & Availability</h2>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                {/* Month nav */}
                <div className="flex items-center justify-between">
                  <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
                  <h3 className="font-extrabold text-base text-slate-900">{monthNames[calMonth]} {calYear}</h3>
                  <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 text-center">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <div key={d} className="text-[10px] font-extrabold text-slate-400 uppercase py-1">{d}</div>
                  ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array(calDays.firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
                  {Array(calDays.daysInMonth).fill(null).map((_, i) => {
                    const day = i + 1;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                        className={`aspect-square rounded-xl text-xs transition-all flex items-center justify-center ${
                          selectedDay === day ? 'ring-2 ring-[#018F8B] ring-offset-1 ' : ''
                        }${getDayClass(day)}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                  {[
                    { color: 'bg-amber-400',   label: 'Today' },
                    { color: 'bg-[#0B2545]',   label: 'Booked' },
                    { color: 'bg-slate-300',   label: 'Blocked' },
                    { color: 'bg-white border border-slate-200', label: 'Available' }
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full ${l.color}`} />
                      <span className="text-[10px] text-slate-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day detail panel */}
              {selectedDay && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 animate-fade-in">
                  <h4 className="font-extrabold text-sm text-slate-900">{monthNames[calMonth]} {selectedDay}, {calYear}</h4>
                  {bookedDays.includes(selectedDay) ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#0B2545] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">Booked</span>
                      <p className="text-xs text-slate-600">Guest booking active — check Booking Requests for details.</p>
                    </div>
                  ) : blockedDays.includes(selectedDay) ? (
                    <p className="text-xs text-slate-500">This date is manually blocked.</p>
                  ) : (
                    <p className="text-xs text-emerald-700 font-bold">✓ Available — open for bookings</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeNav === 'messages' && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Guest Messages</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50 overflow-hidden">
                {hostMessages.length === 0 && (
                  <div className="p-10 text-center text-xs text-slate-400">No messages yet.</div>
                )}
                {hostMessages.map(msg => (
                  <div key={msg.id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full ${msg.color} flex items-center justify-center text-white text-xs font-black shrink-0 relative`}>
                        {msg.initials}
                        {msg.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-white" />}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs truncate ${msg.unread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>{msg.guestName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{msg.snippet}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                      <button
                        onClick={() => onOpenChatWithHost({ hostName: msg.guestName })}
                        className="px-3 py-1.5 rounded-xl bg-[#0B2545] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'notifications' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Host Notifications</h2>
                <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50 overflow-hidden">
                {hostNotifs.map(n => (
                  <div key={n.id} onClick={() => setHostNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))} className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors ${ n.unread ? 'bg-teal-50/40 hover:bg-teal-50' : 'hover:bg-slate-50' }`}>
                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${n.unread ? 'bg-teal-500' : 'bg-slate-200'}`} />
                    <div className="min-w-0">
                      <p className={`text-xs ${n.unread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>{n.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── LIVE HOST PROFILE (CONNECTED TO SUPABASE) ── */}
          {activeNav === 'profile' && (
            <UserProfileSettingsPage portalType="landlord" />
          )}


          {/* NEW PAGES */}
          {activeNav === 'analytics' && <LandlordAnalyticsPage properties={properties} />}
          {activeNav === 'reviews' && <LandlordReviewsPage />}
          {activeNav === 'guests' && <LandlordGuestsPage />}
          {activeNav === 'maintenance' && <LandlordMaintenancePage />}
          {activeNav === 'documents' && <LandlordDocumentsPage />}
          {activeNav === 'tax' && <LandlordTaxPage />}

        </main>

      </div>

    </div>
  );
}
