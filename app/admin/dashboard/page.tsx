'use client';

import { useState, useEffect } from 'react';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function AdminDashboardPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFarmers: 0,
    totalInvestors: 0,
    totalAnalysts: 0,
    activeProjects: 0,
    totalFundsRaised: 0,
    pendingApprovals: 0,
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const fetchDashboardData = async () => {
    setIsFetchingData(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Error fetching stats:", e);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/seed');
      if (res.ok) {
        alert('Database Seeded Successfully!');
        fetchDashboardData();
      }
    } catch (e) {
      alert('Error seeding database.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="farmer-container">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header>
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar} title="Open Menu">☰</button>
            <div>
              <h2 className="text-2xl font-bold">⚙️ Admin Dashboard</h2>
              <p style={{ color: 'var(--text-muted)' }}>System overview and control center</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="icon-btn" onClick={toggleLanguage}>🌐 {lang}</button>
            <button className="icon-btn" onClick={toggleTheme}>{isDarkMode ? '☀️' : '🌙'}</button>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>ADM</div>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Users</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>{isFetchingData ? '...' : stats.totalUsers}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Projects</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>{isFetchingData ? '...' : stats.activeProjects}</div>
          </div>
        </section>

        <button onClick={handleSeed} disabled={isLoading} className="btn" style={{ background: 'var(--primary-gradient)', padding: '12px 20px' }}>
          {isLoading ? 'Seeding...' : 'Run Seed Data (/api/seed)'}
        </button>
      </main>
    </div>
  );
}