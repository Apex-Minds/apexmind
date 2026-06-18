import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const PORTALS = [
  {
    label: 'Students Portal',
    path: '/login?portal=student',
    className:
      'bg-gradient-to-r from-[#0f766e] to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#0f766e] text-white shadow-lg shadow-teal-600/25',
  },
  {
    label: 'Teachers Portal',
    path: '/login?portal=teacher',
    className:
      'bg-gradient-to-r from-[#f4a62a] to-[#e09415] hover:from-[#ffc04d] hover:to-[#f4a62a] text-white shadow-lg shadow-[#f4a62a]/25',
  },
  {
    label: 'Admin Portal',
    path: '/login?portal=admin',
    className:
      'bg-[#1a3050] border border-white/10 hover:border-[#f4a62a]/50 text-white hover:bg-white/5',
  },
];

export default function PortalButtons({ variant = 'default', className = '' }) {
  const isCompact = variant === 'compact';
  const { user } = useAuth();

  const portalPath = (portal) => {
    if (user) {
      if (portal.label.startsWith('Students')) return '/student/login';
      if (portal.label.startsWith('Teachers')) return '/teacher/login';
      return '/admin/login';
    }
    return portal.path;
  };

  return (
    <div
      className={`flex flex-wrap gap-3 ${isCompact ? '' : 'gap-4'} ${className}`}
    >
      {PORTALS.map((portal) => (
        <Link
          key={portal.label}
          to={portalPath(portal)}
          className={`inline-flex items-center gap-2 font-display font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
            isCompact ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm md:text-base'
          } ${portal.className}`}
        >
          {portal.label}
          <FiExternalLink className="w-4 h-4 opacity-70" />
        </Link>
      ))}
    </div>
  );
}

export { PORTALS };
