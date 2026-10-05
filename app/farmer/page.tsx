'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function FarmerDashboardPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sales' | 'investments'>('sales');

  useEffect(() => {
    async function fetchDashboardOrders() {
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
    }
    fetchDashboardOrders();
  }, []);

  // Separate Orders & Investment Funds
  const cropSales = orders.filter((ord) => ord.paymentStatus !== 'Invested');
  const investmentFunds = orders.filter((ord) => ord.paymentStatus === 'Invested');

  // Calculations for Summary Cards
  const totalCropSalesEarnings = cropSales.reduce((sum, ord) => sum + (Number(ord.totalPrice) || 0), 0);
  const totalInvestmentFundRaised = investmentFunds.reduce((sum, ord) => sum + (Number(ord.totalPrice) || 0), 0);
  const totalRevenueCombined = totalCropSalesEarnings + totalInvestmentFundRaised;

  const t = {
    EN: {
      title: '🌾 Farmer Central Dashboard',
      subtitle: 'Track live harvest orders, escrow payments, and crowdfunding capital.',
      totalEarnings: 'Total Gross Earnings',
      cropEarnings: 'Crop Sales Earnings',
      investEarnings: 'Crowdfunding Capital',
      totalOrdersCount: 'Total Transactions',
      salesTab: '🛒 Crop Sales Orders',
      investTab: '💼 Crowdfunding Investment Funds',
      orderNo: 'Order / ID',
      crop: 'Item / Project Title',
      quantity: 'Quantity / Unit',
      totalPrice: 'Amount Received',
      escrowStatus: 'Escrow Status',
      date: 'Date',
      noSales: 'No direct crop sales orders received yet.',
      noInvestments: 'No crowdfunding investments received yet.',
    },
    BN: {
      title: '🌾 কৃষক সেন্ট্রাল ড্যাশবোর্ড',
      subtitle: 'ফসল বিক্রির অর্ডার, এসক্রো পেমেন্ট এবং ক্রাউডফান্ডিং মূলধন ট্র্যাকিং।',
      totalEarnings: 'মোট প্রাপ্ত অর্থ (সর্বমোট)',
      cropEarnings: 'ফসল বিক্রির আয়',
      investEarnings: 'ক্রাউডফান্ডিং ক্যাপিটাল',
      totalOrdersCount: 'মোট লেনদেন সংখ্যা',
      salesTab: '🛒 ফসল বিক্রির অর্ডার',
      investTab: '💼 ক্রাউডফান্ডিং বিনিয়োগ ফান্ড',
      orderNo: 'অর্ডার আইডি',
      crop: 'আইটেম / প্রজেক্টের নাম',
      quantity: 'পরিমাণ',
      totalPrice: 'প্রাপ্ত অর্থ',
      escrowStatus: 'এসক্রো স্ট্যাটাস',
      date: 'তারিখ',
      noSales: 'এখনো কোনো সরাসরি ফসল বিক্রির অর্ডার আসেনি।',
      noInvestments: 'এখনো কোনো ক্রাউডফান্ডিং বিনিয়োগ ফান্ড পাওয়া যায়নি।',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar role="farmer" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header>
          <div className="header-left">
            <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
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
          </div>
        </header>

        {/* Analytics Summary Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px', marginBottom: '24px', width: '100%' }}>
          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.totalEarnings}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#10b981' }}>
              ৳{isLoading ? '...' : totalRevenueCombined}
            </div>
          </div>

          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.cropEarnings}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#0284c7' }}>
              ৳{isLoading ? '...' : totalCropSalesEarnings}
            </div>
          </div>

          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.investEarnings}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#8b5cf6' }}>
              ৳{isLoading ? '...' : totalInvestmentFundRaised}
            </div>
          </div>

          <div className="card">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>{t.totalOrdersCount}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#f59e0b' }}>
              {isLoading ? '...' : orders.length}
            </div>
          </div>
        </section>

        {/* Tab Switcher & Detailed Ledger Table */}
        <section className="card" style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('sales')}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'sales' ? 'var(--primary-gradient)' : 'var(--bg)',
                color: activeTab === 'sales' ? '#fff' : 'var(--text)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {t.salesTab} ({cropSales.length})
            </button>

            <button
              onClick={() => setActiveTab('investments')}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'investments' ? 'var(--primary-gradient)' : 'var(--bg)',
                color: activeTab === 'investments' ? '#fff' : 'var(--text)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {t.investTab} ({investmentFunds.length})
            </button>
          </div>

          {/* Table Rendering */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
              Loading ledger details...
            </div>
          ) : activeTab === 'sales' ? (
            cropSales.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                {t.noSales}
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>{t.orderNo}</th>
                      <th>{t.crop}</th>
                      <th>{t.quantity}</th>
                      <th>{t.totalPrice}</th>
                      <th>{t.escrowStatus}</th>
                      <th>{t.date}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cropSales.map((item) => (
                      <tr key={item._id}>
                        <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{item.orderNumber}</td>
                        <td style={{ fontWeight: 600 }}>{item.cropName}</td>
                        <td>{item.quantity} {item.unit || 'kg'}</td>
                        <td style={{ fontWeight: 700, color: '#10b981' }}>৳{item.totalPrice}</td>
                        <td>
                          <span className="badge badge-success">🔒 {item.paymentStatus || 'Paid'}</span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : investmentFunds.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
              {t.noInvestments}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t.orderNo}</th>
                    <th>{t.crop}</th>
                    <th>{t.totalPrice}</th>
                    <th>{t.escrowStatus}</th>
                    <th>{t.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentFunds.map((item) => (
                    <tr key={item._id}>
                      <td style={{ fontWeight: 700, color: '#8b5cf6' }}>{item.orderNumber}</td>
                      <td style={{ fontWeight: 600 }}>{item.cropName}</td>
                      <td style={{ fontWeight: 800, color: '#10b981' }}>৳{item.totalPrice}</td>
                      <td>
                        <span className="badge badge-info">💼 Crowdfunding Escrow</span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
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