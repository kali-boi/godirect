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
  Edit3, 
  Trash2, 
  Sparkles,
  ArrowUpRight,
  Filter,
  Search
} from 'lucide-react';

export default function HostDashboard({ 
  properties, 
  onOpenHostPortal, 
  onOpenChatWithHost,
  onSelectProperty 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'listings' | 'requests' | 'earnings'
  
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

  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      
      {/* Dashboard Top Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--deep-teal)] via-[#162d2d] to-[#018f8b] text-white shadow-xl border border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--mellow-gold)] text-xs font-semibold backdrop-blur-md border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Landlord Command Center</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Welcome back, Host Portal
          </h1>
          <p className="text-sm text-teal-100/80">
            Manage your rental listings, approve direct guest requests, and monitor your 0% commission earnings.
          </p>
        </div>

        <button
          onClick={onOpenHostPortal}
          className="btn-gold px-6 py-3.5 text-sm font-bold shadow-xl shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>List New Property</span>
        </button>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--text-primary)]">$39,390</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Properties</span>
            <div className="p-2 rounded-xl bg-[var(--teal-blue)]/15 text-[var(--teal-blue)]">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--text-primary)]">{properties.length}</div>
          <div className="text-xs text-[var(--text-secondary)]">100% Verified & Live on Grid</div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Pending Bookings</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[var(--text-primary)]">
            {requests.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-xs text-amber-600 font-semibold">Requires Landlord Review</div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-sm space-y-2">
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

      {/* Dashboard Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-[var(--deep-teal)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
          }`}
        >
          Overview & Activity
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'listings'
              ? 'bg-[var(--deep-teal)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
          }`}
        >
          Your Listings ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'bg-[var(--deep-teal)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
          }`}
        >
          <span>Reservation Requests</span>
          <span className="bg-[var(--mellow-gold)] text-white text-[10px] px-2 py-0.5 rounded-full">
            {requests.filter(r => r.status === 'pending').length}
          </span>
        </button>
      </div>

      {/* Tab 1: Overview & Pending Requests */}
      {(activeTab === 'overview' || activeTab === 'requests') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Pending Guest Reservations</h2>
              <p className="text-xs text-[var(--text-secondary)]">Direct booking requests waiting for your host confirmation.</p>
            </div>
          </div>

          <div className="space-y-4">
            {requests.map((req) => (
              <div 
                key={req.id} 
                className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-[var(--teal-blue)]"
              >
                <div className="flex items-center gap-4">
                  <img src={req.guestAvatar} alt={req.guestName} className="w-12 h-12 rounded-full object-cover border border-[var(--teal-blue)]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[var(--text-primary)]">{req.guestName}</h4>
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
                    <div className="text-lg font-extrabold text-[var(--text-primary)]">${req.totalAmount.toLocaleString()}</div>
                    <span className="badge-teal text-[10px]">Direct Escrow</span>
                  </div>

                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveRequest(req.id)}
                        className="btn-primary text-xs px-4 py-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(req.id)}
                        className="btn-secondary text-xs px-3 py-2 text-red-500 hover:border-red-500"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
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

      {/* Tab 2: Your Listings */}
      {(activeTab === 'overview' || activeTab === 'listings') && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Your Active Properties Grid</h2>
              <p className="text-xs text-[var(--text-secondary)]">Listed on GoDirect with 4K video walkthrough support.</p>
            </div>
            <button onClick={onOpenHostPortal} className="btn-secondary text-xs px-4 py-2">
              <PlusCircle className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-medium)] shadow-sm space-y-3 p-4 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 badge-gold text-[10px]">Verified Landlord</span>
                  </div>
                  <h4 className="font-bold text-base text-[var(--text-primary)] line-clamp-1">{prop.title}</h4>
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

    </div>
  );
}
