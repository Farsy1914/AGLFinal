'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { farmerDashboardData } from '@/app/data/mockData';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import Sidebar from '@/components/Sidebar';

export default function AddNewCropPage() {
  const { lang, isDarkMode, toggleTheme, toggleLanguage } = useThemeLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  const [cropForm, setCropForm] = useState({
    cropName: '',
    category: 'Vegetables',
    quantity: '',
    unit: 'kg',
    unitPrice: '',
    harvestDate: '',
    location: 'Bogra, Rajshahi',
    isOrganic: true,
    description: '',
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const profile = farmerDashboardData.profile;

  // Convert uploaded image files to Base64 strings for MongoDB storage
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        farmerName: profile.name,
        cropName: cropForm.cropName,
        category: cropForm.category,
        quantity: Number(cropForm.quantity),
        unit: cropForm.unit,
        unitPrice: Number(cropForm.unitPrice),
        location: cropForm.location,
        isOrganic: cropForm.isOrganic,
        description: cropForm.description,
        harvestDate: cropForm.harvestDate,
        images: images,
      };

      const res = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert('🎉 Crop with Images Successfully Saved to MongoDB & Published!');
        router.push('/buyer/marketplace');
      } else {
        alert(`❌ Failed to post crop: ${data.error || 'Server Error'}`);
      }
    } catch (error: any) {
      alert(`❌ Error connecting to backend API: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = {
    EN: {
      title: '➕ Add New Crop Listing',
      subtitle: 'Publish your freshly harvested produce directly to buyers on AgriLink Marketplace.',
      imageTitle: 'Crop Photos & Media',
      imageSubtitle: 'Upload clear photos of your harvested produce (Max 5 photos)',
      uploadBtn: '📸 Click or Drag & Drop Crop Images',
      detailsTitle: 'Basic Product Specifications',
      cropName: 'Crop Title / Variety Name',
      cropNamePlaceholder: 'e.g. Fresh Organic Balam Rice / Fresh Green Chillies',
      category: 'Category',
      quantity: 'Total Available Stock Quantity',
      quantityPlaceholder: 'e.g. 500',
      unit: 'Unit',
      unitPrice: 'Unit Price (৳)',
      unitPricePlaceholder: 'e.g. 65',
      harvestDate: 'Expected Harvest / Available Date',
      location: 'Farm Harvest Location',
      isOrganic: 'Certified Organic Farming Produce',
      descTitle: 'Product Description & Features',
      descPlaceholder: 'Provide details about soil quality, fertilizer used, packaging, and minimum order quantity for buyers...',
      publishBtn: '🌾 Publish Listing to Marketplace (MongoDB)',
      submitting: 'Saving to Database...',
    },
    BN: {
      title: '➕ নতুন ফসল তালিকাভুক্তকরণ',
      subtitle: 'আপনার তোলা তাজা ফসল সরাসরি এগ্রিলিংক মার্কেটপ্লেসের পাইকারি ক্রেতাদের কাছে পোস্ট করুন।',
      imageTitle: 'ফসলের ছবি ও মিডিয়া',
      imageSubtitle: 'আপনার ফসলের পরিষ্কার ছবি আপলোড করুন (সর্বোচ্চ ৫টি ছবি)',
      uploadBtn: '📸 নতুন ছবি আপলোড করতে ক্লিক করুন',
      detailsTitle: 'ফসলের বিস্তারিত তথ্য',
      cropName: 'ফসলের নাম ও জাত',
      cropNamePlaceholder: 'যেমন: অর্গানিক কাঁচা মরিচ / তাজা বালাম চাল',
      category: 'ক্যাটাগরি',
      quantity: 'মোট মজুদ পরিমাণ',
      quantityPlaceholder: 'যেমন: ৫০০',
      unit: 'একক',
      unitPrice: 'প্রতি এককের মূল্য (৳)',
      unitPricePlaceholder: 'যেমন: ৬৫',
      harvestDate: 'ফসল তোলার / সরবরাহের তারিখ',
      location: 'খামারের অবস্থান',
      isOrganic: 'সম্পূর্ণ জৈব উপায়ে উৎপাদিত ফসল (অর্গানিক)',
      descTitle: 'ফসলের বিস্তারিত বিবরণ ও শর্তাবলী',
      descPlaceholder: 'মাটির মান, কীটনাশকমুক্ত তথ্য, প্যাকিং এবং সর্বনিম্ন অর্ডারের বিবরণ লিখুন...',
      publishBtn: '🌾 মার্কেটপ্লেসে পোস্ট করুন (ডাটাবেজ)',
      submitting: 'ডাটাবেজে সেভ হচ্ছে...',
    },
  }[lang];

  return (
    <div className="farmer-container">
      <Sidebar
        role="farmer"
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

            <Link href="/farmer/profile">
              <div className="avatar">{profile.initials}</div>
            </Link>
          </div>
        </header>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section 1: Image Upload Card */}
          <section className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '4px' }}>{t.imageTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>{t.imageSubtitle}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={img} alt="Crop preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.85)', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', border: '2px dashed var(--border)', borderRadius: '10px', cursor: 'pointer', background: 'var(--bg)', color: 'var(--text-muted)', padding: '8px', textAlign: 'center', fontSize: '0.8rem' }}>
                  <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📸</span>
                  <span>{t.uploadBtn}</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              )}
            </div>
          </section>

          {/* Section 2: Details Specification Grid */}
          <section className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '20px' }}>{t.detailsTitle}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.cropName} *</label>
                <input
                  type="text"
                  required
                  placeholder={t.cropNamePlaceholder}
                  value={cropForm.cropName}
                  onChange={(e) => setCropForm({ ...cropForm, cropName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.category}</label>
                <select
                  value={cropForm.category}
                  onChange={(e) => setCropForm({ ...cropForm, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                >
                  <option value="Vegetables">Vegetables / শাকসবজি</option>
                  <option value="Grains">Grains & Rice / দানাদার ও চাল</option>
                  <option value="Fruits">Fruits / ফলমূল</option>
                  <option value="Spices">Spices / মসলা</option>
                  <option value="Pulses">Pulses / ডাল</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.quantity} *</label>
                  <input
                    type="number"
                    required
                    placeholder={t.quantityPlaceholder}
                    value={cropForm.quantity}
                    onChange={(e) => setCropForm({ ...cropForm, quantity: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.unit}</label>
                  <select
                    value={cropForm.unit}
                    onChange={(e) => setCropForm({ ...cropForm, unit: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                  >
                    <option value="kg">kg / কেজি</option>
                    <option value="ton">Ton / টন</option>
                    <option value="mon">Mond / মণ</option>
                    <option value="pcs">Pcs / পিস</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.unitPrice} *</label>
                <input
                  type="number"
                  required
                  placeholder={t.unitPricePlaceholder}
                  value={cropForm.unitPrice}
                  onChange={(e) => setCropForm({ ...cropForm, unitPrice: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.harvestDate}</label>
                <input
                  type="date"
                  value={cropForm.harvestDate}
                  onChange={(e) => setCropForm({ ...cropForm, harvestDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.location}</label>
                <input
                  type="text"
                  value={cropForm.location}
                  onChange={(e) => setCropForm({ ...cropForm, location: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', marginTop: '6px' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="organic"
                checked={cropForm.isOrganic}
                onChange={(e) => setCropForm({ ...cropForm, isOrganic: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <label htmlFor="organic" style={{ fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
                🌱 {t.isOrganic}
              </label>
            </div>
          </section>

          {/* Section 3: Detailed Description */}
          <section className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '12px' }}>{t.descTitle}</h3>
            <textarea
              rows={4}
              placeholder={t.descPlaceholder}
              value={cropForm.description}
              onChange={(e) => setCropForm({ ...cropForm, description: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn"
              style={{ marginTop: '24px', width: '100%', padding: '14px', fontSize: '1.1rem', justifyContent: 'center' }}
            >
              {isSubmitting ? t.submitting : t.publishBtn}
            </button>
          </section>
        </form>
      </main>
    </div>
  );
}