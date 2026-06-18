import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPeople, MdSchool, MdBook, MdSubject, MdChevronRight, MdFlashOn } from 'react-icons/md';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0, subjects: 0 });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, studentsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/students'),
        ]);
        setStats(statsRes.data.data);
        setRecentStudents(studentsRes.data.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats.students, icon: MdPeople, color: 'blue', path: '/admin/students' },
    { label: 'Teachers', value: stats.teachers, icon: MdSchool, color: 'green', path: '/admin/teachers' },
    { label: 'Classes', value: stats.classes, icon: MdBook, color: 'gold', path: '/admin/classes' },
    { label: 'Subjects', value: stats.subjects, icon: MdSubject, color: 'red', path: '/admin/subjects' },
  ];

  if (loading) return <div className="text-muted">Loading dashboard…</div>;

  return (
    <div>
      <div className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="hero-kicker">ApexMinds Operations</div>
          <h1 className="hero-title">Admin Dashboard</h1>
          <p className="hero-subtitle">
            A high-level view of enrolment, staffing, and curriculum health across the school.
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => navigate('/admin/students')}>
              <MdFlashOn size={16} /> Quick Enrolment
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/admin/teachers')}>
              Manage Staff <MdChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="dashboard-hero-panel">
          <div className="hero-panel-label">Live Snapshot</div>
          <div className="hero-panel-value">{stats.students + stats.teachers + stats.classes + stats.subjects}</div>
          <div className="hero-panel-caption">Core records currently active in the system</div>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="stat-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(s.path)}
            >
              <div className={`stat-icon ${s.color}`}>
                <Icon />
              </div>
              <div>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card soft-panel">
        <div className="card-header">
          <h2 className="card-title" style={{ fontSize: '18px' }}>Recent Students</h2>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/students')}>
            View All
          </button>
        </div>

        {recentStudents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p className="empty-state-text">No students enrolled yet. Add students to get started.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Class</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 500 }}>{s.user?.name || '—'}</td>
                    <td>{s.studentId || '—'}</td>
                    <td>
                      <span className="badge badge-info">
                        {s.class?.name || s.class?.className || '—'}
                      </span>
                    </td>
                    <td className="text-muted text-sm">{s.user?.email || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card mt-6 soft-panel">
        <div className="card-header">
          <h2 className="card-title" style={{ fontSize: '18px' }}>Quick Actions</h2>
        </div>
        <div className="grid-2">
          {[
            { label: 'Enroll New Student', path: '/admin/students', icon: '👤' },
            { label: 'Add Teacher', path: '/admin/teachers', icon: '🎓' },
            { label: 'Create Class', path: '/admin/classes', icon: '📚' },
            { label: 'Add Subject', path: '/admin/subjects', icon: '📖' },
          ].map((action) => (
            <button
              key={action.label}
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '16px 20px', border: '1px solid var(--border)', background: 'var(--surface)' }}
              onClick={() => navigate(action.path)}
            >
              <span style={{ fontSize: '20px', marginRight: '8px' }}>{action.icon}</span>
              <span style={{ fontWeight: 600 }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
