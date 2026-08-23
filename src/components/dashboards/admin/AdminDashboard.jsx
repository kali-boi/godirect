import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminOverviewPage from './AdminOverviewPage';

export default function AdminDashboard({ 
  properties = [], 
  onReturnToPublic 
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const [verifications, setVerifications] = useState([
    {
      id: 'ver-901',
      landlordName: 'Lord George Sterling',
      email: 'george@sterlingestates.co.uk',
      docType: 'Mayfair Title Deed & Govt Passport',
      submittedDate: 'Today, 09:14 AM',
      status: 'pending',
      propertyTitle: 'Belgravia Terrace Residence'
    },
    {
      id: 'ver-902',
      landlordName: 'Fatima Al-Hassan',
      email: 'fatima@dubailux.ae',
      docType: 'Dubai Land Dept Ownership Certificate',
      submittedDate: 'Yesterday, 04:30 PM',
      status: 'pending',
      propertyTitle: 'Downtown Dubai Executive Suite'
    }
  ]);

  const handleApprove = (id) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'verified' } : v));
  };

  const pendingCount = verifications.filter(v => v.status === 'pending').length;

  const userDirectory = [
    { id: 'u-1', name: 'Alexander Wright', role: 'Renter', status: 'Verified', date: 'Joined 2024' },
    { id: 'u-2', name: 'Eleanor Vance', role: 'Host', status: 'Superhost', date: 'Joined 2022' },
    { id: 'u-3', name: 'Lord George Sterling', role: 'Host', status: 'Pending Deed', date: 'Joined 2026' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Host_Grotesk'] flex flex-col md:flex-row pb-20 md:pb-0">
      
      {/* SIDEBAR COMPONENT */}
      <AdminSidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        pendingVerificationsCount={pendingCount} 
        propertiesCount={properties.length} 
        onReturnToPublic={onReturnToPublic} 
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* HEADER COMPONENT */}
        <AdminHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          pendingCount={pendingCount} 
          setActiveNav={setActiveNav} 
          onReturnToPublic={onReturnToPublic} 
        />

        {/* BODY PAGES */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {activeNav === 'dashboard' && (
            <AdminOverviewPage 
              properties={properties} 
              verifications={verifications} 
              handleApprove={handleApprove} 
              setActiveNav={setActiveNav} 
            />
          )}

          {activeNav === 'verifications' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Title Deed Verification Queue</h2>
              <div className="space-y-4">
                {verifications.map((v) => (
                  <div key={v.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">{v.landlordName}</h4>
                        <p className="text-xs text-slate-500">{v.email} • Property: {v.propertyTitle}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{v.docType}</span>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-slate-100">
                      {v.status === 'pending' ? (
                        <button onClick={() => handleApprove(v.id)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs">
                          Approve Deed & Publish
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
                          Verified & Active
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'listings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">All Marketplace Listings ({properties.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-44 rounded-xl object-cover" />
                    <h3 className="font-bold text-base text-slate-900">{prop.title}</h3>
                    <p className="text-xs text-slate-500">{prop.location} • ${prop.price}/{prop.pricePeriod}</p>
                    <span className="text-[11px] font-bold text-emerald-600 block">✓ Verified Listing</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">User Directory (1,420 Registered)</h2>
              <div className="space-y-3">
                {userDirectory.map((u) => (
                  <div key={u.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{u.name}</h4>
                      <p className="text-xs text-slate-400">{u.role} • {u.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'escrow' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">Platform Escrow Vault Control</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Escrow GMV Vault</span>
                <div className="text-3xl font-black text-slate-900">$148,500.00</div>
                <p className="text-xs text-emerald-700 font-bold">✓ All financial accounts 100% balanced</p>
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="space-y-6 max-w-xl animate-fade-in">
              <h2 className="text-2xl font-black text-slate-900">System Settings</h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-900">Platform Commission Fee</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">0% (Zero Broker Fee)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Escrow Inspection Window</span>
                  <span className="text-xs font-mono font-bold text-slate-700">24 Hours Post Check-in</span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
