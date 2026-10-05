'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function FarmerMyCropsPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [crops, setCrops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch farmer's crops from MongoDB API
  const fetchCrops = async () => {
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
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle Delete Crop
  const handleDelete = async (cropId: string, cropName: string) => {
    if (!confirm(`Are you sure you want to delete "${cropName}"?`)) return;

    setDeletingId(cropId);
    try {
      const res = await fetch(`/api/crops/${cropId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        alert(`🎉 "${cropName}" removed successfully!`);
        setCrops((prev) => prev.filter((item) => item._id !== cropId));
      } else {
        alert(`❌ Delete failed: ${data.error}`);
      }
    } catch (err: any) {
      alert(`❌ Error deleting crop: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const t = {
    EN: {
      title: '🌱 My Crop Inventory',
      subtitle: 'Manage and update your published harvest listings in real time.',
      addBtn: '➕ Add New Crop',
      crop: 'Crop Listing',
      category: 'Category',
      price: 'Unit Price',
      quantity: 'Available Stock',
      location: 'Harvest Origin',
      action: 'Actions',
      delete: '🗑️ Delete',
      deleting: 'Deleting...',
      loading: 'Loading your crop listings from database...',
      noCrops: 'You have not listed any crops yet.',
    },
    BN: {
      title: '🌱 আমার ফসলের তালিকা',
      subtitle: 'আপনার প্রকাশিত ফসল পরিচালনা ও রিয়েল-টাইমে স্টক আপডেট করুন।',
      addBtn: '➕ নতুন ফসল যুক্ত করুন',
      crop: 'ফসলের নাম',
      category: 'ক্যাটাগরি',
      price: 'একক মূল্য',
      quantity: 'মজুদ স্টক',
      location: 'উৎপাদন স্থান',
      action: 'অ্যাকশন',
      delete: '🗑️ মুছুন',
      deleting: 'মুছে ফেলা হচ্ছে...',
      loading: 'ডাটাবেজ থেকে ফসলের তালিকা লোড হচ্ছে...',
      noCrops: 'আপনার কোনো ফসল যুক্ত করা নেই।',
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
            <Link href="/farmer/settings" className="btn" style={{ textDecoration: 'none' }}>
              {t.addBtn}
            </Link>
          </div>
        </header>

        <section className="card" style={{ width: '100%' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              {t.loading}
            </div>
          ) : crops.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{t.noCrops}</p>
              <Link href="/farmer/settings" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                {t.addBtn}
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t.crop}</th>
                    <th>{t.category}</th>
                    <th>{t.price}</th>
                    <th>{t.quantity}</th>
                    <th>{t.location}</th>
                    <th>{t.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {crop.images && crop.images.length > 0 ? (
                            <img
                              src={crop.images[0]}
                              alt={crop.cropName}
                              style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                background: 'var(--bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                              }}
                            >
                              🌾
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 700 }}>{crop.cropName}</div>
                            {crop.isOrganic && (
                              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                                🌱 Organic
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-info">{crop.category}</span>
                      </td>
                      <td style={{ fontWeight: 700, color: '#10b981' }}>
                        ৳{crop.unitPrice} / {crop.unit}
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: crop.quantity > 0 ? '#10b981' : '#ef4444' }}>
                          {crop.quantity} {crop.unit}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📍 {crop.location}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(crop._id, crop.cropName)}
                          disabled={deletingId === crop._id}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: deletingId === crop._id ? 'not-allowed' : 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                          }}
                        >
                          {deletingId === crop._id ? t.deleting : t.delete}
                        </button>
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