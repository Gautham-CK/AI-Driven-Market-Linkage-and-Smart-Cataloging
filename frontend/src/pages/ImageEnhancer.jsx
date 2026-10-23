import React, { useState } from 'react';
import {
  Wand2,
  Upload,
  Download,
  Sun,
  Layers,
  Sparkles,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import { useLanguage } from '../i18n/index.js';

const DEMO_SAMPLES = [
  {
    name: 'Terracotta Horse (Workshop vs Studio)',
    before: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=95'
  },
  {
    name: 'Moradabad Brass Urli (Dim lighting vs High Key)',
    before: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=95'
  },
  {
    name: 'Channapatna Lacquer Wood Dolls',
    before: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=95'
  }
];

export default function ImageEnhancer() {
  const { t } = useLanguage();
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [activeFilter, setActiveFilter] = useState('studio');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customImage, setCustomImage] = useState(null);

  const currentSample = customImage
    ? {
        before: customImage,
        after: customImage
      }
    : DEMO_SAMPLES[selectedDemo];

  const handleApplyPreset = (preset) => {
    setActiveFilter(preset);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{t.enhancer.title}</h1>
          <p className="page-subtitle">{t.enhancer.desc}</p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Left: Interactive Before & After Slider */}
        <div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} color="var(--primary)" />
              <span>{t.enhancer.compareTitle}</span>
            </h3>

            <div style={{ position: 'relative' }}>
              <BeforeAfterSlider
                beforeImage={currentSample.before}
                afterImage={currentSample.after}
                beforeLabel="Workshop Camera Photo"
                afterLabel="AI Studio Isolation & Lighting"
              />

              {isProcessing && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-lg)',
                    gap: '0.5rem'
                  }}
                >
                  <RefreshCw size={24} className="animate-spin" color="var(--primary)" />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Enhancing craft lighting...</span>
                </div>
              )}
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              ↔ Drag the center slider left and right to inspect detail restoration
            </p>
          </div>
        </div>

        {/* Right: Enhancement Controls & Presets */}
        <div>
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Studio Lighting & Enhancement Presets
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'studio', label: 'E-Commerce White Studio', icon: Sun },
                { id: 'heritage', label: 'Warm Heritage Glow', icon: Wand2 },
                { id: 'texture', label: 'Texture & Clay Sharpen', icon: Layers },
                { id: 'shadow', label: 'Soft Diffused Shadows', icon: Sparkles }
              ].map((p) => {
                const Icon = p.icon;
                const isActive = activeFilter === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleApplyPreset(p.id)}
                    style={{
                      padding: '1rem 0.85rem',
                      border: `1.5px solid ${isActive ? 'var(--primary)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--primary-light)' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      transition: 'var(--transition)'
                    }}
                  >
                    <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: isActive ? 'var(--primary)' : 'var(--text-main)' }}>
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Select Artisan Demo Samples */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Try with Sample Artisan Crafts</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {DEMO_SAMPLES.map((sample, idx) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => {
                      setCustomImage(null);
                      setSelectedDemo(idx);
                    }}
                    style={{
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedDemo === idx && !customImage ? 'var(--bg-subtle)' : 'white',
                      textAlign: 'left',
                      fontSize: '0.86rem',
                      fontWeight: selectedDemo === idx && !customImage ? 600 : 400,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{sample.name}</span>
                    {selectedDemo === idx && !customImage && <CheckCircle2 size={16} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Your Own Photo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Or Upload Workshop Photo</label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  border: '1.5px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  background: 'var(--bg-subtle)'
                }}
              >
                <Upload size={18} color="var(--text-muted)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Select Photo from Mobile or PC</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => alert('Enhanced photo saved to your media library!')}
            >
              <Download size={16} />
              <span>Save Enhanced Photo for Listing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
