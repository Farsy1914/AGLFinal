'use client';

import { useState, useEffect } from 'react';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function InvestorFarmProjectsPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [approvedProjects, setApprovedProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);

  const fetchApprovedProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/investments', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        const filtered = data.data.filter(
          (proj: any) => proj.status === 'Approved' || proj.status === 'Funded' || proj.status === 'Completed'
        );
        setApprovedProjects(filtered);
      }
    } catch (err) {
      console.error('Error fetching farm projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedProjects();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleOpenModal = (project: any) => {
    const raised = Number(project.raisedAmount || 0);
    const target = Number(project.targetAmount || 1);
    const isCompleted = raised >= target || project.status === 'Funded' || project.status === 'Completed';

    if (isCompleted) {
      alert('🔒 This campaign is 100% Fully Funded! No further investment needed.');
      return;
    }

    setSelectedProject(project);
    setInvestAmount('');
  };

  const handleConfirmInvestment = async () => {
    if (!selectedProject || !investAmount || Number(investAmount) <= 0) {
      alert('Please enter a valid investment amount.');
      return;
    }

    const currentRaised = Number(selectedProject.raisedAmount || 0);
    const target = Number(selectedProject.targetAmount || 0);
    const remainingNeeded = target - currentRaised;

    if (Number(investAmount) > remainingNeeded) {
      alert(`❌ Maximum amount you can invest right now is ৳${remainingNeeded}`);
      return;
    }

    setIsInvesting(true);
    try {
      const newRaisedAmount = currentRaised + Number(investAmount);
      const isFull = newRaisedAmount >= target;
      const updatedStatus = isFull ? 'Funded' : 'Approved';

      // 1. Order log
      await fetch(`/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedProject.title,
          farmerName: selectedProject.farmerName,
          quantity: 1,
          totalPrice: Number(investAmount),
          paymentStatus: 'Invested',
          paymentMethod: 'bKash Escrow',
        }),
      });

      // 2. Update existing MongoDB document using _id
      const res = await fetch(`/api/investments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: selectedProject._id,
          raisedAmount: newRaisedAmount,
          status: updatedStatus,
        }),
      });

      const resData = await res.json();
      if (!resData.success) {
        throw new Error(resData.error || 'Failed to update database');
      }

      alert(
        isFull
          ? `🎉 Congratulations! ৳${investAmount} invested. The project "${selectedProject.title}" is now 100% FULLY FUNDED!`
          : `🎉 Successfully invested ৳${investAmount} in "${selectedProject.title}"!`
      );

      setSelectedProject(null);
      setInvestAmount('');
      await fetchApprovedProjects();
    } catch (err: any) {
      alert(`❌ Investment error: ${err.message}`);
    } finally {
      setIsInvesting(false);
    }
  };

  const t = {
    EN: {
      title: '🌱 Verified Farm Investment Projects',
      subtitle: 'Data-driven agricultural projects pre-verified by AgriAnalyst ROI assessment.',
      target: 'Target Required:',
      raised: 'Raised So Far:',
      remaining: 'Remaining Needed:',
      roi: 'AgriAnalyst Verified ROI:',
      yield: 'Expected Yield:',
      investBtn: '💼 Invest In Project',
      fundedBtn: '✅ Done (100% Fully Funded)',
      noProjects: 'No approved farm projects available right now.',
      loading: 'Loading data-backed farm projects from MongoDB...',
    },
    BN: {
      title: '🌱 যাচাইকৃত খামার বিনিয়োগ প্রকল্প',
      subtitle: 'AgriAnalyst দ্বারা ফলন ও ROI যাচাইকৃত নির্ভরযোগ্য কৃষি বিনিয়োগ প্রকল্পসমূহ।',
      target: 'মোট প্রয়োজনীয় ফান্ড:',
      raised: 'সংগৃহীত ফান্ড:',
      remaining: 'অবশিষ্ট প্রয়োজন:',
      roi: 'যাচাইকৃত আনুমানিক ROI:',
      yield: 'প্রত্যাশিত ফলন:',
      investBtn: '💼 বিনিয়োগ করুন',
      fundedBtn: '✅ সম্পন্ন (১০০% ফান্ডেড)',
      noProjects: 'বর্তমানে কোনো অনুমোদিত খামার প্রকল্প খালি নেই।',
      loading: 'ডাটাবেজ থেকে খামার প্রকল্প লোড হচ্ছে...',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar role="investor" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
            <button className="icon-btn" onClick={toggleLanguage}>
              🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
              IN
            </div>
          </div>
        </header>

        <section style={{ marginTop: '24px', width: '100%' }}>
          {isLoading ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.loading}
            </div>
          ) : approvedProjects.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.noProjects}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {approvedProjects.map((project) => {
                const raised = Number(project.raisedAmount || 0);
                const target = Number(project.targetAmount || 1);
                const remaining = Math.max(0, target - raised);
                const progress = Math.min(100, Math.round((raised / target) * 100));
                const isCompleted = progress >= 100 || project.status === 'Funded' || project.status === 'Completed';

                return (
                  <div
                    key={project._id}
                    className="card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                      opacity: isCompleted ? 0.85 : 1,
                      border: isCompleted ? '2px solid #10b981' : '1px solid var(--border)',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{project.title}</h3>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            👨‍🌾 {project.farmerName} • 📍 {project.region}
                          </div>
                        </div>
                        <span className={`badge ${isCompleted ? 'badge-info' : 'badge-success'}`}>
                          {isCompleted ? '🎉 Funded' : '✅ Verified'}
                        </span>
                      </div>

                      {/* ROI Badge */}
                      <div
                        style={{
                          background: 'rgba(16, 185, 129, 0.12)',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          marginBottom: '16px',
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.roi}</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                          +{project.roiPercentage}% Annual Return
                        </div>
                        {project.calculatedYieldKg && (
                          <div style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                            {t.yield} <strong>{project.calculatedYieldKg} kg</strong> ({project.cropName})
                          </div>
                        )}
                      </div>

                      {/* Amounts Info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{t.target}</span>
                          <strong style={{ color: 'var(--text)' }}>৳{target}</strong>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{t.raised}</span>
                          <strong style={{ color: '#10b981' }}>৳{raised}</strong>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{t.remaining}</span>
                          <strong style={{ color: remaining > 0 ? '#f59e0b' : '#10b981' }}>
                            {remaining > 0 ? `৳${remaining}` : '0 (Goal Reached)'}
                          </strong>
                        </div>
                      </div>

                      {/* Funding Progress Bar */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: isCompleted ? '#10b981' : 'var(--text)' }}>
                            {progress}% Funded
                          </span>
                          <span>{project.durationMonths} Months Duration</span>
                        </div>
                        <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${progress}%`,
                              height: '100%',
                              background: isCompleted ? '#10b981' : 'linear-gradient(90deg, #10b981, #0284c7)',
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenModal(project)}
                      disabled={isCompleted}
                      className="btn"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '10px',
                        fontSize: '0.95rem',
                        background: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'var(--primary-gradient)',
                        color: isCompleted ? '#10b981' : 'white',
                        cursor: isCompleted ? 'not-allowed' : 'pointer',
                        border: isCompleted ? '1px solid #10b981' : 'none',
                      }}
                    >
                      {isCompleted ? t.fundedBtn : t.investBtn}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Investment Pop-up Modal */}
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: 'var(--card-bg, #fff)',
                width: '90%',
                maxWidth: '440px',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                title="Exit / Close Modal"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>

              <h3 className="text-xl font-bold" style={{ marginBottom: '8px', paddingRight: '30px' }}>
                💼 Invest in Farm Campaign
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {selectedProject.title} ({selectedProject.region})
              </p>

              <div
                style={{
                  background: 'rgba(2, 132, 199, 0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div>Project Target: <strong>৳{selectedProject.targetAmount}</strong></div>
                <div>
                  Remaining Needed:{' '}
                  <strong style={{ color: '#f59e0b' }}>
                    ৳{Number(selectedProject.targetAmount) - Number(selectedProject.raisedAmount || 0)}
                  </strong>
                </div>
                <div>Projected Return: <strong style={{ color: '#10b981' }}>+{selectedProject.roiPercentage}%</strong></div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Enter Amount to Invest (৳):
                </label>
                <input
                  type="number"
                  placeholder={`Max: ৳${Number(selectedProject.targetAmount) - Number(selectedProject.raisedAmount || 0)}`}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmInvestment}
                  disabled={isInvesting}
                  className="btn"
                  style={{ flex: 2, justifyContent: 'center', padding: '12px', fontSize: '1rem' }}
                >
                  {isInvesting ? 'Processing...' : '🔒 Pay Escrow'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}