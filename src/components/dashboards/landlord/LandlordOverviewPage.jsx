import React from 'react';
import { Building2, DollarSign, Eye, Clock, Calendar, PlusCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function LandlordOverviewPage({ 
  properties = [], 
  onSelectProperty, 
  onOpenHostPortal, 
  setActiveNav 
}) {
  const { user, profile } = useAuth();
  const displayName = user?.user_metadata?.full_name || profile?.full_name || user?.email?.split('@')[0] || 'Host';

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Booking Request Received',
      subtitle: 'The Skyview Horizon Penthouse (Dr. Julian Thorne)',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 'act-2',
      title: 'Escrow Payout Disbursed',
      subtitle: 'The Azure Waterfront Villa ($8,820.00)',
      time: 'Yesterday',
      status: 'completed'
    },
    {
      id: 'act-3',
      title: 'Property Listing Verified',
      subtitle: 'Minimalist Haus in Kensington',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in font-['Host_Grotesk']">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome back, {displayName}
        </h1>
      </div>

      {/* 5-COLUMN METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div onClick={() => setActiveNav('properties')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Listed Properties</span>
            <Building2 className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{properties.length}</div>
          <p className="text-[11px] text-slate-400 font-medium">Active listings</p>
        </div>

        <div onClick={() => setActiveNav('earnings')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Monthly Yield</span>
            <DollarSign className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">$24,850</div>
          <p className="text-[11px] text-slate-400 font-medium">Monthly revenue</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Property Views</span>
            <Eye className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">1,420</div>
          <p className="text-[11px] text-slate-400 font-medium">Total views this month</p>
        </div>

        <div onClick={() => setActiveNav('requests')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Pending Requests</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">2</div>
          <p className="text-[11px] text-slate-400 font-medium">Requests awaiting review</p>
        </div>

        <div onClick={() => setActiveNav('calendar')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Occupancy Rate</span>
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">94.2%</div>
          <p className="text-[11px] text-slate-400 font-medium">Portfolio occupancy</p>
        </div>
      </div>

      {/* TWO COLUMN LOWER CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900">Your Properties</h3>
            <button onClick={onOpenHostPortal} className="text-xs font-bold text-amber-700 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" /> Add Listing
            </button>
          </div>

          <div className="space-y-4">
            {properties.map((prop) => (
              <div 
                key={prop.id} 
                className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer"
                onClick={() => onSelectProperty(prop)}
              >
                <img src={prop.images[0]} alt={prop.title} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm text-slate-900">{prop.title}</h4>
                  <p className="text-xs text-slate-400">{prop.location} • ${prop.price}/{prop.pricePeriod}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900">Recent Activity</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <h5 className="font-bold text-slate-900">{act.title}</h5>
                  <p className="text-slate-500 font-medium">{act.subtitle}</p>
                  <span className="text-[10px] text-slate-400">{act.time}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full shrink-0">
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
