'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function BuyerCartPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bKash Escrow');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

  // Payment Gateway Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'number' | 'otp' | 'pin'>('number');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');

  // Load items from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('agrilink_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items:', e);
      }
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Update quantity directly from Cart Input
  const handleQuantityChange = (index: number, newQty: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, newQty);
    setCartItems(updatedCart);
    localStorage.setItem('agrilink_cart', JSON.stringify(updatedCart));
  };

  // Remove individual item from cart
  const handleRemoveItem = (indexToRemove: number) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('agrilink_cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.unitPrice) || 0), 0);
  const deliveryFee = cartItems.length > 0 ? 500 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Open Gateway Modal
  const initiatePayment = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setPaymentStep('number');
    setShowPaymentModal(true);
  };

  // Safe Checkout Processor with HTML/JSON Error Fallback
  const processFinalOrder = async () => {
    setIsCheckingOut(true);

    try {
      for (const item of cartItems) {
        const payload = {
          cropId: item.id,
          buyerId: 'buyer-guest-101',
          farmerName: item.farmerName || 'Local Farmer',
          cropName: item.cropName,
          quantity: Number(item.quantity),
          unit: item.unit || 'kg',
          totalPrice: Number(item.quantity) * Number(item.unitPrice) + deliveryFee,
          paymentStatus: 'Paid',
          deliveryStatus: 'Processing',
          paymentMethod: paymentMethod,
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const resText = await res.text();
        let data;
        try {
          data = JSON.parse(resText);
        } catch (e) {
          throw new Error(`Server returned HTML/Invalid response: ${resText.slice(0, 100)}...`);
        }

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to submit order to database');
        }
      }

      alert('🎉 Payment Verified! Order Saved & Farmer Crop Inventory Updated in MongoDB!');
      localStorage.removeItem('agrilink_cart');
      setCartItems([]);
      setShowPaymentModal(false);
      router.push('/buyer/my-orders');
    } catch (error: any) {
      alert(`❌ Payment Error: ${error.message}`);
      console.error('Payment Error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const t = {
    EN: {
      title: '🛒 Wholesale Cart & Escrow Checkout',
      subtitle: 'Review selected agricultural produce and complete secure escrow payment.',
      cartTitle: 'Order Items Summary',
      crop: 'Crop Item',
      quantity: 'Order Quantity',
      price: 'Unit Price',
      total: 'Total Price',
      action: 'Action',
      summaryTitle: 'Escrow Payment Summary',
      subtotal: 'Subtotal Amount',
      delivery: 'Logistics Fee',
      grandTotal: 'Grand Total Payable',
      selectPayment: 'Select Payment Channel',
      checkoutBtn: '🔒 Proceed to Escrow Gateway',
      emptyCart: 'Your cart is empty. Please add crops from Marketplace.',
      removeBtn: '🗑️ Remove',
    },
    BN: {
      title: '🛒 পাইকারি কার্ট ও এসক্রো চেকআউট',
      subtitle: 'মনোনীত ফসলগুলো পর্যালোচনা করুন এবং নিরাপদ এসক্রো পেমেন্ট সম্পন্ন করুন।',
      cartTitle: 'অর্ডার আইটেমের তালিকা',
      crop: 'ফসলের নাম',
      quantity: 'অর্ডারের পরিমাণ',
      price: 'একক মূল্য',
      total: 'মোট মূল্য',
      action: 'অ্যাকশন',
      summaryTitle: 'এসক্রো পেমেন্ট সামারি',
      subtotal: 'উপ-মোট মূল্য',
      delivery: 'পরিবহন ফি',
      grandTotal: 'সর্বমোট প্রদেয়',
      selectPayment: 'পেমেন্ট মেথড নির্বাচন করুন',
      checkoutBtn: '🔒 পেমেন্ট গেটওয়েতে যান',
      emptyCart: 'আপনার কার্ট খালি। মার্কেটপ্লেস থেকে ফসল যুক্ত করুন।',
      removeBtn: '🗑️ মুছুন',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', width: '100%' }}>
          {/* Cart Table */}
          <section className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.cartTitle}</h3>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{t.emptyCart}</p>
                <Link href="/buyer/marketplace" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  🛒 Go to Marketplace
                </Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>{t.crop}</th>
                      <th>{t.quantity}</th>
                      <th>{t.price}</th>
                      <th>{t.total}</th>
                      <th>{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{item.cropName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👨‍🌾 {item.farmerName}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                              style={{ width: '80px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontWeight: 600 }}
                            />
                            <span style={{ fontSize: '0.85rem' }}>{item.unit}</span>
                          </div>
                        </td>
                        <td>৳{item.unitPrice}</td>
                        <td style={{ fontWeight: 700, color: '#10b981' }}>৳{Number(item.quantity) * Number(item.unitPrice)}</td>
                        <td>
                          <button
                            onClick={() => handleRemoveItem(index)}
                            style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                          >
                            {t.removeBtn}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Checkout Payment Summary Card */}
          <section className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '16px' }}>{t.summaryTitle}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.subtotal}:</span>
                <span style={{ fontWeight: 600 }}>৳{subtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.delivery}:</span>
                <span style={{ fontWeight: 600 }}>৳{deliveryFee}</span>
              </div>

              <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                <span>{t.grandTotal}:</span>
                <span style={{ color: '#10b981' }}>৳{grandTotal}</span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>
                {t.selectPayment}
              </label>

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
              >
                <option value="bKash Escrow">bKash Escrow Vault / বিকাশ এসক্রো</option>
                <option value="Nagad Direct">Nagad Escrow / নগদ এসক্রো</option>
              </select>
            </div>

            <button
              onClick={initiatePayment}
              disabled={cartItems.length === 0}
              className="btn"
              style={{ marginTop: '24px', width: '100%', padding: '12px', justifyContent: 'center', fontSize: '1rem' }}
            >
              {t.checkoutBtn}
            </button>
          </section>
        </div>

        {/* Payment Gateway Modal Pop-Up */}
        {showPaymentModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: paymentMethod.includes('bKash') ? '#e2136e' : '#f7931e', width: '90%', maxWidth: '400px', borderRadius: '12px', color: 'white', padding: '24px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{paymentMethod}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>AgriLink Secure Escrow Vault System</p>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '6px', marginTop: '12px', fontSize: '1.1rem', fontWeight: 700 }}>
                  Payable: ৳{grandTotal}
                </div>
              </div>

              {paymentStep === 'number' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your {paymentMethod.split(' ')[0]} Account Number:</label>
                  <input
                    type="text"
                    placeholder="017XXXXXXXX"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', color: '#333', fontSize: '1rem', textAlign: 'center' }}
                  />
                  <button
                    onClick={() => {
                      if (mobileNumber.length >= 11) setPaymentStep('otp');
                      else alert('Enter a valid 11-digit mobile number');
                    }}
                    style={{ background: '#333', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Send OTP Verification Code
                  </button>
                </div>
              )}

              {paymentStep === 'otp' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Enter OTP (Demo: 1234):</label>
                  <input
                    type="text"
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', color: '#333', fontSize: '1rem', textAlign: 'center' }}
                  />
                  <button
                    onClick={() => {
                      if (otp === '1234' || otp.length === 4) setPaymentStep('pin');
                      else alert('Use 1234 as Demo OTP');
                    }}
                    style={{ background: '#333', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {paymentStep === 'pin' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Enter Account PIN (Demo: 12345):</label>
                  <input
                    type="password"
                    placeholder="•••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', color: '#333', fontSize: '1rem', textAlign: 'center' }}
                  />
                  <button
                    onClick={processFinalOrder}
                    disabled={isCheckingOut}
                    style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                  >
                    {isCheckingOut ? 'Securing Funds...' : 'Confirm Escrow Payment'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}