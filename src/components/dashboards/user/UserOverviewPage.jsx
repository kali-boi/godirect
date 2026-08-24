import React from 'react';
import { Heart, Home, Eye, MessageSquare, Calendar, ChevronRight, Bookmark } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function UserOverviewPage({ 
  wishlistProperties = [], 
  onSelectProperty, 
  setActiveNav, 
  onReturnToPublic 
}) {
  const { user, profile } = useAuth();
  const displayName = user?.user_metadata?.full_name || profile?.full_name || user?.email?.split('@')[0] || 'Guest';

  const recentActivities = [];

  return (
    <div className="space-y-8 animate-fade-in font-['Host_Grotesk']">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Welcome back, {displayName}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track your reservations, escrow payments, saved properties, and host inquiries.
        </p>
      </div>

      {/* 5-COLUMN METRIC CARDS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div onClick={() => setActiveNav('saved')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Saved Properties</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{wishlistProperties.length}</div>
          <p className="text-[11px] text-slate-400 font-medium">Properties you've saved</p>
        </div>

        <div onClick={() => setActiveNav('bookings')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Active Bookings</span>
            <Home className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">0</div>
          <p className="text-[11px] text-slate-400 font-medium">Upcoming verified stays</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Property Views</span>
            <Eye className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{wishlistProperties.length > 0 ? wishlistProperties.length : 0}</div>
          <p className="text-[11px] text-slate-400 font-medium">Properties explored</p>
        </div>

        <div onClick={() => setActiveNav('messages')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Inquiries Sent</span>
            <MessageSquare className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">0</div>
          <p className="text-[11px] text-slate-400 font-medium">Inquiries you've sent</p>
        </div>

        <div onClick={() => setActiveNav('appointments')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Scheduled Tours</span>
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">0</div>
          <p className="text-[11px] text-slate-400 font-medium">Scheduled property tours</p>
        </div>

      </div>

      {/* TWO-COLUMN LOWER CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Block: Saved Properties */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900">Saved Properties</h3>
            <button onClick={() => setActiveNav('saved')} className="text-xs font-bold text-slate-500 hover:text-slate-900">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {wishlistProperties.length > 0 ? (
              wishlistProperties.map((prop) => (
                <div key={prop.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer" onClick={() => onSelectProperty(prop)}>
                  <img src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'} alt={prop.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-slate-900">{prop.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{prop.location || 'Saved Property'}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 space-y-3">
                <Bookmark className="w-6 h-6 text-slate-300 mx-auto" />
                <p>No saved properties yet. Heart any listing on the marketplace to save it here.</p>
                <button onClick={onReturnToPublic} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Block: Recent Activity */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900">Recent Activity</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No recent activity recorded. Your inquiries, viewing tours, and bookings will appear here.
              </div>
            ) : (
              recentActivities.map((act) => (
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
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
