'use client';

import { useState } from 'react';
import { adminDashboardData } from '@/app/data/mockData';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function AdminDashboardPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/seed');
      if (res.ok) alert(lang === 'EN' ? 'Database Seeded Successfully!' : 'ডাটাবেজ সফলভাবে সিড করা হয়েছে!');
      else alert(lang === 'EN' ? 'Failed to seed database.' : 'ডাটাবেজ সিড করতে ব্যর্থ হয়েছে।');
    } catch (e) {
      alert(lang === 'EN' ? 'Error seeding database.' : 'ডাটাবেজ সিড করার সময় এরর হয়েছে।');
    } finally {
      setIsLoading(false);
    }
  };

  const t = {
    EN: {
      title: '⚙️ Admin Dashboard & System Control',
      subtitle: 'Real-time platform overview, analytics summary, seed execution, and pending approvals.',
      totalUsers: 'Total Users',
      totalInvestors: 'Total Investors',
      totalAnalysts: 'Total Analysts',
      activeProjects: 'Active Projects',
      fundsRaised: 'Total Funds Raised',
      pendingApprovals: 'Pending Approvals',
      projectsTableTitle: 'Pending Project Verification Queue',
      projectName: 'Project Name',
      farmerName: 'Farmer',
      goalAmount: 'Goal Amount',
      status: 'Status',
      actions: 'Actions',
      approveBtn: '✓ Approve',
      rejectBtn: '✕ Reject',
      systemActions: '⚡ System Operations',
      seedBtn: 'Run Database Seed (/api/seed)',
      seeding: 'Seeding Database...',
      underReview: 'Under Review',
    },
    BN: {
      title: '⚙️ অ্যাডমিন ড্যাশবোর্ড ও সিস্টেম কন্ট্রোল',
      subtitle: 'প্ল্যাটফর্মের রিয়েল-টাইম ওভারভিউ, সিড এক্সিকিউশন ও প্রজেক্ট ভেরিফিকেশন অনায়াসে পরিচালনা করুন।',
      totalUsers: 'মোট ইউজার',
      totalInvestors: 'মোট বিনিয়োগকারী',
      totalAnalysts: 'মোট এনালিস্ট',
      activeProjects: 'সক্রিয় প্রজেক্ট',
      fundsRaised: 'উত্তোলিত তহবিল',
      pendingApprovals: 'অপেক্ষমাণ অ্যাপ্রুভাল',
      projectsTableTitle: 'প্রজেক্ট ভেরিফিকেশন ও অনুমোদন সারি',
      projectName: 'প্রজেক্টের নাম',
      farmerName: 'কৃষক',
      goalAmount: 'লক্ষ্যমাত্রা',
      status: 'স্ট্যাটাস',
      actions: 'অ্যাকশন',
      approveBtn: '✓ অনুমোদন দিন',
      rejectBtn: '✕ বাতিল করুন',
      systemActions: '⚡ সিস্টেম অপারেশন',
      seedBtn: 'ডাটাবেজ সিড রান করুন (/api/seed)',
      seeding: 'সিড হচ্ছে...',
      underReview: 'রিভিউর অপেক্ষায়',
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

        {/* System Overview Stats Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px', width: '100%' }}>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{t.totalUsers}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>{adminDashboardData?.stats?.totalUsers || 120}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{t.totalInvestors}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7' }}>45</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{t.totalAnalysts}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7c3aed' }}>8</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{t.activeProjects}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>24</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{t.fundsRaised}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7' }}>৳15.5L</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{t.pendingApprovals}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b' }}>5</div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Left Side: Pending Approval Requests */}
          <section className="card" style={{ gridColumn: 'span 2' }}>
            <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.projectsTableTitle}</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t.projectName}</th>
                    <th>{t.farmerName}</th>
                    <th>{t.goalAmount}</th>
                    <th>{t.status}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Organic Paddy Farming</td>
                    <td>Abdul Karim</td>
                    <td style={{ fontWeight: 700 }}>৳ 1,50,000</td>
                    <td>
                      <span className="badge badge-warning">{t.underReview}</span>
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--primary-gradient)' }}
                      >
                        {t.approveBtn}
                      </button>
                      <button
                        className="btn"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.85)' }}
                      >
                        {t.rejectBtn}
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: 600 }}>Greenhouse Tomatoes</td>
                    <td>Rahim Uddin</td>
                    <td style={{ fontWeight: 700 }}>৳ 3,00,000</td>
                    <td>
                      <span className="badge badge-warning">{t.underReview}</span>
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--primary-gradient)' }}
                      >
                        {t.approveBtn}
                      </button>
                      <button
                        className="btn"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.85)' }}
                      >
                        {t.rejectBtn}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Right Side: Quick Operations */}
          <section className="card" style={{ height: 'fit-content' }}>
            <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.systemActions}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Populate initial regional market data or reset system benchmarks.
            </p>

            <button
              onClick={handleSeed}
              disabled={isLoading}
              className="btn"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                fontWeight: 600,
                background: 'var(--primary-gradient)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? t.seeding : t.seedBtn}
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}