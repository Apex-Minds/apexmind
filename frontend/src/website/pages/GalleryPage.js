import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/gallery';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      <PageHero
        kicker="Gallery"
        title="Life at ApexMinds"
        subtitle="Explore our campus, labs, events, and the vibrant community shaping the future of technology."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-apex-cyan/20 text-apex-cyan border border-apex-cyan/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 hover:border-apex-cyan/30 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                >
                  <img
  src={item.image}
  alt={item.title}
  className="w-30 h-30 object-contain group-hover:scale-110 transition-transform duration-500"
/>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-apex-dark via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-apex-cyan">
                    {item.category}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-white mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 py-12">No items in this category.</p>
          )}
        </div>
      </section>
    </>
  );
}
