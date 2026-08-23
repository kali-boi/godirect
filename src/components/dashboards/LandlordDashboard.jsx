import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MessageSquare, 
  ShieldCheck, 
  Eye, 
  Sparkles,
  ArrowRight,
  Home,
  Search,
  Bell,
  SlidersHorizontal,
  BarChart3,
  FileText,
  Globe
} from 'lucide-react';

export default function LandlordDashboard({ 
  properties, 
  onOpenHostPortal, 
  onOpenChatWithHost,
  onSelectProperty,
  onReturnToPublic
}) {
  const [activePage, setActivePage] = useState('overview'); // 'overview' | 'listings' | 'requests' | 'earnings' | 'calendar'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Reservation Requests State
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
    },
    {
      id: 'req-203',
      propertyName: 'Minimalist Haus in Kensington',
      guestName: 'Oliver Vance',
      guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      dates: 'Dec 01 - Jun 01 (6 Months Lease)',
      guestsCount: 2,
      totalAmount: 27000,
      status: 'pending',
      timestamp: '3 hours ago'
    }
  ]);

  const handleApproveRequest = (reqId) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
  };

  const handleDeclineRequest = (reqId) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'declined' } : r));
  };

  const sidebarLinks = [
    { id: 'overview', label: 'Overview & Metrics', icon: BarChart3 },
    { id: 'listings', label: 'My Properties', icon: Building2, badge: properties.length },
    { id: 'requests', label: 'Booking Requests', icon: Clock, badge: requests.filter(r => r.status === 'pending').length },
    { id: 'earnings', label: 'Earnings & Escrow', icon: DollarSign },
    { id: 'calendar', label: 'Calendar & Pricing', icon: Calendar }
  ];

  return (
    <div className="flex h-screen bg-[#fffafa] text-[#122525] font-['Host_Grotesk'] overflow-hidden">
      
      {/* 📌 DEDICATED DEEP TEAL LANDLORD SIDEBAR */}
      <aside className="w-64 bg-[#122525] text-white flex flex-col justify-between p-4 border-r border-[#1a3535] shrink-0 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-2 cursor-pointer" onClick={onReturnToPublic}>
            <img
              src="/images/logo.png"
              alt="GoDirect Logo"
              className="h-9 w-auto object-contain filter brightness-110"
            />
            <span className="px-2 py-0.5 rounded bg-[var(--mellow-gold)] text-slate-950 text-[9px] font-black uppercase tracking-wider">
              Host Portal
            </span>
          </div>


          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[var(--teal-blue)] text-white shadow-lg' 
                      : 'text-teal-100/80 hover:bg-[#1a3535] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[var(--mellow-gold)] text-white' : 'bg-white/10 text-teal-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-4 border-t border-[#1a3535]">
          <button
            onClick={onOpenHostPortal}
            className="btn-gold w-full text-xs py-2.5 justify-center font-bold shadow-md"
          >
            <PlusCircle className="w-4 h-4" /> List New Property
          </button>

          <button
            onClick={onReturnToPublic}
            className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#1a3535]/60 hover:bg-[#1a3535] text-white text-xs font-bold transition-all border border-teal-900"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--mellow-gold)]" />
              <span>Public Marketplace</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
          </button>
        </div>
      </aside>

      {/* 🏛️ MAIN CONTENT AREA WITH DEDICATED TOPBAR */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* DEDICATED LANDLORD TOPBAR */}
        <header className="h-20 bg-white border-b border-[var(--border-light)] px-8 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3 w-96 bg-[var(--bg-elevated)] px-4 py-2.5 rounded-2xl border border-[var(--border-light)]">
            <Search className="w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search properties, guest requests..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-[#122525] outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenHostPortal}
              className="btn-gold text-xs px-4 py-2"
            >
              <PlusCircle className="w-4 h-4" /> Post Property
            </button>

            <button className="relative p-2.5 rounded-full bg-[var(--bg-elevated)] text-[#122525] border border-[var(--border-light)]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--mellow-gold)]" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-[var(--border-light)]">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
                alt="Eleanor Vance" 
                className="w-9 h-9 rounded-full object-cover border-2 border-[var(--mellow-gold)]"
              />
              <div className="text-xs">
                <div className="font-bold text-[#122525]">Eleanor Vance</div>
                <div className="text-[10px] text-[var(--golden-brown)] font-bold">Verified Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE BODY */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</span>
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">$39,390</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% vs last month</span>
              </div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Properties</span>
                <div className="p-2 rounded-xl bg-[var(--teal-blue)]/15 text-[var(--teal-blue)]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">{properties.length}</div>
              <div className="text-xs text-[var(--text-secondary)]">100% Verified & Live</div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Pending Requests</span>
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-xs text-amber-600 font-semibold">Requires Owner Review</div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Agency Fee Saved</span>
                <div className="p-2 rounded-xl bg-[var(--mellow-gold)]/15 text-[var(--golden-brown)]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[var(--golden-brown)]">$5,908</div>
              <div className="text-xs text-[var(--text-secondary)]">0% middleman commission saved</div>
            </div>
          </div>

          {/* Page 1: Overview & Booking Requests */}
          {(activePage === 'overview' || activePage === 'requests') && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#122525]">Pending Guest Reservations</h2>
                  <p className="text-xs text-[var(--text-secondary)]">Approve or decline direct guest booking requests.</p>
                </div>
              </div>

              <div className="space-y-4">
                {requests.map((req) => (
                  <div 
                    key={req.id} 
                    className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img src={req.guestAvatar} alt={req.guestName} className="w-12 h-12 rounded-full object-cover border border-[var(--teal-blue)]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-[#122525]">{req.guestName}</h4>
                          <span className="text-xs text-[var(--text-muted)]">• {req.timestamp}</span>
                        </div>
                        <p className="text-xs font-semibold text-[var(--teal-blue)]">{req.propertyName}</p>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[var(--mellow-gold)]" />
                            {req.dates}
                          </span>
                          <span>• {req.guestsCount} Guests</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border-light)]">
                      <div className="text-left md:text-right">
                        <div className="text-lg font-extrabold text-[#122525]">${req.totalAmount.toLocaleString()}</div>
                        <span className="badge-teal text-[10px]">Direct Escrow</span>
                      </div>

                      {req.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            className="btn-primary text-xs px-4 py-2"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(req.id)}
                            className="btn-secondary text-xs px-3 py-2 text-red-500"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          req.status === 'approved' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-red-500/15 text-red-600'
                        }`}>
                          {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page 2: Your Listings */}
          {(activePage === 'overview' || activePage === 'listings') && (
            <div className="space-y-6 pt-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#122525]">Your Active Properties Grid</h2>
                  <p className="text-xs text-[var(--text-secondary)]">Manage listings and 4K video walkthrough links.</p>
                </div>
                <button onClick={onOpenHostPortal} className="btn-secondary text-xs px-4 py-2">
                  <PlusCircle className="w-4 h-4" /> Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-[28px] overflow-hidden border border-[var(--border-medium)] shadow-sm space-y-3 p-4 flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3">
                        <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 badge-gold text-[10px]">Verified Landlord</span>
                      </div>
                      <h4 className="font-bold text-base text-[#122525] line-clamp-1">{prop.title}</h4>
                      <p className="text-xs text-[var(--text-muted)] mb-2">{prop.location}</p>
                      <div className="text-base font-extrabold text-[var(--teal-blue)]">${prop.price} /{prop.pricePeriod}</div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)] gap-2">
                      <button 
                        onClick={() => onSelectProperty(prop)} 
                        className="flex-1 btn-secondary text-xs py-2 justify-center"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button 
                        onClick={() => onOpenChatWithHost(prop)} 
                        className="flex-1 btn-primary text-xs py-2 justify-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Messages
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
