import React from 'react';
import {
  ShieldCheck,
  Award,
  MapPin,
  Calendar,
  Star,
  ShoppingBag,
  Heart,
  Share2
} from 'lucide-react';
import { MOCK_ARTISAN, MOCK_PRODUCTS } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import Badge from '../components/Badge.jsx';

export default function ArtisanProfile() {
  const artisan = MOCK_ARTISAN;
  const artisanProducts = MOCK_PRODUCTS.filter(
    (p) => p.artisan_id === artisan.id || p.category === 'pottery'
  );

  return (
    <div>
      {/* Profile Header Banner */}
      <div
        className="card"
        style={{
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <img
            src={artisan.avatar}
            alt={artisan.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid white',
              boxShadow: 'var(--shadow-md)'
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              {artisan.badges.map((b) => (
                <Badge key={b} type="verified">{b}</Badge>
              ))}
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
              {artisan.name}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.92rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={16} color="var(--primary)" />
                {artisan.region}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={16} />
                {artisan.experience} Heritage Practice
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#d97706', fontWeight: 600 }}>
                <Star size={16} fill="#d97706" />
                {artisan.rating} (342 craft sales)
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Artisan Story & Ancestral Tradition
          </h3>
          <p style={{ color: '#4b5563', lineHeight: 1.6, maxWidth: '850px' }}>
            {artisan.bio}
          </p>
        </div>
      </div>

      {/* Artisan's Crafts Showcase */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Masterpieces from {artisan.name}'s Studio ({artisanProducts.length})
        </h2>

        <div className="product-grid">
          {artisanProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
