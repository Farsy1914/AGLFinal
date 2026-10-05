'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';

interface HeaderProps {
  title: string;
  subtitle: string;
  initials?: string;
  onToggleSidebar: () => void;
}

export default function Header({ title, subtitle, initials = 'RU', onToggleSidebar }: HeaderProps) {
  const { isDarkMode, lang, toggleTheme, toggleLanguage } = useThemeLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Detect current active role from pathname
  const getCurrentRole = () => {
    if (pathname.startsWith('/buyer')) return 'buyer';
    if (pathname.startsWith('/investor')) return 'investor';
    return 'farmer';
  };

  const currentRole = getCurrentRole();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    if (selectedRole === 'farmer') router.push('/farmer');
    if (selectedRole === 'buyer') router.push('/buyer/marketplace');
    if (selectedRole === 'investor') router.push('/investor/dashboard');
  };

  return (
    <header>
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar} title="Open Navigation Menu">
          ☰
        </button>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Role Switcher Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Portal:</span>
          <select
            value={currentRole}
            onChange={handleRoleChange}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            <option value="farmer">🌾 Farmer Portal</option>
            <option value="buyer">🛒 Buyer Portal</option>
            <option value="investor">💼 Investor Portal</option>
          </select>
        </div>

        {/* Global Language Switcher */}
        <button className="icon-btn" onClick={toggleLanguage} title="Switch Language">
          🌐 <span>{lang === 'EN' ? 'বাংলা' : 'English'}</span>
        </button>

        {/* Global Theme Switcher */}
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        <Link href={currentRole === 'farmer' ? '/farmer/profile' : '#'}>
          <div className="avatar" style={{
            background: currentRole === 'investor' 
              ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' 
              : currentRole === 'buyer' 
              ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
              : 'var(--primary-gradient)'
          }}>
            {currentRole === 'investor' ? 'INV' : currentRole === 'buyer' ? 'BY' : initials}
          </div>
        </Link>
      </div>
    </header>
  );
}