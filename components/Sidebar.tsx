'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
  isButton?: boolean;
}

interface SidebarProps {
  role: 'farmer' | 'buyer' | 'investor' | 'admin' | 'analyst';
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    onClose();
    router.push('/');
  };

  const links: Record<string, NavLink[]> = {
    farmer: [
      { name: 'Dashboard', href: '/farmer' },
      { name: 'My Crops / Marketplace', href: '/farmer/my-crops' },
      { name: 'Crowdfunding Projects', href: '/farmer/crowdfunding' },
      { name: 'Orders & Sales', href: '/farmer/orders-sales' },
      { name: 'AI Advisory & Weather', href: '/farmer/advisory-weather' },
      { name: 'Add New Crops', href: '/farmer/settings', isButton: false },
      { name: 'Profile & Settings', href: '/farmer/profile' },
    ],
    buyer: [
      { name: 'Marketplace', href: '/buyer/marketplace' },
      { name: 'My Cart & Checkout', href: '/buyer/cart', isButton: false },
      { name: 'My Orders & Purchases', href: '/buyer/my-orders' },
      { name: 'Profile & Verification', href: '/buyer/profile' },
    ],
    investor: [
      { name: 'Investment Dashboard', href: '/investor/dashboard' },
      { name: 'Farm Projects', href: '/investor/projects' },
      { name: 'Profile & Financial KYC', href: '/investor/profile' },
    ],
    admin: [
      { name: 'User & KYC Management', href: '/admin/user-management' },
    ],
    analyst: [
      { name: 'Analytics & Market Insights', href: '/analyst/dashboard' },
    ],
  };

  const currentLinks = links[role] || [];

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Slide Drawer */}
      <aside className={`sidebar-drawer ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">🌱 {role.toUpperCase()} PORTAL</div>
          <button className="close-btn" onClick={onClose} title="Close Menu">
            ✕
          </button>
        </div>

        <ul className="sidebar-nav" style={{ flex: 1, overflowY: 'auto' }}>
          {currentLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.isButton) {
              return (
                <li key={link.href} className="sidebar-nav-item">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="sidebar-btn-link"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            }

            return (
              <li key={link.href} className="sidebar-nav-item">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer Section with Quick Portal Switcher & Logout */}
        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Switch Portal
          </div>
          
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            <Link
              href="/farmer"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '6px 4px',
                textAlign: 'center',
                background: role === 'farmer' ? '#10b981' : 'rgba(255,255,255,0.08)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              🌾 Farmer
            </Link>

            <Link
              href="/buyer/marketplace"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '6px 4px',
                textAlign: 'center',
                background: role === 'buyer' ? '#0284c7' : 'rgba(255,255,255,0.08)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              🛒 Buyer
            </Link>

            <Link
              href="/investor/dashboard"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '6px 4px',
                textAlign: 'center',
                background: role === 'investor' ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              💼 Investor
            </Link>
          </div>

          <button className="logout-btn" onClick={handleLogout} style={{ marginTop: '4px' }}>
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}