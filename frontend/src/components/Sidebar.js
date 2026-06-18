import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdDashboard, MdPeople, MdSchool, MdBook, MdSubject,
  MdCheckCircle, MdBarChart, MdMessage, MdLogout, MdHome,
  MdAssignment
} from 'react-icons/md';

const adminNav = [
  { label: 'Dashboard', icon: MdDashboard, path: '/admin/dashboard' },
  { label: 'Students', icon: MdPeople, path: '/admin/students' },
  { label: 'Teachers', icon: MdSchool, path: '/admin/teachers' },
  { label: 'Classes', icon: MdBook, path: '/admin/classes' },
  { label: 'Subjects', icon: MdSubject, path: '/admin/subjects' },
  { label: 'Messages', icon: MdMessage, path: '/admin/messages' },
];

const teacherNav = [
  { label: 'Dashboard', icon: MdDashboard, path: '/teacher/dashboard' },
  { label: 'Attendance', icon: MdCheckCircle, path: '/teacher/attendance' },
  { label: 'Student Marks', icon: MdAssignment, path: '/teacher/marks' },
  { label: 'Messages', icon: MdMessage, path: '/teacher/messages' },
];

const studentNav = [
  { label: 'Dashboard', icon: MdDashboard, path: '/student/dashboard' },
  { label: 'Performance', icon: MdBarChart, path: '/student/performance' },
  { label: 'Attendance', icon: MdCheckCircle, path: '/student/attendance' },
  { label: 'Messages', icon: MdMessage, path: '/student/messages' },
];

const navMap = { admin: adminNav, teacher: teacherNav, student: studentNav };

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = navMap[user?.role] || [];
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="school-name">ApexMinds Academy</div>
        <div className="school-subtitle">RBAS System</div>
      </div>

      <div style={{ padding: '16px 24px 0' }}>
        <button className="nav-item" onClick={() => navigate('/')}>
          <MdHome className="nav-icon" />
          Return to Main Site
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{initials}</div>
        <div className="user-info">
          <div className="user-name">{user?.name}</div>
          <div className="user-role">{user?.role}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="nav-icon" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-logout">
        <button className="nav-item" onClick={logout}>
          <MdLogout className="nav-icon" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
