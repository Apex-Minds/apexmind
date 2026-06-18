import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  Title, Tooltip, Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState({ marks: [], attendance: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/student/performance')
      .then((res) => setPerformance(res.data.data || { marks: [], attendance: [] }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const avgMark = performance.marks.length
    ? Math.round(performance.marks.reduce((a, m) => a + m.marks, 0) / performance.marks.length)
    : 0;

  const avgAttendance = performance.attendance.length
    ? Math.round(performance.attendance.reduce((a, s) => a + s.percentage, 0) / performance.attendance.length)
    : 0;

  const marksChartData = {
    labels: performance.marks.map((m) => m.subCode || m.subject),
    datasets: [{
      label: 'Marks',
      data: performance.marks.map((m) => m.marks),
      backgroundColor: performance.marks.map((m) =>
        m.marks >= 70 ? 'rgba(45,125,70,0.7)' :
        m.marks >= 50 ? 'rgba(217,119,6,0.7)' :
        'rgba(192,57,43,0.7)'
      ),
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const attendanceChartData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [
        performance.attendance.reduce((a, s) => a + (s.present || 0), 0),
        performance.attendance.reduce((a, s) => a + (s.absent || 0), 0),
      ],
      backgroundColor: ['rgba(45,125,70,0.8)', 'rgba(192,57,43,0.8)'],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { font: { family: 'DM Sans', size: 12 } },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      x: {
        ticks: { font: { family: 'DM Sans', size: 12 } },
        grid: { display: false },
      },
    },
  };

  if (loading) return <div className="text-muted">Loading...</div>;

  return (
    <div>
      <div className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="hero-kicker">Student Overview</div>
          <h1 className="hero-title">Hello, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="hero-subtitle">Your academic overview at ApexMinds.</p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => navigate('/student/performance')}>
              View Performance
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/student/attendance')}>
              Check Attendance
            </button>
          </div>
        </div>
        <div className="dashboard-hero-panel">
          <div className="hero-panel-label">Average Score</div>
          <div className="hero-panel-value">{avgMark}%</div>
          <div className="hero-panel-caption">Across all recorded assessments</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon gold">📊</div>
          <div>
            <div className="stat-number">{avgMark}%</div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div>
            <div className="stat-number">{avgAttendance}%</div>
            <div className="stat-label">Attendance Rate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">📚</div>
          <div>
            <div className="stat-number">{performance.marks.length}</div>
            <div className="stat-label">Subjects Assessed</div>
          </div>
        </div>
      </div>

      {performance.marks.length > 0 && (
        <div className="charts-grid" style={{ marginBottom: 24 }}>
          <div className="card soft-panel">
            <h2 className="card-title" style={{ fontSize: '16px', marginBottom: 16 }}>
              Marks by Subject
            </h2>
            <div className="chart-container">
              <Bar data={marksChartData} options={chartOptions} />
            </div>
          </div>

          <div className="card soft-panel">
            <h2 className="card-title" style={{ fontSize: '16px', marginBottom: 16 }}>
              Overall Attendance
            </h2>
            <div className="chart-container">
              <Doughnut
                data={attendanceChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom', labels: { font: { family: 'DM Sans' } } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}

      {performance.marks.length > 0 && (
        <div className="card soft-panel">
          <h2 className="card-title" style={{ fontSize: '16px', marginBottom: 16 }}>
            Subject Performance
          </h2>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {performance.marks.map((m, i) => {
                  const grade =
                    m.marks >= 80 ? { label: 'A', color: 'success' } :
                    m.marks >= 70 ? { label: 'B', color: 'info' } :
                    m.marks >= 60 ? { label: 'C', color: 'warning' } :
                    m.marks >= 50 ? { label: 'D', color: 'warning' } :
                    { label: 'F', color: 'danger' };
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{m.subject}</td>
                      <td><span className="badge badge-gold">{m.subCode}</span></td>
                      <td style={{ fontWeight: 600 }}>{m.marks}/100</td>
                      <td><span className={`badge badge-${grade.color}`}>{grade.label}</span></td>
                      <td style={{ minWidth: 120 }}>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${m.marks}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {performance.marks.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <p className="empty-state-text">No assessment data yet. Marks will appear here once your teacher enters them.</p>
          </div>
        </div>
      )}
    </div>
  );
}
