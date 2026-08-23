import React from 'react';
import { Heart, Home, Eye, MessageSquare, Calendar, ChevronRight } from 'lucide-react';

export default function UserOverviewPage({ 
  wishlistProperties = [], 
  onSelectProperty, 
  setActiveNav, 
  onReturnToPublic 
}) {
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Sent Inquiry',
      subtitle: 'The Skyview Horizon Penthouse',
      time: 'less than a minute ago',
      status: 'completed'
    },
    {
      id: 'act-2',
      title: 'Scheduled Viewing',
      subtitle: 'The Skyview Horizon Penthouse',
      time: 'less than a minute ago',
      status: 'completed'
    },
    {
      id: 'act-3',
      title: 'Viewed Property',
      subtitle: 'The Skyview Horizon Penthouse',
      time: 'less than a minute ago',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome back, admin
        </h1>
      </div>

      {/* 5-COLUMN METRIC CARDS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div onClick={() => setActiveNav('saved')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Saved Properties</span>
            <Heart className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{wishlistProperties.length > 0 ? wishlistProperties.length : 1}</div>
          <p className="text-[11px] text-slate-400 font-medium">Properties you've saved</p>
        </div>

        <div onClick={() => setActiveNav('properties')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Listed Properties</span>
            <Home className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">3</div>
          <p className="text-[11px] text-slate-400 font-medium">Properties you've listed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Property Views</span>
            <Eye className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">1</div>
          <p className="text-[11px] text-slate-400 font-medium">Properties you've viewed</p>
        </div>

        <div onClick={() => setActiveNav('messages')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Inquiries Sent</span>
            <MessageSquare className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">1</div>
          <p className="text-[11px] text-slate-400 font-medium">Inquiries you've sent</p>
        </div>

        <div onClick={() => setActiveNav('appointments')} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Scheduled Tours</span>
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">1</div>
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
                  <img src={prop.images[0]} alt={prop.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-slate-900">{prop.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Saved on 23/08/2026</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))
            ) : (
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer" onClick={onReturnToPublic}>
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80" alt="Luxury 5-Bedroom Villa" className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm text-slate-900">Luxury 5-Bedroom Villa</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Saved on 23/08/2026</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
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
