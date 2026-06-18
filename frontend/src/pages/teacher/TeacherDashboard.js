import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheckCircle, MdAssignment, MdMessage } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, studentsRes] = await Promise.all([
          api.get('/teacher/profile'),
          api.get('/teacher/class-students'),
        ]);
        setProfile(profileRes.data.data);
        setStudents(studentsRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="text-muted">Loading...</div>;

  return (
    <div>
      <div className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="hero-kicker">Teaching Workspace</div>
          <h1 className="hero-title">Welcome, {user?.name?.split(' ')[0]}</h1>
          <p className="hero-subtitle">
            {profile?.teachSubject
              ? `Teaching ${profile.teachSubject.subName} - ${profile.schoolClass?.className || 'No class assigned'}`
              : 'Teacher Dashboard'}
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => navigate('/teacher/attendance')}>
              Take Attendance
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/teacher/marks')}>
              Enter Marks
            </button>
          </div>
        </div>
        <div className="dashboard-hero-panel">
          <div className="hero-panel-label">Class Size</div>
          <div className="hero-panel-value">{students.length}</div>
          <div className="hero-panel-caption">Students currently assigned to your class</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/teacher/attendance')}>
          <div className="stat-icon green"><MdCheckCircle /></div>
          <div>
            <div className="stat-number">{students.length}</div>
            <div className="stat-label">Students in Class</div>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/teacher/marks')}>
          <div className="stat-icon blue"><MdAssignment /></div>
          <div>
            <div className="stat-number">{profile?.teachSubject?.sessions || 0}</div>
            <div className="stat-label">Sessions Taught</div>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/teacher/messages')}>
          <div className="stat-icon gold"><MdMessage /></div>
          <div>
            <div className="stat-number">—</div>
            <div className="stat-label">Messages</div>
          </div>
        </div>
      </div>

      <div className="card soft-panel">
        <div className="card-header">
          <h2 className="card-title" style={{ fontSize: '18px' }}>My Students</h2>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/teacher/attendance')}>
            Take Attendance
          </button>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p className="empty-state-text">No students assigned to your class yet.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td><span className="badge badge-gold">{s.rollNum || s.studentId || '—'}</span></td>
                    <td style={{ fontWeight: 500 }}>{s.name || s.user?.name || '—'}</td>
                    <td className="text-sm text-muted">{s.email || s.user?.email || '—'}</td>
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
            { label: 'Take Attendance', path: '/teacher/attendance', icon: '✅' },
            { label: 'Enter Student Marks', path: '/teacher/marks', icon: '📝' },
            { label: 'Send Message', path: '/teacher/messages', icon: '💬' },
          ].map((action) => (
            <button
              key={action.label}
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px 16px' }}
              onClick={() => navigate(action.path)}
            >
              <span style={{ fontSize: '18px' }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
