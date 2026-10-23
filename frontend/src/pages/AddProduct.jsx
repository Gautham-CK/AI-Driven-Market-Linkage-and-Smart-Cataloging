import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  Upload,
  CheckCircle,
  Tag,
  DollarSign,
  Layers,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/index.js';
import { useVoiceInput } from '../hooks/useVoiceInput.js';
import { api } from '../services/api.js';

export default function AddProduct() {
  const { t, lang } = useLanguage();
  const [craftType, setCraftType] = useState('Terracotta');
  const [region, setRegion] = useState('Bishnupur, West Bengal');
  const [materials, setMaterials] = useState('Natural Clay, Mineral Slip');
  const [voiceNotes, setVoiceNotes] = useState('');
  const [previewImage, setPreviewImage] = useState(
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
  );

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [published, setPublished] = useState(false);

  const { isListening, toggleListening } = useVoiceInput({
    currentLang: lang,
    onResult: (text) => {
      setVoiceNotes((prev) => (prev ? `${prev} ${text}` : text));
    }
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPublished(false);

    try {
      const result = await api.generateSmartCatalog({
        craftType,
        region,
        materials,
        description: voiceNotes,
        language: lang
      });
      setAiResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    setPublished(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{t.aiCatalog.title}</h1>
          <p className="page-subtitle">{t.aiCatalog.desc}</p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Left: Input Form & Voice Recorder */}
        <div className="card">
          <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
            Craft Details & Story
          </h2>

          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">Craft Category / Technique</label>
              <select
                className="form-select"
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
              >
                <option value="Terracotta & Clay Art">Terracotta & Clay Art</option>
                <option value="Handloom Mulberry Silk">Handloom Mulberry Silk</option>
                <option value="Brass & Metal Engraving">Brass & Metal Engraving</option>
                <option value="Channapatna Lacquer Wood">Channapatna Lacquer Wood</option>
                <option value="Blue Pottery Ceramic">Blue Pottery Ceramic</option>
                <option value="Pochampally Ikat Weave">Pochampally Ikat Weave</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Artisan Region / Village</label>
              <input
                type="text"
                className="form-input"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Madhubani, Bihar or Varanasi, UP"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Raw Materials Used</label>
              <input
                type="text"
                className="form-input"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="e.g. Natural River Clay, Organic Plant Dyes, Brass"
                required
              />
            </div>

            {/* Voice Input Section */}
            <div className="form-group">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.45rem'
                }}
              >
                <label className="form-label" style={{ margin: 0 }}>
                  Craft Story (Voice or Text)
                </label>
                <button
                  type="button"
                  className={`voice-btn ${isListening ? 'listening' : ''}`}
                  onClick={toggleListening}
                  style={{ width: '36px', height: '36px' }}
                  title="Speak in your mother tongue"
                >
                  <Mic size={16} />
                </button>
              </div>

              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Speak or type how this piece is made, ancestral inspiration, or special features..."
                value={voiceNotes}
                onChange={(e) => setVoiceNotes(e.target.value)}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isListening
                  ? '🎙️ Listening... speak in your native language'
                  : 'Tap the mic icon to dictate in Hindi, Tamil, Kannada, Bengali, or English'}
              </span>
            </div>

            {/* Photo Preview Upload */}
            <div className="form-group">
              <label className="form-label">Craft Photograph</label>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  background: 'var(--bg-subtle)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <img
                  src={previewImage}
                  alt="Craft preview"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block' }}>
                    Artisan Workshop Shot
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Ready for AI Studio Enhancement
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>{t.aiCatalog.generating}</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>{t.aiCatalog.generateBtn}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: AI Output Preview Card */}
        <div>
          {aiResult ? (
            <div
              className="card"
              style={{
                border: '1.5px solid #d8b4fe',
                background: 'linear-gradient(180deg, #faf5ff 0%, #ffffff 100%)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: '#6b21a8'
                }}
              >
                <Sparkles size={20} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                  Smart AI Catalog Preview
                </h3>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase' }}>
                  Generated E-Commerce Title
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '0.2rem' }}>
                  {aiResult.title}
                </h2>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase' }}>
                  Artisan Heritage Story & Description
                </span>
                <p style={{ color: '#374151', fontSize: '0.94rem', lineHeight: 1.6, marginTop: '0.25rem' }}>
                  {aiResult.description}
                </p>
              </div>

              {/* Fair Price Recommendation */}
              <div
                style={{
                  background: 'white',
                  border: '1px solid #e9d5ff',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '1.25rem'
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                  Fair Trade Price Recommendation
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                    ₹{aiResult.suggestedPrice}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    (Benchmark: ₹{aiResult.priceRange?.min} – ₹{aiResult.priceRange?.max})
                  </span>
                </div>
              </div>

              {/* Tags & Keywords */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  SEO & Search Keywords
                </span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {aiResult.tags?.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: '#f3e8ff',
                        color: '#6b21a8',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {published ? (
                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#065f46'
                  }}
                >
                  <CheckCircle size={28} color="#059669" style={{ margin: '0 auto 0.5rem' }} />
                  <strong style={{ display: 'block' }}>Successfully Published to KalaSetu!</strong>
                  <p style={{ fontSize: '0.85rem' }}>
                    Your craft is now live for global and retail buyers.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  className="btn btn-accent"
                  style={{ width: '100%' }}
                >
                  <CheckCircle size={18} />
                  <span>Publish to KalaSetu Marketplace</span>
                </button>
              )}
            </div>
          ) : (
            <div
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '400px',
                textAlign: 'center',
                borderStyle: 'dashed'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                AI Catalog Ready to Generate
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px' }}>
                Fill in the craft details on the left or speak into the microphone to create e-commerce listings with fair trade pricing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
