'use client';

import { useState } from 'react';
import { adminDashboardData } from '@/app/data/mockData';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function AdminUserManagementPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState(adminDashboardData.users);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleVerification = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, nidStatus: u.nidStatus === 'Verified' ? 'Pending' : 'Verified' }
          : u
      )
    );
  };

  const t = {
    EN: {
      title: '⚙️ Platform Administration & KYC Verification',
      subtitle: 'Manage system users, approve NID/Trade license documents, and monitor escrow volume.',
      totalUsers: 'Total Users Registered',
      pendingVerifications: 'Pending KYC Audits',
      escrowBalance: 'Total Escrow Vault Balance',
      activeListings: 'Active Crop Listings',
      userTableTitle: 'Registered Users & NID Verification Queue',
      name: 'Name / Organization',
      role: 'Role',
      contact: 'Contact Info',
      nidStatus: 'KYC / NID Status',
      joinDate: 'Joined Date',
      action: 'Action',
      Verified: 'Verified',
      Pending: 'Pending Audit',
      approveBtn: '✓ Approve KYC',
      revokeBtn: '✕ Revoke Approval',
    },
    BN: {
      title: '⚙️ প্ল্যাটফর্ম অ্যাডমিন ও কেওয়াইসি ভেরিফিকেশন',
      subtitle: 'ব্যবহারকারীদের তথ্য পরিচালনা, এনআইডি ও ট্রেড লাইসেন্স অ্যাপ্রুভ এবং এসক্রো ব্যালেন্স পর্যবেক্ষণ করুন।',
      totalUsers: 'মোট নিবন্ধিত ব্যবহারকারী',
      pendingVerifications: 'অপেক্ষমাণ কেওয়াইসি ভেরিফিকেশন',
      escrowBalance: 'মোট এসক্রো ভল্ট ব্যালেন্স',
      activeListings: 'সক্রিয় ফসলের পোস্ট',
      userTableTitle: 'ব্যবহারকারীদের তালিকা ও ভেরিফিকেশন স্ট্যাটাস',
      name: 'নাম / প্রতিষ্ঠান',
      role: 'রোল (Role)',
      contact: 'যোগাযোগের তথ্য',
      nidStatus: 'কেওয়াইসি / এনআইডি স্ট্যাটাস',
      joinDate: 'যোগদানের তারিখ',
      action: 'অ্যাকশন',
      Verified: 'যাচাইকৃত',
      Pending: 'রিভিউর অপেক্ষায়',
      approveBtn: '✓ অনুমোদন দিন',
      revokeBtn: '✕ বাতিল করুন',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header>
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar} title="Open Menu">☰</button>
            <div>
              <h2 className="text-2xl font-bold">{t.title}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{t.subtitle}</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="icon-btn" onClick={toggleLanguage}>🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span></button>
            <button className="icon-btn" onClick={toggleTheme}>{isDarkMode ? '☀️ Light' : '🌙 Dark'}</button>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>ADM</div>
          </div>
        </header>

        {/* System Stats Overview */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px', width: '100%' }}>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '4px' }}>{t.totalUsers}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{adminDashboardData.stats.totalUsers}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '4px' }}>{t.pendingVerifications}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>{adminDashboardData.stats.pendingVerifications}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '4px' }}>{t.escrowBalance}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7' }}>{adminDashboardData.stats.totalEscrowBalance}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '4px' }}>{t.activeListings}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed' }}>{adminDashboardData.stats.activeListings}</div>
          </div>
        </section>

        {/* User Management Table */}
        <section className="card" style={{ width: '100%' }}>
          <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.userTableTitle}</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t.name}</th>
                  <th>{t.role}</th>
                  <th>{t.contact}</th>
                  <th>{t.nidStatus}</th>
                  <th>{t.joinDate}</th>
                  <th>{t.action}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td><span className="badge badge-info">{u.role}</span></td>
                    <td style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{u.phone}<br />{u.email}</td>
                    <td>
                      <span className={`badge ${u.nidStatus === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                        {u.nidStatus === 'Verified' ? t.Verified : t.Pending}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{u.joinDate}</td>
                    <td>
                      <button
                        onClick={() => toggleVerification(u.id)}
                        className="btn"
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          background: u.nidStatus === 'Verified' ? 'rgba(239, 68, 68, 0.85)' : 'var(--primary-gradient)',
                        }}
                      >
                        {u.nidStatus === 'Verified' ? t.revokeBtn : t.approveBtn}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}