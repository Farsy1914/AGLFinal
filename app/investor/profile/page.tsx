'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function InvestorProfilePage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'kyc' | 'financial' | 'payout'>('info');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Tariqul Islam',
    phone: '+880 1819-998877',
    email: 'tariqul.investor@agrilink.bd',
    address: 'Gulshan 2, Dhaka',
    nidNo: 'NID-1985261902831',
    tinNo: 'TIN-4412-9901-22',
    sourceOfFund: 'Business Profits / Salary',
    bankName: 'City Bank Ltd.',
    bankAccountNo: '110.298.11029',
    bKashNo: '01819998877',
    nidUploaded: true,
    tinUploaded: true,
    bankStatementUploaded: true,
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
      alert('✅ Investor Financial KYC & Profile Successfully Saved!');
    }, 1000);
  };

  const t = {
    EN: {
      title: '💼 Investor Verification & Profile Settings',
      subtitle: 'Manage financial credentials, NID/TIN verification, and profit payout channels.',
      verified: '✓ Certified Investor (KYC Verified)',
      riskCategory: 'Risk Tolerance',
      activeInvestments: 'Active Capital Deployed',
      tabInfo: 'Personal Profile',
      tabKyc: 'KYC & Identity Verification',
      tabFinancial: 'Financial Credentials',
      tabPayout: 'Profit Withdrawal Setup',
      fullName: 'Full Investor Name',
      phone: 'Phone Number',
      email: 'Email Address',
      address: 'Residential / Business Address',
      nidNo: 'National ID (NID) Number *',
      tinNo: 'E-TIN Registration Number *',
      sourceOfFund: 'Primary Source of Funds',
      bankName: 'Bank Name for ROI Transfer',
      bankAccountNo: 'Bank Account Number',
      bKashNo: 'bKash / Nagad Wallet No.',
      nidCopy: 'Upload NID Copy (PDF / Image)',
      tinCopy: 'Upload E-TIN Certificate',
      bankCopy: 'Upload Bank Statement / Cheque Leaf',
      saveChanges: '💾 Save Investor Verification',
      saving: 'Saving Changes...',
      uploaded: '✓ Verified File Uploaded',
      uploadNew: '📁 Upload Copy',
    },
    BN: {
      title: '💼 বিনিয়োগকারী ভেরিফিকেশন ও প্রোফাইল সেটিংস',
      subtitle: 'আর্থিক তথ্য, এনআইডি/টিন ভেরিফিকেশন এবং লভ্যাংশ গ্রহণের অ্যাকাউন্ট সেটিংস।',
      verified: '✓ সার্টিফাইড বিনিয়োগকারী (কেওয়াইসি সম্পূর্ণ)',
      riskCategory: 'ঝুঁকি ক্যাটাগরি',
      activeInvestments: 'মোট সক্রিয় বিনিয়োগ',
      tabInfo: 'ব্যক্তিগত তথ্য',
      tabKyc: 'কেওয়াইসি ও পরিচয় ভেরিফিকেশন',
      tabFinancial: 'আর্থিক যোগ্যতা',
      tabPayout: 'লভ্যাংশ উত্তোলন সেটিংস',
      fullName: 'বিনিয়োগকারীর নাম',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল ঠিকানা',
      address: 'বর্তমান/স্থায়ী ঠিকানা',
      nidNo: 'জাতীয় পরিচয়পত্র (NID) নম্বর *',
      tinNo: 'ই-টিন (E-TIN) নম্বর *',
      sourceOfFund: 'বিনিয়োগের অর্থের উৎস',
      bankName: 'ব্যাংকের নাম (রিটার্ন ট্রান্সফারের জন্য)',
      bankAccountNo: 'ব্যাংক অ্যাকাউন্ট নম্বর',
      bKashNo: 'বিকাশ / নগদ ওয়ালেট নম্বর',
      nidCopy: 'এনআইডি কপি আপলোড করুন',
      tinCopy: 'ই-টিন সার্টিফিকেট আপলোড',
      bankCopy: 'ব্যাংক স্টেটমেন্ট / চেক বইয়ের পাতা আপলোড',
      saveChanges: '💾 তথ্য সংরক্ষণ করুন',
      saving: 'সংরক্ষণ করা হচ্ছে...',
      uploaded: '✓ ভেরিফাইড ফাইল আপলোড সম্পন্ন',
      uploadNew: '📁 ফাইল আপলোড করুন',
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
            <button className="icon-btn" onClick={toggleLanguage}>🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span></button>
            <button className="icon-btn" onClick={toggleTheme}>{isDarkMode ? '☀️ Light' : '🌙 Dark'}</button>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}>INV</div>
          </div>
        </header>

        {/* Banner Section */}
        <section className="card" style={{ marginBottom: '24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '2rem', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}>INV</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formData.name}</h2>
                  <span className="badge badge-success">{t.verified}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>✉️ {formData.email} • 📍 {formData.address}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.riskCategory}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>Moderate / 📊</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.activeInvestments}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#7c3aed' }}>৳২,৫০,০০০</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Header */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', overflowX: 'auto' }}>
          {[
            { key: 'info', label: t.tabInfo, icon: '👤' },
            { key: 'kyc', label: t.tabKyc, icon: '🆔' },
            { key: 'financial', label: t.tabFinancial, icon: '📊' },
            { key: 'payout', label: t.tabPayout, icon: '🏦' },
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
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.phone}</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.address}</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
              </div>
            )}

            {activeTab === 'kyc' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.nidNo}</label>
                  <input type="text" name="nidNo" value={formData.nidNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>

                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.tinNo}</label>
                  <input type="text" name="tinNo" value={formData.tinNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>

                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.nidCopy}</label>
                  <div style={{ marginTop: '6px', padding: '10px', border: '1px dashed var(--border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>{t.uploaded}</span>
                    <button type="button" className="btn" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>{t.uploadNew}</button>
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.tinCopy}</label>
                  <div style={{ marginTop: '6px', padding: '10px', border: '1px dashed var(--border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>{t.uploaded}</span>
                    <button type="button" className="btn" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>{t.uploadNew}</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.sourceOfFund}</label>
                  <select name="sourceOfFund" value={formData.sourceOfFund} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}>
                    <option value="Business Profits">Business Profits / ব্যবসা থেকে আয়</option>
                    <option value="Salary">Salary / চাকরিজীবি</option>
                    <option value="Remittance">Remittance / রেমিট্যান্স</option>
                    <option value="Investments">Other Investments / বিনিয়োগ</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.bankCopy}</label>
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
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.bankAccountNo}</label>
                  <input type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.bKashNo}</label>
                  <input type="text" name="bKashNo" value={formData.bKashNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }} />
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