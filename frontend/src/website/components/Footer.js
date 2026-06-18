import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import PortalButtons from './PortalButtons';

export default function Footer() {
  return (
    <footer className="bg-[#13253f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25b7b7] to-[#0f766e] flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-teal-500/20">
                A
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block">ApexMinds</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#f4a62a] font-semibold">
                  Academy
                </span>
              </div>
            </Link>
            <p className="text-slate-300/70 text-sm leading-relaxed mb-6">
              Shaping the next generation of software engineers, innovators, entrepreneurs, and
              digital leaders through hands-on technology education.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#f4a62a] hover:bg-[#f4a62a]/10 transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Programs', path: '/programs' },
                { label: 'Admissions', path: '/admissions' },
                { label: 'Innovation Lab', path: '/innovation-lab' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-[#f4a62a] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'News & Events', path: '/news-events' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-[#f4a62a] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <FiMapPin className="w-5 h-5 text-[#f4a62a] shrink-0 mt-0.5" />
                university of Mines and Technology, Tarkwa, Ghana
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FiPhone className="w-5 h-5 text-[#f4a62a] shrink-0" />
                +233 542432199
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FiMail className="w-5 h-5 text-[#f4a62a] shrink-0" />
                apexmind48@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-center text-sm text-slate-500 mb-6">Access Your Dashboard</p>
          <PortalButtons className="justify-center" />
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ApexMinds Academy. All rights reserved.
          </p>
          <p className="text-sm text-slate-600">Building tomorrow&apos;s technology leaders today.</p>
        </div>
      </div>
    </footer>
  );
}
