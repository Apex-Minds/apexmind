import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function TeacherAttendance() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [studentsRes, subjectsRes] = await Promise.all([
          api.get('/teacher/class-students'),
          api.get('/teacher/subjects'),
        ]);
        setStudents(studentsRes.data.data || []);
        setSubjects(subjectsRes.data.data || []);

        // Default all to Present
        const defaults = {};
        (studentsRes.data.data || []).forEach((s) => { defaults[s._id] = 'Present'; });
        setAttendance(defaults);
      } catch (err) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present',
    }));
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach((s) => { updated[s._id] = status; });
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    if (!selectedSubject) { toast.error('Please select a subject'); return; }
    if (students.length === 0) { toast.error('No students in class'); return; }

    setSaving(true);
    try {
      const attendanceData = students.map((s) => ({
        student: s._id,
        status: attendance[s._id] || 'Present',
      }));

      await api.post('/teacher/attendance', {
        subjectId: selectedSubject,
        date,
        attendanceData,
      });

      toast.success('Attendance saved successfully!');
    } catch (err) {
      toast.error('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const presentCount = Object.values(attendance).filter((v) => v === 'Present').length;
  const absentCount = students.length - presentCount;

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Take Attendance</h1>
        <p className="page-subtitle">Mark student attendance for a session</p>
      </div>

      <div className="card mb-4" style={{ marginBottom: 24 }}>
        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Subject</label>
            <select
              className="form-control"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">— Select subject —</option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.subName} ({s.subCode})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <>
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <span className="badge badge-success">{presentCount} Present</span>
                <span className="badge badge-danger">{absentCount} Absent</span>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-outline" onClick={() => markAll('Present')}>
                  All Present
                </button>
                <button className="btn btn-sm btn-outline" onClick={() => markAll('Absent')}>
                  All Absent
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Toggle</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const isPresent = attendance[s._id] === 'Present';
                    return (
                      <tr
                        key={s._id}
                        className={isPresent ? 'attendance-row-present' : 'attendance-row-absent'}
                      >
                        <td><span className="badge badge-gold">{s.rollNum}</span></td>
                        <td style={{ fontWeight: 500 }}>{s.name}</td>
                        <td>
                          <span className={`badge ${isPresent ? 'badge-success' : 'badge-danger'}`}>
                            {isPresent ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${isPresent ? 'btn-danger' : 'btn-outline'}`}
                            onClick={() => toggleAttendance(s._id)}
                          >
                            {isPresent ? 'Mark Absent' : 'Mark Present'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '16px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={saving || !selectedSubject}
              >
                {saving ? 'Saving…' : 'Save Attendance'}
              </button>
            </div>
          </div>
        </>
      )}

      {students.length === 0 && !loading && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p className="empty-state-text">No students in your class yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
