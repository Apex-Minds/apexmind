import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function TeacherMarks() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState({});
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

        const defaults = {};
        (studentsRes.data.data || []).forEach((s) => { defaults[s._id] = ''; });
        setMarks(defaults);
      } catch {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleMarkChange = (studentId, value) => {
    const num = parseInt(value);
    if (value !== '' && (isNaN(num) || num < 0 || num > 100)) return;
    setMarks((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedSubject) { toast.error('Please select a subject'); return; }

    const marksData = students
      .filter((s) => marks[s._id] !== '')
      .map((s) => ({ studentId: s._id, marks: parseInt(marks[s._id]) }));

    if (marksData.length === 0) { toast.error('Enter at least one student\'s marks'); return; }

    setSaving(true);
    try {
      await api.post('/teacher/marks/bulk', { subjectId: selectedSubject, marksData });
      toast.success('Marks saved successfully!');
    } catch {
      toast.error('Failed to save marks');
    } finally {
      setSaving(false);
    }
  };

  const getGrade = (score) => {
    if (score >= 80) return { label: 'A', color: 'success' };
    if (score >= 70) return { label: 'B', color: 'info' };
    if (score >= 60) return { label: 'C', color: 'warning' };
    if (score >= 50) return { label: 'D', color: 'warning' };
    return { label: 'F', color: 'danger' };
  };

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Student Marks</h1>
        <p className="page-subtitle">Enter assessment scores for your class (0–100)</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Select Subject</label>
          <select
            className="form-control"
            style={{ maxWidth: 360 }}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">— Select subject to enter marks —</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.subName} ({s.subCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedSubject && students.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title" style={{ fontSize: '16px' }}>
              {subjects.find((s) => s._id === selectedSubject)?.subName} — Marks Entry
            </h2>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th>Marks (0–100)</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const score = parseInt(marks[s._id]);
                  const grade = !isNaN(score) && marks[s._id] !== '' ? getGrade(score) : null;
                  return (
                    <tr key={s._id}>
                      <td><span className="badge badge-gold">{s.rollNum}</span></td>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          style={{ maxWidth: 100, padding: '6px 10px' }}
                          min="0"
                          max="100"
                          placeholder="—"
                          value={marks[s._id]}
                          onChange={(e) => handleMarkChange(s._id, e.target.value)}
                        />
                      </td>
                      <td>
                        {grade ? (
                          <span className={`badge badge-${grade.color}`}>{grade.label}</span>
                        ) : (
                          <span className="text-muted text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '16px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving…' : 'Save All Marks'}
            </button>
          </div>
        </div>
      )}

      {students.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">No students in your class.</p>
          </div>
        </div>
      )}
    </div>
  );
}
