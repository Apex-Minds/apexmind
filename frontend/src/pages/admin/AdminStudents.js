import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', rollNum: '', sclassName: '' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsRes, classesRes] = await Promise.all([
        api.get('/admin/students'),
        api.get('/admin/classes'),
      ]);
      setStudents(studentsRes.data.data || []);
      setClasses(classesRes.data.data || []);
    } catch (err) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.rollNum || !form.sclassName) {
      toast.error('All fields are required');
      return;
    }
    setSaving(true);
    try {
      await api.post('/admin/students', form);
      toast.success('Student enrolled successfully');
      setShowModal(false);
      setForm({ name: '', email: '', password: '', rollNum: '', sclassName: '' });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to enroll student');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the system?`)) return;
    try {
      await api.delete(`/admin/students/${id}`);
      toast.success('Student removed');
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error('Failed to delete student');
    }
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      String(s.rollNum).includes(search) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">{students.length} students enrolled</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <MdAdd size={18} /> Enroll Student
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <input
            className="form-control"
            style={{ maxWidth: 280 }}
            placeholder="Search by name, email, or roll no…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p className="empty-state-text">
              {search ? 'No students match your search.' : 'No students enrolled yet.'}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id}>
                    <td>
                      <span className="badge badge-gold">{s.rollNum}</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td className="text-sm text-muted">{s.email}</td>
                    <td>
                      <span className="badge badge-info">{s.schoolClass?.className || '—'}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(s._id, s.name)}
                      >
                        <MdDelete size={14} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Enroll New Student</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <MdClose />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    placeholder="John Mensah"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Roll Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1001"
                    value={form.rollNum}
                    onChange={(e) => setForm({ ...form, rollNum: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="student@apexminds.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assign to Class</label>
                <select
                  className="form-control"
                  value={form.sclassName}
                  onChange={(e) => setForm({ ...form, sclassName: e.target.value })}
                >
                  <option value="">— Select a class —</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.className}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 mt-4" style={{ justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Enrolling…' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
