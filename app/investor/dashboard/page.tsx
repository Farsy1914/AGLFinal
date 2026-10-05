'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function InvestorDashboardPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Real DB States
  const [investments, setInvestments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real invested projects from MongoDB
  useEffect(() => {
    async function fetchInvestorData() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/investments', { cache: 'no-store' });
        const data = await res.json();

        if (data.success) {
          // Filter projects that have raisedAmount > 0 (Active investments)
          const fundedList = data.data.filter((proj: any) => (proj.raisedAmount || 0) > 0);
          setInvestments(fundedList);
        }
      } catch (err) {
        console.error('Error fetching investor dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvestorData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Calculate Real Portfolio Metrics
  const totalInvested = investments.reduce((sum, item) => sum + (Number(item.raisedAmount) || 0), 0);

  // Projected Returns = RaisedAmount + (RaisedAmount * (ROI % / 100))
  const expectedReturns = investments.reduce((sum, item) => {
    const raised = Number(item.raisedAmount) || 0;
    const roi = Number(item.roiPercentage) || 0;
    return sum + (raised + (raised * (roi / 100)));
  }, 0);

  const activeProjectsCount = investments.length;

  const avgRoi =
    activeProjectsCount > 0
      ? (investments.reduce((sum, item) => sum + (Number(item.roiPercentage) || 0), 0) / activeProjectsCount).toFixed(1)
      : '0';

  const t = {
    EN: {
      title: '💼 Investor Finance Dashboard',
      subtitle: 'Overview of your active farm funding, expected returns, and ongoing harvests.',
      totalInvested: 'Total Capital Invested',
      expectedReturns: 'Projected Total Returns',
      activeProjects: 'Active Projects Funded',
      avgRoi: 'Average Portfolio ROI',
      myInvestments: 'My Active Investments',
      projectTitle: 'Farm Campaign',
      farmer: 'Farmer',
      amountInvested: 'Raised / Invested',
      projectedReturn: 'Projected ROI %',
      duration: 'Cycle Duration',
      status: 'Status',
      browseMore: '🌱 Explore Open Farm Campaigns',
      loading: 'Fetching portfolio analytics from MongoDB...',
      noData: 'No active investments found in your portfolio.',
    },
    BN: {
      title: '💼 বিনিয়োগকারী ড্যাশবোর্ড',
      subtitle: 'আপনার খামার বিনিয়োগ, আনুমানিক রিটার্ন এবং চলমান প্রজেক্টের সামারি।',
      totalInvested: 'মোট বিনিয়োগকৃত মূলধন',
      expectedReturns: 'সম্ভাব্য মোট রিটার্ন',
      activeProjects: 'সক্রিয় ফান্ডেড প্রজেক্ট',
      avgRoi: 'গড় পোর্টফোলিও আরএওআই (ROI)',
      myInvestments: 'আমার সক্রিয় বিনিয়োগসমূহ',
      projectTitle: 'খামার ক্যাম্পেইন',
      farmer: 'কৃষক',
      amountInvested: 'সংগৃহীত / বিনিয়োগ',
      projectedReturn: 'যাচাইকৃত ROI %',
      duration: 'মেয়াদ',
      status: 'স্ট্যাটাস',
      browseMore: '🌱 নতুন খামার প্রজেক্ট খুঁজুন',
      loading: 'ডাটাবেজ থেকে পোর্টফোলিও সামারি লোড হচ্ছে...',
      noData: 'আপনার কোনো সক্রিয় বিনিয়োগ পাওয়া যায়নি।',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar role="investor" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header>
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar} title="Open Navigation Menu">
              ☰
            </button>
            <div>
              <h2 className="text-2xl font-bold">{t.title}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{t.subtitle}</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="icon-btn" onClick={toggleLanguage} title="Switch Language">
              🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span>
            </button>

            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <div className="avatar" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}>
              INV
            </div>
          </div>
        </header>

        {/* Real Portfolio Stats Grid */}
        <section
          className="grid-stats"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}
        >
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '6px' }}>{t.totalInvested}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
              ৳{isLoading ? '...' : totalInvested}
            </div>
          </div>

          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '6px' }}>{t.expectedReturns}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3b82f6' }}>
              ৳{isLoading ? '...' : Math.round(expectedReturns)}
            </div>
          </div>

          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '6px' }}>{t.activeProjects}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>
              {isLoading ? '...' : activeProjectsCount}
            </div>
          </div>

          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '6px' }}>{t.avgRoi}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
              {isLoading ? '...' : `+${avgRoi}%`}
            </div>
          </div>
        </section>

        {/* Active Investments Real Table */}
        <section className="card" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 className="text-lg font-bold">{t.myInvestments}</h3>
            {/* FIXED ROUTE LINK TO /investor/projects */}
            <Link href="/investor/projects" className="btn" style={{ textDecoration: 'none' }}>
              {t.browseMore}
            </Link>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.loading}
            </div>
          ) : investments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{t.noData}</p>
              {/* FIXED ROUTE LINK TO /investor/projects WITHOUT NESTED BUTTON */}
              <Link href="/investor/projects" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                {t.browseMore}
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t.projectTitle}</th>
                    <th>{t.farmer}</th>
                    <th>{t.amountInvested}</th>
                    <th>{t.projectedReturn}</th>
                    <th>{t.duration}</th>
                    <th>{t.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv) => (
                    <tr key={inv._id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{inv.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {inv.region}</div>
                      </td>
                      <td>👨‍🌾 {inv.farmerName}</td>
                      <td style={{ fontWeight: 700, color: '#10b981' }}>
                        ৳{inv.raisedAmount} / ৳{inv.targetAmount}
                      </td>
                      <td style={{ color: '#10b981', fontWeight: 800 }}>
                        +{inv.roiPercentage}% Annual
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{inv.durationMonths || 4} Months</td>
                      <td>
                        <span className={`badge ${inv.status === 'Funded' || inv.status === 'Completed' ? 'badge-info' : 'badge-success'}`}>
                          {inv.status === 'Funded' ? '🎉 Fully Funded' : '✅ Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}