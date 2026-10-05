'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLang(lang === 'EN' ? 'BN' : 'EN');

  // Translations dictionary
  const t = {
    EN: {
      features: 'Features',
      about: 'About Us',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      heroTitle: 'Direct Farm Trading & Smart Agricultural Investments',
      heroDesc:
        'AgriLink connects local farmers directly with crop buyers, crowdfunding investors, and agricultural experts in one unified ecosystem.',
      joinBtn: 'Join AgriLink Ecosystem',
      exploreBtn: 'Explore Ecosystem',
      coreFeatures: 'Core Ecosystem Features',
      feat1Title: 'Direct Crop Marketplace',
      feat1Desc:
        'Farmers list organic produce directly without middlemen, ensuring fair prices and fresh products for buyers.',
      feat2Title: 'Farm Crowdfunding',
      feat2Desc:
        'Investors fund verified agricultural campaigns and share seasonal yields with transparent ROI tracking.',
      feat3Title: 'AI & Expert Advisory',
      feat3Desc:
        'Crop disease diagnostics powered by AI, audited and verified by expert agricultural analysts.',
      modalTitle: 'Welcome to AgriLink',
      modalSubtitle: 'Choose your account role to continue to the portal:',
      farmer: 'Farmer',
      farmerDesc: 'Sell crops & request farm funding',
      buyer: 'Buyer / Investor',
      buyerDesc: 'Purchase produce & fund farms',
      analyst: 'Analyst',
      analystDesc: 'Audit projects & diagnostics',
      admin: 'Admin',
      adminDesc: 'System control & verification',
      footer: '© 2026 AgriLink Agricultural Ecosystem. All Rights Reserved.',
    },
    BN: {
      features: 'ফিচারসমূহ',
      about: 'আমাদের সম্পর্কে',
      signIn: 'সাইন ইন',
      getStarted: 'শুরু করুন',
      heroTitle: 'সরাসরি খামার বাণিজ্য ও স্মার্ট কৃষি বিনিয়োগ',
      heroDesc:
        'এগ্রিলিংক স্থানীয় কৃষকদের সরাসরি শস্য ক্রেতা, ক্রাউডফান্ডিং বিনিয়োগকারী এবং কৃষি বিশেষজ্ঞদের সাথে একটি সমন্বিত ইকোসিস্টেমে যুক্ত করে।',
      joinBtn: 'এগ্রিলিংকে যুক্ত হোন',
      exploreBtn: 'ইকোসিস্টেম দেখুন',
      coreFeatures: 'মূল ফিচারসমূহ',
      feat1Title: 'সরাসরি শস্য মার্কেটপ্লেস',
      feat1Desc:
        'কৃষকরা মধ্যস্বত্বভোগী ছাড়াই সরাসরি জৈব পণ্য তালিকাভুক্ত করেন, যা ক্রেতাদের জন্য ন্যায্য মূল্য ও তাজা পণ্য নিশ্চিত করে।',
      feat2Title: 'খামার ক্রাউডফান্ডিং',
      feat2Desc:
        'বিনিয়োগকারীরা যাচাইকৃত কৃষি প্রকল্পে অর্থায়ন করেন এবং স্বচ্ছ ROI ট্র্যাকিং সহ মৌসুমী ফলন ভাগ করেন।',
      feat3Title: 'এআই ও বিশেষজ্ঞ পরামর্শ',
      feat3Desc:
        'এআই চালিত ফসলের রোগ নির্ণয়, যা বিশেষজ্ঞ কৃষি বিশ্লেষকদের দ্বারা নিরীক্ষিত ও যাচাইকৃত।',
      modalTitle: 'এগ্রিলিংকে স্বাগতম',
      modalSubtitle: 'পোর্টালে প্রবেশ করতে আপনার অ্যাকাউন্ট রোল নির্বাচন করুন:',
      farmer: 'কৃষক',
      farmerDesc: 'ফসল বিক্রি ও ফান্ডিং আবেদন',
      buyer: 'ক্রেতা / বিনিয়োগকারী',
      buyerDesc: 'পণ্য ক্রয় ও খামারে বিনিয়োগ',
      analyst: 'বিশ্লেষক',
      analystDesc: 'প্রকল্প অডিট ও রোগ নির্ণয়',
      admin: 'অ্যাডমিন',
      adminDesc: 'সিস্টেম নিয়ন্ত্রণ ও পর্যবেক্ষণ',
      footer: '© ২০২৬ এগ্রিলিংক এগ্রিকালচারাল ইকোসিস্টেম। সর্বস্বত্ব সংরক্ষিত।',
    },
  }[lang];

  return (
    <div className={`min-h-screen font-sans leading-relaxed transition-colors duration-300 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <style jsx global>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);
          --primary-hover-gradient: linear-gradient(135deg, #059669 0%, #047857 100%);
          --accent-gradient: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          --radius: 12px;
        }

        .light-theme {
          --bg: #f8fafc;
          --surface: #ffffff;
          --text: #0f172a;
          --muted: #64748b;
          --border: #e2e8f0;
          --hero-bg: linear-gradient(135deg, #ecfdf5 0%, #f8fafc 100%);
          --primary-dark: #064e3b;
        }

        .dark-theme {
          --bg: #0f172a;
          --surface: #1e293b;
          --text: #f8fafc;
          --muted: #94a3b8;
          --border: #334155;
          --hero-bg: linear-gradient(135deg, #064e3b 0%, #0f172a 100%);
          --primary-dark: #34d399;
        }

        body {
          background-color: var(--bg);
          color: var(--text);
        }

        .navbar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .brand {
          font-size: 1.6rem;
          font-weight: bold;
          color: var(--primary-dark);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--muted);
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--primary-dark);
        }

        /* Gradient Buttons */
        .btn {
          background: var(--primary-gradient);
          color: white;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        .btn:hover {
          background: var(--primary-hover-gradient);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
        }
        .btn-outline {
          background: transparent;
          border: 2px solid #10b981;
          color: var(--primary-dark);
        }
        .btn-outline:hover {
          background: var(--primary-gradient);
          color: white;
          border-color: transparent;
        }

        .icon-btn {
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          border-color: #10b981;
          color: #10b981;
        }

        /* Hero Section */
        .hero {
          padding: 80px 20px;
          text-align: center;
          background: var(--hero-bg);
          border-bottom: 1px solid var(--border);
        }
        .hero h1 {
          font-size: 3rem;
          color: var(--primary-dark);
          margin-bottom: 16px;
          font-weight: 800;
        }
        .hero p {
          font-size: 1.2rem;
          color: var(--muted);
          max-width: 700px;
          margin: 0 auto 32px;
        }

        /* Features Section */
        .features {
          max-width: 1100px;
          margin: 60px auto;
          padding: 0 20px;
        }
        .section-title {
          text-align: center;
          font-size: 2rem;
          color: var(--primary-dark);
          margin-bottom: 40px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .card {
          background: var(--surface);
          padding: 32px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }
        .card h3 {
          color: var(--primary-dark);
          margin-bottom: 12px;
        }
        .card p {
          color: var(--muted);
          font-size: 0.95rem;
        }

        /* Modal */
        .modal-overlay {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          justify-content: center;
          align-items: center;
        }
        .modal {
          background: var(--surface);
          padding: 32px;
          border-radius: 16px;
          width: 90%;
          max-width: 600px;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border);
        }
        .close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--muted);
          border: none;
          background: none;
        }
        .role-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }
        .role-box {
          border: 2px solid var(--border);
          padding: 20px;
          border-radius: var(--radius);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          color: var(--text);
          background: var(--bg);
        }
        .role-box:hover {
          border-color: #10b981;
          transform: translateY(-3px);
        }
        .role-box h4 {
          margin: 8px 0 4px;
          color: var(--primary-dark);
        }
        .role-box p {
          font-size: 0.8rem;
          color: var(--muted);
        }

        footer {
          background: #064e3b;
          color: white;
          text-align: center;
          padding: 30px;
          margin-top: 60px;
          font-size: 0.9rem;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <Link href="#" className="brand">
          🌱 AgriLink
        </Link>
        <div className="nav-links">
          <a href="#features">{t.features}</a>
          <a href="#about">{t.about}</a>

          {/* Bangla / English Switcher */}
          <button className="icon-btn" onClick={toggleLanguage} title="Switch Language">
            🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Dark / Light Theme Toggle Button */}
          <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button className="btn btn-outline" onClick={openModal}>
            {t.signIn}
          </button>
          <button className="btn" onClick={openModal}>
            {t.getStarted}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            className="btn"
            style={{ padding: '14px 32px', fontSize: '1.05rem' }}
            onClick={openModal}
          >
            {t.joinBtn}
          </button>
          <a
            href="#features"
            className="btn btn-outline"
            style={{ padding: '14px 32px', fontSize: '1.05rem' }}
          >
            {t.exploreBtn}
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">{t.coreFeatures}</h2>
        <div className="grid">
          <div className="card">
            <div className="card-icon">🧑‍🌾</div>
            <h3>{t.feat1Title}</h3>
            <p>{t.feat1Desc}</p>
          </div>
          <div className="card">
            <div className="card-icon">💰</div>
            <h3>{t.feat2Title}</h3>
            <p>{t.feat2Desc}</p>
          </div>
          <div className="card">
            <div className="card-icon">🔬</div>
            <h3>{t.feat3Title}</h3>
            <p>{t.feat3Desc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>{t.footer}</p>
      </footer>

      {/* Role Selection Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2 style={{ color: 'var(--primary-dark)', textAlign: 'center' }}>
              {t.modalTitle}
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: 'var(--muted)',
                marginTop: '4px',
              }}
            >
              {t.modalSubtitle}
            </p>

            <div className="role-options">
              <Link href="/farmer" className="role-box">
                <div style={{ fontSize: '2rem' }}>🧑‍🌾</div>
                <h4>{t.farmer}</h4>
                <p>{t.farmerDesc}</p>
              </Link>

              <Link href="/buyer/marketplace" className="role-box">
                <div style={{ fontSize: '2rem' }}>🛒</div>
                <h4>{t.buyer}</h4>
                <p>{t.buyerDesc}</p>
              </Link>

              <Link href="/analyst/dashboard" className="role-box">
                <div style={{ fontSize: '2rem' }}>📊</div>
                <h4>{t.analyst}</h4>
                <p>{t.analystDesc}</p>
              </Link>

              <Link href="/admin/user-management" className="role-box">
                <div style={{ fontSize: '2rem' }}>🛡️</div>
                <h4>{t.admin}</h4>
                <p>{t.adminDesc}</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}