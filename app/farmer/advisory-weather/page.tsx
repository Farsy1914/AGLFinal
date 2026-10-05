'use client';

import { useState } from 'react';
import Link from 'next/link';
import { farmerDashboardData, weatherData, advisoryData } from '@/app/data/mockData';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function AdvisoryWeatherPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const profile = farmerDashboardData.profile;

  const t = {
    EN: {
      title: '🌦️ AI Farming Advisory & Weather Forecast',
      subtitle: 'Real-time regional weather updates and AI-driven crop protection insights.',
      weatherTitle: '7-Day Regional Weather Outlook',
      advisoryTitle: 'AI Smart Crop Advisories',
      humidity: 'Humidity:',
      Warning: 'Warning Alert',
      Recommendation: 'Recommendation',
      Info: 'Field Insight',
    },
    BN: {
      title: '🌦️ এআই কৃষি পরামর্শ ও আবহাওয়ার পূর্বাভাস',
      subtitle: 'রিয়েল-টাইম আবহাওয়া আপডেট এবং এআই চালিত ফসল সুরক্ষার দিকনির্দেশনা।',
      weatherTitle: '৭ দিনের আঞ্চলিক আবহাওয়ার পূর্বাভাস',
      advisoryTitle: 'এআই স্মার্ট কৃষি পরামর্শসমূহ',
      humidity: 'আর্দ্রতা:',
      Warning: 'সতর্কবার্তা',
      Recommendation: 'পরামর্শ',
      Info: 'ক্ষেতের পর্যবেক্ষণ',
    },
  }[lang];

  const getAlertBadge = (type: string) => {
    if (type === 'Warning') return 'badge-danger';
    if (type === 'Recommendation') return 'badge-warning';
    return 'badge-info';
  };

  return (
    <div className="farmer-container">
      {/* Reusable Overlay Sidebar */}
      <Sidebar
        role="farmer"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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

            <Link href="/farmer/profile">
              <div className="avatar">{profile.initials}</div>
            </Link>
          </div>
        </header>

        {/* Weather Forecast Section - Fixed Horizontal Compact Grid */}
        <section className="card" style={{ marginBottom: '24px', width: '100%' }}>
          <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.weatherTitle}</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            width: '100%'
          }}>
            {weatherData.map((item: any, idx: number) => (
              <div key={idx} style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '12px 8px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{item.icon}</div>
                <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.day}</h4>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', margin: '2px 0' }}>
                  {item.temp}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.2' }}>{item.condition}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  💧 {item.humidity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Advisories Section - Structured Balanced Grid */}
        <section className="card" style={{ width: '100%' }}>
          <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.advisoryTitle}</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            width: '100%'
          }}>
            {advisoryData.map((adv: any) => (
              <div key={adv.id} style={{
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '16px',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className={`badge ${getAlertBadge(adv.type)}`}>
                      {t[adv.type as keyof typeof t]}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{adv.date}</span>
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '6px' }}>{adv.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.4' }}>
                    {adv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}