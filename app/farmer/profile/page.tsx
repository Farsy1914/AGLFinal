'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { farmerFullProfileData } from '@/app/data/mockData';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function FarmerProfilePage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'farm' | 'payout' | 'security'>('info');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: farmerFullProfileData.name,
    phone: farmerFullProfileData.phone,
    email: 'rahim.farmer@agrilink.bd',
    location: farmerFullProfileData.location,
    landSize: farmerFullProfileData.landSize,
    specialization: 'Organic Grains & Vegetables',
    payoutMethod: farmerFullProfileData.payoutMethod || 'bKash',
    payoutAccount: farmerFullProfileData.payoutAccount,
    currentPassword: '',
    newPassword: '',
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const profile = farmerFullProfileData;

  // Type-Safe Input Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('✅ Profile details updated successfully!');
    }, 1000);
  };

  const t = {
    EN: {
      title: '👤 Farmer Profile & Account Settings',
      subtitle: 'Manage your public showcase, farm credentials, verification, and payout preferences.',
      verified: '✓ Verified NID Farmer',
      trustRating: 'Trust Rating',
      totalHarvest: 'Total Harvest Sold',
      projects: 'Successful Campaigns',
      memberSince: 'Member Since',
      tabInfo: 'Personal Info',
      tabFarm: 'Farm & Land Specs',
      tabPayout: 'Payout Methods',
      tabSecurity: 'Account Security',
      fullName: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      location: 'Farm Location / Division',
      landSize: 'Total Cultivated Land',
      specialization: 'Crop Specialization',
      payoutMethod: 'Preferred Payout Channel',
      payoutAccount: 'Bkash / Nagad / Bank Account No.',
      currPass: 'Current Password',
      newPass: 'New Password',
      saveChanges: '💾 Save Profile Changes',
      saving: 'Saving Changes...',
    },
    BN: {
      title: '👤 কৃষক প্রোফাইল ও অ্যাকাউন্ট সেটিংস',
      subtitle: 'আপনার খামারের তথ্য, ভেরিফিকেশন কার্ড, পেমেন্ট সেটিংস ও সিকিউরিটি পরিচালনা করুন।',
      verified: '✓ এনআইডি যাচাইকৃত কৃষক',
      trustRating: 'বিশ্বস্ততা রেটিং',
      totalHarvest: 'মোট বিক্রি করা ফসল',
      projects: 'সফল ক্যাম্পেইন',
      memberSince: 'যুক্ত হয়েছেন',
      tabInfo: 'ব্যক্তিগত তথ্য',
      tabFarm: 'খামার ও জমি',
      tabPayout: 'পেমেন্ট মেথড',
      tabSecurity: 'সিকিউরিটি',
      fullName: 'সম্পূর্ণ নাম',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল ঠিকানা',
      location: 'খামারের অবস্থান / বিভাগ',
      landSize: 'মোট চাষযোগ্য জমি',
      specialization: 'প্রধান উৎপাদিত ফসল',
      payoutMethod: 'পছন্দসই পেমেন্ট মেথড',
      payoutAccount: 'বিকাশ / নগদ / ব্যাংক অ্যাকাউন্ট নম্বর',
      currPass: 'বর্তমান পাসওয়ার্ড',
      newPass: 'নতুন পাসওয়ার্ড',
      saveChanges: '💾 পরিবর্তন সংরক্ষণ করুন',
      saving: 'সংরক্ষণ করা হচ্ছে...',
    },
  }[lang];

  return (
    <div className="farmer-container">
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

            <div className="avatar">RU</div>
          </div>
        </header>

        {/* Section 1: Showcase Header Banner */}
        <section className="card" style={{ marginBottom: '24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="avatar" style={{ width: '84px', height: '84px', fontSize: '2rem', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}>
                RU
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>{profile.name}</h2>
                  <span className="badge badge-success">{t.verified}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>📍 {profile.location} • {formData.specialization}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.trustRating}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#10b981' }}>⭐ {profile.rating} / 5.0</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.totalHarvest}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#10b981' }}>{profile.totalHarvestSold}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tabbed Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', overflowX: 'auto' }}>
          {[
            { key: 'info', label: t.tabInfo, icon: '👤' },
            { key: 'farm', label: t.tabFarm, icon: '🌾' },
            { key: 'payout', label: t.tabPayout, icon: '💳' },
            { key: 'security', label: t.tabSecurity, icon: '🔒' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.95rem',
                background: activeTab === tab.key ? 'var(--primary-gradient)' : 'var(--surface)',
                color: activeTab === tab.key ? 'white' : 'var(--text)',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Section 3: Dynamic Tab Forms */}
        <form onSubmit={handleSave} style={{ width: '100%' }}>
          <section className="card">
            {activeTab === 'info' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.fullName}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.phone}</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.location}</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'farm' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.landSize}</label>
                  <input
                    type="text"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.specialization}</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'payout' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.payoutMethod}</label>
                  <select
                    name="payoutMethod"
                    value={formData.payoutMethod}
                    onChange={handleSelectChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  >
                    <option value="bKash">bKash Merchant / Personal</option>
                    <option value="Nagad">Nagad Wallet</option>
                    <option value="Bank">DBBL / Islami Bank Account</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.payoutAccount}</label>
                  <input
                    type="text"
                    name="payoutAccount"
                    value={formData.payoutAccount}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.currPass}</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="••••••••"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.newPass}</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="••••••••"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="btn"
              style={{ marginTop: '24px', padding: '12px 24px', fontSize: '1rem' }}
            >
              {isSaving ? t.saving : t.saveChanges}
            </button>
          </section>
        </form>
      </main>
    </div>
  );
}