import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/student/performance')
      .then((res) => setAttendance(res.data.data?.attendance || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-muted">Loading…</div>;

  const overall = attendance.length
    ? Math.round(attendance.reduce((a, s) => a + s.percentage, 0) / attendance.length)
    : 0;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Attendance</h1>
        <p className="page-subtitle">Attendance summary by subject</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <div className="stat-card">
          <div className="stat-icon green">📅</div>
          <div>
            <div className="stat-number">{overall}%</div>
            <div className="stat-label">Overall Attendance</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">📚</div>
          <div>
            <div className="stat-number">{attendance.reduce((a, s) => a + s.present, 0)}</div>
            <div className="stat-label">Total Classes Present</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">❌</div>
          <div>
            <div className="stat-number">{attendance.reduce((a, s) => a + s.absent, 0)}</div>
            <div className="stat-label">Total Absences</div>
          </div>
        </div>
      </div>

      <div className="card">
        {attendance.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <p className="empty-state-text">No attendance records yet.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Total</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a, i) => {
                  const statusColor =
                    a.percentage >= 75 ? 'success' :
                    a.percentage >= 50 ? 'warning' : 'danger';
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{a.subject}</td>
                      <td><span className="badge badge-gold">{a.subCode}</span></td>
                      <td><span className="badge badge-success">{a.present}</span></td>
                      <td><span className="badge badge-danger">{a.absent}</span></td>
                      <td>{a.total}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{ width: `${a.percentage}%` }} />
                          </div>
                          <span className={`badge badge-${statusColor}`} style={{ minWidth: 48 }}>
                            {a.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {attendance.some((a) => a.percentage < 75) && (
        <div className="card mt-4" style={{ background: 'var(--warning-light)', borderColor: 'var(--warning)', marginTop: 16 }}>
          <p style={{ fontSize: '14px', color: 'var(--warning)' }}>
            ⚠️ Your attendance in some subjects is below 75%. Please attend classes regularly to avoid academic issues.
          </p>
        </div>
      )}
    </div>
  );
}
