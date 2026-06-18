import React from 'react';

export default function SectionHeader({ kicker, title, subtitle, align = 'center', tone = 'dark' }) {
  const alignClass =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';
  const titleClass = tone === 'light' ? 'text-slate-900' : 'text-white';
  const subtitleClass = tone === 'light' ? 'text-slate-600' : 'text-slate-300/80';

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClass}`}>
      {kicker && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#f4a62a]/10 text-[#f4a62a] border border-[#f4a62a]/20">
          {kicker}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${titleClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${subtitleClass}`}>{subtitle}</p>
      )}
    </div>
  );
}
