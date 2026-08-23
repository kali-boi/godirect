import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Search, 
  Lock, 
  Sparkles,
  ArrowRight,
  Server,
  BarChart3,
  Bell,
  Settings,
  Home,
  Globe
} from 'lucide-react';

export default function AdminDashboard({ 
  properties, 
  onReturnToPublic 
}) {
  const [activePage, setActivePage] = useState('verifications'); // 'analytics' | 'verifications' | 'listings' | 'users' | 'escrow'
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
    },
    {
      id: 'ver-903',
      landlordName: 'Chief Adebayo Okonjo',
      email: 'adebayo@ikoyicrest.com',
      docType: 'Lagos State C of O & National ID',
      submittedDate: 'Aug 20, 2026',
      status: 'verified',
      propertyTitle: 'Ikoyi Crest Waterfront Estate'
    }
  ]);

  const handleApprove = (id) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'verified' } : v));
  };

  const handleReject = (id) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'rejected' } : v));
  };

  const sidebarLinks = [
    { id: 'verifications', label: 'Deed Verifications', icon: ShieldCheck, badge: verifications.filter(v => v.status === 'pending').length },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'listings', label: 'All Listings Manager', icon: Building2, badge: properties.length },
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'escrow', label: 'Escrow Security', icon: Lock },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-[#fffafa] text-[#122525] font-['Host_Grotesk'] overflow-hidden">
      
      {/* 📌 DEDICATED DEEP TEAL SUPER ADMIN SIDEBAR (UNIFIED BRAND THEME) */}
      <aside className="w-64 bg-[#122525] text-white flex flex-col justify-between p-4 border-r border-[#1a3535] shrink-0 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-2 cursor-pointer" onClick={onReturnToPublic}>
            <img
              src="/images/logo.png"
              alt="GoDirect Logo"
              className="h-9 w-auto object-contain filter brightness-110"
            />
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider">
              Admin Portal
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
        <div className="pt-4 border-t border-[#1a3535]">
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
        
        {/* DEDICATED SUPER ADMIN TOPBAR */}
        <header className="h-20 bg-white border-b border-[var(--border-light)] px-8 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3 w-96 bg-[var(--bg-elevated)] px-4 py-2.5 rounded-2xl border border-[var(--border-light)]">
            <Search className="w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search deeds, landlord profiles, transactions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-[#122525] outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 text-xs font-semibold">
              <Server className="w-3.5 h-3.5" />
              <span>All Systems Operational</span>
            </div>

            <button className="relative p-2.5 rounded-full bg-[var(--bg-elevated)] text-[#122525] border border-[var(--border-light)]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--mellow-gold)]" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-[var(--border-light)]">
              <div className="w-9 h-9 rounded-full bg-[var(--mellow-gold)] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                SA
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#122525]">System Admin</div>
                <div className="text-[10px] text-[var(--golden-brown)] font-bold">Super Governance</div>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE BODY */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Global Platform Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Gross Booking Volume</span>
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">$1,248,500</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.1% MoM GMV</span>
              </div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Verified Landlords</span>
                <div className="p-2 rounded-xl bg-[var(--teal-blue)]/15 text-[var(--teal-blue)]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">312</div>
              <div className="text-xs text-[var(--text-secondary)]">Property Owners Active</div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Guests</span>
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">4,850</div>
              <div className="text-xs text-[var(--text-secondary)]">Registered Renters</div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Verification Queue</span>
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#122525]">
                {verifications.filter(v => v.status === 'pending').length}
              </div>
              <div className="text-xs text-amber-600 font-semibold">Requires Admin Deed Review</div>
            </div>
          </div>

          {/* Page 1: Deed Verification Queue */}
          {(activePage === 'verifications' || activePage === 'analytics') && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#122525]">Landlord Title Deed Verification Queue</h2>
                  <p className="text-xs text-[var(--text-secondary)]">Review title deeds and government identity documents before properties go live.</p>
                </div>
              </div>

              <div className="bg-white rounded-[28px] border border-[var(--border-medium)] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--bg-elevated)] text-[var(--text-muted)] uppercase tracking-wider font-bold border-b border-[var(--border-light)]">
                      <tr>
                        <th className="p-4">Landlord & Property</th>
                        <th className="p-4">Document Type Submitted</th>
                        <th className="p-4">Submission Date</th>
                        <th className="p-4">Verification Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)] font-medium text-[#122525]">
                      {verifications.map((item) => (
                        <tr key={item.id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-sm text-[#122525]">{item.landlordName}</div>
                            <div className="text-[var(--teal-blue)] font-semibold">{item.propertyTitle}</div>
                            <div className="text-[10px] text-[var(--text-muted)]">{item.email}</div>
                          </td>
                          <td className="p-4 font-semibold text-[var(--text-secondary)]">
                            <div className="flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-[var(--mellow-gold)]" />
                              <span>{item.docType}</span>
                            </div>
                          </td>
                          <td className="p-4 text-[var(--text-muted)]">{item.submittedDate}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize ${
                              item.status === 'verified' ? 'bg-emerald-500/15 text-emerald-600' :
                              item.status === 'rejected' ? 'bg-red-500/15 text-red-600' :
                              'bg-amber-500/15 text-amber-600'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {item.status === 'pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleApprove(item.id)}
                                  className="btn-primary text-xs px-3 py-1.5"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  className="btn-secondary text-xs px-3 py-1.5 text-red-500"
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-[var(--text-muted)] italic">Action Complete</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Page 3: All Listings Manager */}
          {activePage === 'listings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-[#122525] font-['Host_Grotesk']">All Platform Marketplace Listings ({properties.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <div key={p.id} className="p-4 rounded-[28px] bg-white border border-[var(--border-medium)] shadow-sm space-y-2">
                    <img src={p.images[0]} alt={p.title} className="w-full h-40 rounded-2xl object-cover" />
                    <div className="font-bold text-sm text-[#122525]">{p.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{p.location}</div>
                    <div className="text-xs font-bold text-[var(--teal-blue)]">${p.price} /{p.pricePeriod}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page 4: User Directory */}
          {activePage === 'users' && (
            <div className="p-8 rounded-[28px] bg-white border border-[var(--border-medium)] space-y-4 animate-fade-in">
              <Users className="w-10 h-10 text-[var(--teal-blue)]" />
              <h2 className="text-xl font-bold text-[#122525] font-['Host_Grotesk']">Global Users & Landlords Directory</h2>
              <p className="text-xs text-[var(--text-secondary)]">Manage user permissions, landlord identity badges, and compliance status.</p>
            </div>
          )}

          {/* Page 5: Escrow Oversight */}
          {activePage === 'escrow' && (
            <div className="p-8 rounded-[28px] bg-white border border-[var(--border-medium)] space-y-4 animate-fade-in">
              <Lock className="w-10 h-10 text-emerald-500" />
              <h2 className="text-xl font-bold text-[#122525] font-['Host_Grotesk']">Escrow Payment Security Oversight</h2>
              <p className="text-xs text-[var(--text-secondary)]">Active escrow reserve: <strong>$1,248,500</strong> protected with automated release rules.</p>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
