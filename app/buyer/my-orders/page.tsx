'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function BuyerMyOrdersPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Real Database Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real orders from MongoDB API
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const t = {
    EN: {
      title: '📦 My Orders & Escrow Tracking',
      subtitle: 'Track your wholesale crop orders and escrow vault status in real time.',
      orderNo: 'Order #',
      farmer: 'Farmer',
      crop: 'Crop Item',
      quantity: 'Quantity',
      total: 'Total Paid',
      payment: 'Payment Status',
      delivery: 'Logistics Status',
      method: 'Payment Channel',
      date: 'Order Date',
      loading: 'Loading orders from MongoDB database...',
      noOrders: 'No orders found. Purchase produce from the Marketplace!',
      marketplaceBtn: '🛒 Browse Marketplace',
    },
    BN: {
      title: '📦 আমার অর্ডার ও ট্র্যাকিং',
      subtitle: 'আপনার পাইকারি ফসলের অর্ডার এবং এসক্রো ফান্ড ট্র্যাকিং রিয়েল-টাইমে দেখুন।',
      orderNo: 'অর্ডার নং',
      farmer: 'কৃষক',
      crop: 'ফসল',
      quantity: 'পরিমাণ',
      total: 'মোট পরিশোধিত',
      payment: 'পেমেন্ট স্ট্যাটাস',
      delivery: 'ডেলিভারি স্ট্যাটাস',
      method: 'পেমেন্ট মেথড',
      date: 'তারিখ',
      loading: 'ডাটাবেজ থেকে অর্ডার লোড হচ্ছে...',
      noOrders: 'কোনো অর্ডার পাওয়া যায়নি। মার্কেটপ্লেস থেকে ফসল কিনুন!',
      marketplaceBtn: '🛒 মার্কেটপ্লেসে যান',
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
            <button className="icon-btn" onClick={toggleTheme}>{isDarkMode ? '☀️️ Light' : '🌙 Dark'}</button>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>BY</div>
          </div>
        </header>

        <section className="card">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.loading}
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{t.noOrders}</p>
              <Link href="/buyer/marketplace" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                {t.marketplaceBtn}
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t.orderNo}</th>
                    <th>{t.crop}</th>
                    <th>{t.farmer}</th>
                    <th>{t.quantity}</th>
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
                        {order.orderNumber || 'AGL-102938'}
                      </td>
                      <td style={{ fontWeight: 600 }}>{order.cropName}</td>
                      <td>👨‍🌾 {order.farmerName || 'Local Farmer'}</td>
                      <td>{order.quantity} {order.unit || 'kg'}</td>
                      <td style={{ fontWeight: 700, color: '#10b981' }}>৳{order.totalPrice}</td>
                      <td>
                        <span className="badge badge-success">
                          🔒 {order.paymentStatus || 'Paid'} ({order.paymentMethod || 'Escrow'})
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            order.deliveryStatus === 'Delivered'
                              ? 'badge-success'
                              : order.deliveryStatus === 'In Transit'
                              ? 'badge-warning'
                              : 'badge-info'
                          }`}
                        >
                          🚚 {order.deliveryStatus || 'Processing'}
                        </span>
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