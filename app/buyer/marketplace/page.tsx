'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function BuyerMarketplacePage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // MongoDB state
  const [crops, setCrops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync Cart Count & Fetch Fresh Crops from API (No Cache)
  useEffect(() => {
    // 1. Calculate existing cart count from LocalStorage
    const existingCart = JSON.parse(localStorage.getItem('agrilink_cart') || '[]');
    setCartCount(existingCart.length);

    // 2. Fetch real-time crops from MongoDB API
    async function fetchCrops() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/crops', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setCrops(data.data);
        }
      } catch (err) {
        console.error('Error fetching crops:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCrops();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Add selected crop directly to LocalStorage cart with MongoDB ID linked
  const addToCart = (crop: any) => {
    const existingCart = JSON.parse(localStorage.getItem('agrilink_cart') || '[]');

    const newItem = {
      id: crop._id, // Critical for DB Stock Deducting
      cropName: crop.cropName,
      farmerName: crop.farmerName || 'Local Farmer',
      quantity: 100, // Default bulk order initial amount
      maxStock: crop.quantity,
      unitPrice: crop.unitPrice,
      unit: crop.unit || 'kg',
    };

    const updatedCart = [...existingCart, newItem];
    localStorage.setItem('agrilink_cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);

    alert(`🛒 "${crop.cropName}" কার্টে যুক্ত করা হয়েছে!`);
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSearch =
      crop.cropName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.farmerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const t = {
    EN: {
      title: '🛒 Buyer Direct Marketplace',
      subtitle: 'Source fresh farm produce directly from verified local farmers.',
      searchPlaceholder: 'Search crops, farmers, or locations...',
      catAll: 'All Crops',
      catVegetables: 'Vegetables',
      catGrains: 'Grains & Rice',
      catFruits: 'Fruits',
      catSpices: 'Spices',
      catPulses: 'Pulses',
      farmer: 'Farmer:',
      location: 'Location:',
      stock: 'Stock:',
      buyBtn: '🛒 Add to Bulk Cart',
      organic: '🌱 Organic',
      cartLabel: 'Cart Items',
      loading: 'Loading real-time crops from MongoDB...',
      noCrops: 'No crops found in marketplace.',
      outOfStock: 'Out of Stock',
    },
    BN: {
      title: '🛒 ক্রেতা মার্কেটপ্লেস',
      subtitle: 'যাচাইকৃত স্থানীয় কৃষকদের থেকে সরাসরি তাজা ফসল পাইকারি সংগ্রহ করুন।',
      searchPlaceholder: 'ফসল, কৃষক বা জেলার নাম দিয়ে খুঁজুন...',
      catAll: 'সব ফসল',
      catVegetables: 'শাকসবজি',
      catGrains: 'দানাদার ও চাল',
      catFruits: 'ফলমূল',
      catSpices: 'মসলা',
      catPulses: 'ডাল',
      farmer: 'কৃষক:',
      location: 'অবস্থান:',
      stock: 'মজুদ:',
      buyBtn: '🛒 কার্টে যুক্ত করুন',
      organic: '🌱 অর্গানিক',
      cartLabel: 'কার্ট আইটেম',
      loading: 'ডাটাবেজ থেকে ফসল লোড হচ্ছে...',
      noCrops: 'কোনো ফসল পাওয়া যায়নি।',
      outOfStock: 'মজুদ শেষ',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar
        role="buyer"
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

            <Link href="/buyer/cart" className="icon-btn" style={{ position: 'relative', textDecoration: 'none' }}>
              🛍️ <span>{t.cartLabel}</span>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#10b981', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="avatar" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>
              BY
            </div>
          </div>
        </header>

        {/* Filter Section */}
        <section className="card" style={{ marginBottom: '24px', width: '100%' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: '280px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
            />

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { key: 'All', label: t.catAll },
                { key: 'Vegetables', label: t.catVegetables },
                { key: 'Grains', label: t.catGrains },
                { key: 'Fruits', label: t.catFruits },
                { key: 'Spices', label: t.catSpices },
                { key: 'Pulses', label: t.catPulses },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    background: selectedCategory === cat.key ? 'var(--primary-gradient)' : 'var(--bg)',
                    color: selectedCategory === cat.key ? 'white' : 'var(--text)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Real-time Marketplace Grid */}
        {isLoading ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>{t.loading}</p>
          </div>
        ) : filteredCrops.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>{t.noCrops}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', width: '100%' }}>
            {filteredCrops.map((crop) => (
              <div key={crop._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', padding: 0 }}>
                {/* Image Banner or Fallback Emoji */}
                {crop.images && crop.images.length > 0 ? (
                  <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative' }}>
                    <img src={crop.images[0]} alt={crop.cropName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {crop.isOrganic && (
                      <span className="badge badge-info" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        {t.organic}
                      </span>
                    )}
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '120px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                    {crop.category === 'Vegetables' ? '🌶️' : crop.category === 'Grains' ? '🌾' : crop.category === 'Fruits' ? '🥭' : crop.category === 'Spices' ? '🧅' : '🫘'}
                    {crop.isOrganic && (
                      <span className="badge badge-info" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        {t.organic}
                      </span>
                    )}
                  </div>
                )}

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>{crop.cropName}</h3>

                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                      <div>{t.farmer} <strong style={{ color: 'var(--text)' }}>{crop.farmerName || 'Registered Farmer'}</strong></div>
                      <div>📍 {crop.location}</div>
                      <div>
                        {t.stock}{' '}
                        <strong style={{ color: crop.quantity > 0 ? '#10b981' : '#ef4444' }}>
                          {crop.quantity > 0 ? `${crop.quantity} ${crop.unit}` : t.outOfStock}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginBottom: '12px' }}>
                      ৳{crop.unitPrice} / {crop.unit}
                    </div>

                    <button
                      onClick={() => addToCart(crop)}
                      disabled={crop.quantity <= 0}
                      className="btn"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '10px',
                        fontSize: '0.95rem',
                        opacity: crop.quantity <= 0 ? 0.6 : 1,
                        cursor: crop.quantity <= 0 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {crop.quantity <= 0 ? t.outOfStock : t.buyBtn}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}