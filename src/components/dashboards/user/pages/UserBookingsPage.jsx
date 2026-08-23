import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, ChevronRight, MapPin } from 'lucide-react';

export default function UserBookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: 'BKG-001',
      property: 'The Skyview Horizon Penthouse',
      location: 'Mayfair, London, UK',
      host: 'Eleanor Vance',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
      checkIn: 'Oct 12, 2026',
      checkOut: 'Oct 16, 2026',
      nights: 4,
      guests: 2,
      total: 3570,
      escrowStatus: 'held',
      status: 'upcoming',
      confirmationCode: 'GD-7291-MFR',
      checkInTime: '3:00 PM GMT',
      checkOutTime: '11:00 AM GMT',
      accessCode: '4821'
    },
    {
      id: 'BKG-002',
      property: 'The Azure Waterfront Villa',
      location: 'Jersey, Channel Islands',
      host: 'Eleanor Vance',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      checkIn: 'Nov 01, 2026',
      checkOut: 'Nov 07, 2026',
      nights: 6,
      guests: 8,
      total: 8820,
      escrowStatus: 'pending',
      status: 'upcoming',
      confirmationCode: 'GD-7288-JRS',
      checkInTime: '4:00 PM GMT',
      checkOutTime: '11:00 AM GMT',
      accessCode: null
    },
    {
      id: 'BKG-003',
      property: 'Eiffel View Executive Suite',
      location: '7th Arrondissement, Paris, France',
      host: 'Pierre Dupont',
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
      checkIn: 'Jul 14, 2026',
      checkOut: 'Jul 19, 2026',
      nights: 5,
      guests: 2,
      total: 4250,
      escrowStatus: 'released',
      status: 'completed',
      confirmationCode: 'GD-7110-PAR',
      checkInTime: '3:00 PM CET',
      checkOutTime: '11:00 AM CET',
      accessCode: null
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  const filtered = bookings.filter(b => b.status === activeTab);

  const escrowColors = {
    held: 'bg-amber-50 text-amber-800 border-amber-200',
    pending: 'bg-blue-50 text-blue-800 border-blue-200',
    released: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">My Bookings</h2>
        <p className="text-xs text-slate-500 mt-1">Upcoming stays, past reservations, check-in details, and booking confirmations.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            {tab.label}
            {tab.count > 0 && (
              <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                activeTab === tab.id ? 'bg-[#0B2545] text-white' : 'bg-slate-300 text-slate-600'
              }`}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-5">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs font-bold">No {activeTab} bookings.</div>
        )}

        {filtered.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Property image + basic info */}
            <div className="flex gap-4 p-5">
              <img src={b.image} alt={b.property} className="w-28 h-24 rounded-xl object-cover shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{b.property}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${escrowColors[b.escrowStatus]}`}>
                    Escrow: {b.escrowStatus}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  {b.location}
                </div>
                <p className="text-xs text-slate-500">
                  {b.checkIn} → {b.checkOut} • {b.nights} nights • {b.guests} guests
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-base text-slate-900">${b.total.toLocaleString()}</span>
                  <span className="text-[10px] font-mono text-slate-400">{b.confirmationCode}</span>
                </div>
              </div>
            </div>

            {/* Check-in details (upcoming only) */}
            {b.status === 'upcoming' && (
              <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Check-in</span>
                  <span className="text-xs font-bold text-slate-900">{b.checkInTime}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Check-out</span>
                  <span className="text-xs font-bold text-slate-900">{b.checkOutTime}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Host</span>
                  <span className="text-xs font-bold text-slate-900">{b.host}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Access Code</span>
                  {b.accessCode ? (
                    <span className="text-xs font-mono font-black text-emerald-700">{b.accessCode}</span>
                  ) : (
                    <span className="text-xs text-slate-400">Released at check-in</span>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-end gap-2">
              {b.status === 'upcoming' && (
                <>
                  <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">
                    View Receipt
                  </button>
                  <button className="px-4 py-1.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                    Message Host
                  </button>
                </>
              )}
              {b.status === 'completed' && (
                <>
                  <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">
                    Download Receipt
                  </button>
                  <button className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black">
                    Leave a Review
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
