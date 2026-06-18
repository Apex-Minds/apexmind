import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturePlaceholder({ title, description, ctaLabel, ctaPath }) {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ padding: '36px', maxWidth: 760 }}>
      <div className="page-header" style={{ marginBottom: 18 }}>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{description}</p>
      </div>

      <div
        style={{
          borderRadius: '20px',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(11,17,32,0.96), rgba(21,31,50,0.92))',
          color: '#fff',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 560, fontSize: 15, marginBottom: 24 }}>
          This section is ready for the next phase of the platform. The structure is in place, so we can
          plug in messaging, notifications, or live collaboration without changing the navigation later.
        </p>

        {ctaLabel && ctaPath && (
          <button className="btn btn-gold" onClick={() => navigate(ctaPath)}>
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
