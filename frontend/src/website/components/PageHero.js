import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHero({ kicker, title, subtitle, children }) {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-[#13253f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,166,42,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#f4a62a]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#f4a62a]/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {kicker && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ffd88b] mb-4 animate-fade-up">
            {kicker}
          </span>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-slate-200/80 max-w-2xl leading-relaxed animate-fade-up">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
      <Link to="/" className="hover:text-[#f4a62a] transition-colors">
        Home
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span>/</span>
          {item.path ? (
            <Link to={item.path} className="hover:text-[#f4a62a] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
