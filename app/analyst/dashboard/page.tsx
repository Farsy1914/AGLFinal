'use client';

import { useState, useEffect } from 'react';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function AnalystDashboardPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [proposals, setProposals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/investments', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setProposals(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/analyst/approve/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analystNotes: 'Verified against regional crop yield & market prices.' }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`🎉 Approved! Calculated ROI: ${data.data.roiPercentage}%`);
        fetchProposals();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="farmer-container">
      <Sidebar role="analyst" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header>
          <div className="header-left">
            <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            <div>
              <h2 className="text-2xl font-bold">📊 AgriAnalyst Yield & ROI Verification Panel</h2>
              <p style={{ color: 'var(--text-muted)' }}>Review live farmer investment requests against historical regional crop yield data.</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="icon-btn" onClick={toggleLanguage}>
              🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        <section className="card" style={{ marginTop: '20px' }}>
          <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>Live Farmer Investment Proposals</h3>

          {isLoading ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>Loading pending investment requests...</p>
          ) : proposals.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px 0' }}>
              No investment proposals submitted yet by farmers.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Project & Crop</th>
                    <th>Region</th>
                    <th>Land Area</th>
                    <th>Target Fund</th>
                    <th>Status</th>
                    <th>Calculated ROI %</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((item) => (
                    <tr key={item._id}>
                      <td style={{ fontWeight: 600 }}>{item.farmerName}</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{item.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.cropName} ({item.durationMonths} Months)</div>
                      </td>
                      <td>📍 {item.region}</td>
                      <td>{item.landAreaAcres} Acres</td>
                      <td style={{ fontWeight: 700, color: '#10b981' }}>৳{item.targetAmount}</td>
                      <td>
                        <span className={`badge ${item.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: 800, color: '#0284c7' }}>
                        {item.roiPercentage ? `${item.roiPercentage}%` : 'Pending Assessment'}
                      </td>
                      <td>
                        {item.status === 'Pending' ? (
                          <button
                            onClick={() => handleApprove(item._id)}
                            disabled={processingId === item._id}
                            className="btn"
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                          >
                            {processingId === item._id ? 'Calculating...' : '⚡ Verify & Approve ROI'}
                          </button>
                        ) : (
                          <span style={{ color: '#10b981', fontWeight: 600 }}>✅ Approved</span>
                        )}
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