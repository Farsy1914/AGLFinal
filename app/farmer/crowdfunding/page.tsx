'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function CrowdfundingPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Project Form State
  const [formData, setFormData] = useState({
    farmerName: 'Motiur Rahman',
    farmerPhone: '01711223344',
    title: '',
    cropName: 'Potato',
    region: 'Bogura',
    landAreaAcres: '',
    targetAmount: '',
    durationMonths: '4',
  });

  // Fetch Real Investment Campaigns from MongoDB
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/investments', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching investments:', err);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Submit New Investment Campaign
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        landAreaAcres: Number(formData.landAreaAcres),
        targetAmount: Number(formData.targetAmount),
        durationMonths: Number(formData.durationMonths),
      };

      const res = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert('🎉 New Crowdfunding Request Submitted! Sent to AgriAnalyst for Verification.');
        setShowModal(false);
        setFormData({
          farmerName: 'Motiur Rahman',
          farmerPhone: '01711223344',
          title: '',
          cropName: 'Potato',
          region: 'Bogura',
          landAreaAcres: '',
          targetAmount: '',
          durationMonths: '4',
        });
        fetchProjects();
      } else {
        alert(`❌ Submission failed: ${data.error}`);
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = {
    EN: {
      crowdfunding: 'Crowdfunding & Investments',
      title: 'Farm Crowdfunding Campaigns',
      subtitle: 'Manage your farm investment campaigns and live funding progress.',
      addNewProject: '+ Request New Funding',
      target: 'Target:',
      raised: 'Raised:',
      investors: 'Investors',
      daysLeft: 'Duration',
      Active: 'Approved / Active',
      Completed: 'Funded',
      Pending: 'Pending Review',
      calculatedRoi: 'Analyst Projected ROI:',
    },
    BN: {
      crowdfunding: 'ক্রাউডফান্ডিং ও বিনিয়োগ',
      title: 'খামার ক্রাউডফান্ডিং প্রকল্প',
      subtitle: 'আপনার খামার বিনিয়োগ ক্যাম্পেইন এবং লাইভ ফান্ডিংয়ের অগ্রগতি পরিচালনা করুন।',
      addNewProject: '+ নতুন ফান্ডিং আবেদন',
      target: 'লক্ষ্য:',
      raised: 'সংগৃহীত:',
      investors: 'বিনিয়োগকারী',
      daysLeft: 'মেয়াদ',
      Active: 'অনুমোদিত / চলমান',
      Completed: 'ফান্ডেড',
      Pending: 'রিভিউর অপেক্ষায়',
      calculatedRoi: 'এনালিস্ট আনুমানিক ROI:',
    },
  }[lang];

  const getStatusBadge = (status: string) => {
    if (status === 'Approved' || status === 'Active') return 'badge-success';
    if (status === 'Funded' || status === 'Completed') return 'badge-info';
    return 'badge-warning';
  };

  const getStatusText = (status: string) => {
    if (status === 'Approved' || status === 'Active') return t.Active;
    if (status === 'Funded' || status === 'Completed') return t.Completed;
    return t.Pending;
  };

  return (
    <div className="farmer-container">
      <Sidebar role="farmer" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
            <button className="icon-btn" onClick={toggleLanguage}>
              🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
              FM
            </div>
          </div>
        </header>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', marginTop: '20px' }}>
          <h3 className="text-lg font-bold">{t.crowdfunding}</h3>
          <button className="btn" onClick={() => setShowModal(true)}>
            {t.addNewProject}
          </button>
        </div>

        {/* Real-time Campaign Cards Display */}
        {isLoading ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Loading real-time investment proposals...
          </div>
        ) : projects.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            No crowdfunding proposals found in database. Click <strong>{t.addNewProject}</strong> to apply!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {projects.map((project: any) => {
              const raised = Number(project.raisedAmount || 0);
              const target = Number(project.targetAmount || 1);
              const progress = Math.min(100, Math.round((raised / target) * 100));

              return (
                <div key={project._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{project.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {project.region} ({project.landAreaAcres} Acres)</div>
                    </div>
                    <span className={`badge ${getStatusBadge(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  {/* ROI Badge */}
                  {project.roiPercentage ? (
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.calculatedRoi}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>
                        +{project.roiPercentage}% Projected Return
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.85rem', color: '#f59e0b' }}>
                      ⏳ Pending Analyst Regional Yield Evaluation
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>{t.target}</span>{' '}
                      <strong>৳{project.targetAmount}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>{t.raised}</span>{' '}
                      <strong style={{ color: '#10b981' }}>৳{raised}</strong>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                      <span>{progress}% Funded</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: '#10b981' }}></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <div>👥 1 Investors</div>
                    <div>⏳ {project.durationMonths || 4} Months Cycle</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Pop-up */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
            <div style={{ background: '#ffffff', color: '#1e293b', width: '90%', maxWidth: '500px', borderRadius: '14px', padding: '24px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              
              <button
                onClick={() => setShowModal(false)}
                title="Close"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#fee2e2',
                  color: '#ef4444',
                  border: '1px solid #fca5a5',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                ✕
              </button>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: '#0f172a', paddingRight: '40px' }}>
                🌾 Request New Crowdfunding Campaign
              </h3>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Campaign Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Potato Farming Project"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontWeight: 600 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Crop Type:</label>
                    <select
                      value={formData.cropName}
                      onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontWeight: 600 }}
                    >
                      <option value="Potato">Potato / আলু</option>
                      <option value="Aman Rice">Aman Rice / আমন ধান</option>
                      <option value="Tomato">Tomato / টমেটো</option>
                      <option value="Maize">Maize / ভুট্টা</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Region:</label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontWeight: 600 }}
                    >
                      <option value="Bogura">Bogura / বগুড়া</option>
                      <option value="Dinajpur">Dinajpur / দিনাজপুর</option>
                      <option value="Jashore">Jashore / যশোর</option>
                      <option value="Mymensingh">Mymensingh / ময়মনসিংহ</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Land Area (Acres):</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="2.5"
                      value={formData.landAreaAcres}
                      onChange={(e) => setFormData({ ...formData, landAreaAcres: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Target Fund (৳):</label>
                    <input
                      type="number"
                      required
                      placeholder="150000"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontWeight: 600 }}
                    />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn" style={{ marginTop: '12px', padding: '12px', justifyContent: 'center', fontSize: '1rem' }}>
                  {isSubmitting ? 'Submitting...' : '🚀 Submit Request for Verification'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}