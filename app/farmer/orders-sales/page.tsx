'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function FarmerOrdersSalesPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch real orders from MongoDB API
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/orders', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle Delivery Status Change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`🎉 Delivery Status updated to "${newStatus}"!`);
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId ? { ...ord, deliveryStatus: newStatus } : ord))
        );
      } else {
        alert(`❌ Update failed: ${data.error}`);
      }
    } catch (err: any) {
      alert(`❌ Error updating order: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Analytics
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalPrice) || 0), 0);
  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter((o) => o.deliveryStatus !== 'Delivered').length;

  const t = {
    EN: {
      title: '📦 Orders & Escrow Sales Ledger',
      subtitle: 'Manage received buyer orders, verify escrow payments, and update logistics status.',
      totalRevenue: 'Total Gross Earnings',
      totalOrders: 'Total Orders Handled',
      pendingDeliveries: 'Pending Deliveries',
      orderNo: 'Order #',
      crop: 'Crop Listing',
      buyer: 'Buyer Info / Qty',
      total: 'Total Price',
      payment: 'Escrow Vault Status',
      delivery: 'Logistics Action',
      date: 'Date',
      loading: 'Fetching orders from database...',
      noOrders: 'No orders received yet.',
    },
    BN: {
      title: '📦 অর্ডার ও এসক্রো সেলস খাতা',
      subtitle: 'ক্রেতাদের প্রাপ্ত অর্ডার পরিচালনা করুন, এসক্রো পেমেন্ট যাচাই করুন এবং ডেলিভারি আপডেট দিন।',
      totalRevenue: 'মোট আনুমানিক আয়',
      totalOrders: 'মোট প্রাপ্ত অর্ডার',
      pendingDeliveries: 'ডেলিভারি বাকি',
      orderNo: 'অর্ডার নং',
      crop: 'ফসলের নাম',
      buyer: 'পরিমাণ',
      total: 'মোট মূল্য',
      payment: 'এসক্রো পেমেন্ট স্ট্যাটাস',
      delivery: 'ডেলিভারি আপডেট',
      date: 'তারিখ',
      loading: 'ডাটাবেজ থেকে অর্ডার লোড হচ্ছে...',
      noOrders: 'এখনো কোনো অর্ডার পাওয়া যায়নি।',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar role="farmer" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header>
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar} title="Open Menu">
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

        {/* Analytics Top Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px', width: '100%' }}>
          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.totalRevenue}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#10b981' }}>
              ৳{isLoading ? '...' : totalRevenue}
            </div>
          </div>

          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.totalOrders}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#0284c7' }}>
              {isLoading ? '...' : totalOrders}
            </div>
          </div>

          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.pendingDeliveries}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#f59e0b' }}>
              {isLoading ? '...' : pendingDeliveries}
            </div>
          </div>
        </section>

        {/* Orders Table Section */}
        <section className="card" style={{ width: '100%' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.loading}
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.noOrders}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t.orderNo}</th>
                    <th>{t.crop}</th>
                    <th>{t.buyer}</th>
                    <th>{t.total}</th>
                    <th>{t.payment}</th>
                    <th>{t.delivery}</th>
                    <th>{t.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                        {order.orderNumber}
                      </td>
                      <td style={{ fontWeight: 600 }}>{order.cropName}</td>
                      <td>
                        <div>{order.quantity} {order.unit}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Buyer ID: {order.buyerId || 'Guest'}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: '#10b981' }}>৳{order.totalPrice}</td>
                      <td>
                        <span className="badge badge-success">
                          🔒 {order.paymentStatus || 'Paid'} ({order.paymentMethod || 'bKash Escrow'})
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.deliveryStatus || 'Processing'}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                          }}
                        >
                          <option value="Processing">🚚 Processing</option>
                          <option value="In Transit">🚛 In Transit</option>
                          <option value="Delivered">✅ Delivered</option>
                        </select>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
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