import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Innovation Lab', path: '/innovation-lab' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/70'
      }`}
    >
      <div className="hidden lg:block bg-[#f4a62a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="uppercase tracking-[0.25em]">Follow Us</span>
                <span className="flex items-center gap-2">
                  <a href="#" aria-label="Facebook" className="hover:opacity-80">
                    <FiFacebook />
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:opacity-80">
                    <FiInstagram />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                    <FiLinkedin />
                  </a>
                </span>
              </span>
            </div>
            <div className="flex items-center gap-5 text-white/95">
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="shrink-0" />
                <span>University of Mines and Technology, Tarkwa, Ghana</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <FiMail className="shrink-0" />
                <span>apexmind48@gmail.com</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <FiPhone className="shrink-0" />
                <span>+233 542432199</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25b7b7] to-[#0f766e] flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="font-display font-bold text-lg text-slate-900 block leading-tight">
                ApexMinds
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#f4a62a] font-semibold">
                Academy
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#0f766e] bg-[#0f766e]/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f4a62a] text-white font-semibold shadow-lg shadow-[#f4a62a]/25 hover:translate-y-[-1px] transition-all"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="xl:hidden p-2 text-slate-900 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-[#0f766e] bg-[#0f766e]/10'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 pt-6 border-t border-slate-200 px-4">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#f4a62a] text-white font-semibold"
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
