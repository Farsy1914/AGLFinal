'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function BuyerProfilePage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'business' | 'verification' | 'payout'>('info');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Anwar Hossain',
    companyName: 'Green Agro Wholesale Ltd.',
    phone: '+880 1711-223344',
    email: 'anwar@greenagro.bd',
    address: 'Kawran Bazar Wholesale Market, Dhaka',
    tradeLicenseNo: 'TRD-2026-9921',
    tinNo: 'TIN-8832-1102-44',
    nidNo: 'NID-1988269102384',
    nidDocUploaded: true,
    tradeLicenseUploaded: true,
    bankName: 'Dutch-Bangla Bank Ltd.',
    accountNo: '101.120.48210',
    preferredPayment: 'bKash Escrow',
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('✅ Buyer Profile and Verification Details Updated!');
    }, 1000);
  };

  const t = {
    EN: {
      title: '🛒 Buyer Profile & Verification Settings',
      subtitle: 'Manage wholesale business credentials, NID verification, and payment settings.',
      verified: '✓ Verified Wholesale Buyer',
      trustScore: 'Wholesale Trust Grade',
      totalPurchased: 'Total Volume Sourced',
      memberSince: 'Member Since',
      tabInfo: 'Personal & Company',
      tabBusiness: 'Business Details',
      tabVerification: 'KYC & Verification',
      tabPayout: 'Payment & Escrow',
      fullName: 'Buyer Representative Name',
      companyName: 'Company / Firm Name',
      phone: 'Phone Number',
      email: 'Email Address',
      address: 'Business Address / Warehouse',
      tradeLicenseNo: 'Trade License Number',
      tinNo: 'TIN / Tax Identification No.',
      nidNo: 'National ID (NID) Number',
      nidDoc: 'Upload NID Copy (Front & Back)',
      tradeDoc: 'Upload Trade License Copy',
      bankName: 'Bank Name',
      accountNo: 'Account Number',
      paymentMethod: 'Preferred Payment Method',
      saveChanges: '💾 Save Profile & Verification',
      saving: 'Saving Changes...',
      uploaded: '✓ Document Uploaded',
      uploadNew: '📁 Upload File',
    },
    BN: {
      title: '🛒 ক্রেতা প্রোফাইল ও ভেরিফিকেশন সেটিংস',
      subtitle: 'পাইকারি ব্যবসার তথ্য, এনআইডি ভেরিফিকেশন ও পেমেন্ট সেটিংস পরিচালনা করুন।',
      verified: '✓ যাচাইকৃত পাইকারি ক্রেতা',
      trustScore: 'ব্যবসা বিশ্বস্ততা গ্রেড',
      totalPurchased: 'মোট সংগৃহীত শস্য',
      memberSince: 'যুক্ত হয়েছেন',
      tabInfo: 'ব্যক্তিগত ও প্রতিষ্ঠান',
      tabBusiness: 'ব্যবসায়িক তথ্য',
      tabVerification: 'কেওয়াইসি ও ভেরিফিকেশন',
      tabPayout: 'পেমেন্ট ও এসক্রো',
      fullName: 'প্রতিনিধির নাম',
      companyName: 'কোম্পানি / প্রতিষ্ঠানের নাম',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল ঠিকানা',
      address: 'ব্যবসার ঠিকানা / আড়ত',
      tradeLicenseNo: 'ট্রেড লাইসেন্স নম্বর',
      tinNo: 'টিন (TIN) নম্বর',
      nidNo: 'জাতীয় পরিচয়পত্র (NID) নম্বর',
      nidDoc: 'এনআইডি ছবি আপলোড করুন',
      tradeDoc: 'ট্রেড লাইসেন্স কপি আপলোড',
      bankName: 'ব্যাংকের নাম',
      accountNo: 'অ্যাকাউন্ট নম্বর',
      paymentMethod: 'পছন্দসই পেমেন্ট মেথড',
      saveChanges: '💾 তথ্য সংরক্ষণ করুন',
      saving: 'সংরক্ষণ করা হচ্ছে...',
      uploaded: '✓ ফাইল আপলোড সম্পন্ন',
      uploadNew: '📁 ফাইল আপলোড করুন',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar role="buyer" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>BY</div>
          </div>
        </header>

        {/* Banner Section */}
        <section className="card" style={{ marginBottom: '24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '2rem', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>BY</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formData.companyName}</h2>
                  <span className="badge badge-success">{t.verified}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>👤 {formData.name} • 📍 {formData.address}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.trustScore}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>AAAA+</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.totalPurchased}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0284c7' }}>৫০,০০০+ kg</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Header */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', overflowX: 'auto' }}>
          {[
            { key: 'info', label: t.tabInfo, icon: '🏢' },
            { key: 'business', label: t.tabBusiness, icon: '📜' },
            { key: 'verification', label: t.tabVerification, icon: '🛡️' },
            { key: 'payout', label: t.tabPayout, icon: '💳' },
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
                background: activeTab === tab.key ? 'var(--primary-gradient)' : 'var(--surface)',
                color: activeTab === tab.key ? 'white' : 'var(--text)',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ width: '100%' }}>
          <section className="card">
            {activeTab === 'info' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.fullName}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.companyName}</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.phone}</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
              </div>
            )}

            {activeTab === 'business' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.tradeLicenseNo}</label>
                  <input type="text" name="tradeLicenseNo" value={formData.tradeLicenseNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.tinNo}</label>
                  <input type="text" name="tinNo" value={formData.tinNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.address}</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.nidNo} *</label>
                  <input type="text" name="nidNo" value={formData.nidNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>

                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.nidDoc}</label>
                  <div style={{ marginTop: '6px', padding: '10px', border: '1px dashed var(--border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>{t.uploaded}</span>
                    <button type="button" className="btn" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>{t.uploadNew}</button>
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.tradeDoc}</label>
                  <div style={{ marginTop: '6px', padding: '10px', border: '1px dashed var(--border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>{t.uploaded}</span>
                    <button type="button" className="btn" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>{t.uploadNew}</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payout' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.bankName}</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.accountNo}</label>
                  <input type="text" name="accountNo" value={formData.accountNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
              </div>
            )}

            <button type="submit" disabled={isSaving} className="btn" style={{ marginTop: '24px', padding: '12px 24px' }}>
              {isSaving ? t.saving : t.saveChanges}
            </button>
          </section>
        </form>
      </main>
    </div>
  );
}