import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', teachSubject: '', schoolClass: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [tRes, cRes, sRes] = await Promise.all([
        api.get('/admin/teachers'),
        api.get('/admin/classes'),
        api.get('/admin/subjects'),
      ]);
      setTeachers(tRes.data.data || []);
      setClasses(cRes.data.data || []);
      setSubjects(sRes.data.data || []);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Name, email and password are required');
      return;
    }
    setSaving(true);
    try {
      await api.post('/admin/teachers', form);
      toast.success('Teacher added successfully');
      setShowModal(false);
      setForm({ name: '', email: '', password: '', teachSubject: '', schoolClass: '' });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add teacher');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the system?`)) return;
    try {
      await api.delete(`/admin/teachers/${id}`);
      toast.success('Teacher removed');
      setTeachers((prev) => prev.filter((t) => t._id !== id));
    } catch {
      toast.error('Failed to delete teacher');
    }
  };

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Teachers</h1>
          <p className="page-subtitle">{teachers.length} teachers on staff</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <MdAdd size={18} /> Add Teacher
        </button>
      </div>

      <div className="card">
        {teachers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎓</div>
            <p className="empty-state-text">No teachers added yet.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Teaches</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t._id}>
                    <td style={{ fontWeight: 500 }}>{t.name}</td>
                    <td className="text-sm text-muted">{t.email}</td>
                    <td>
                      {t.teachSubject ? (
                        <span className="badge badge-success">{t.teachSubject.subName}</span>
                      ) : (
                        <span className="text-muted text-sm">Not assigned</span>
                      )}
                    </td>
                    <td>
                      {t.schoolClass ? (
                        <span className="badge badge-info">{t.schoolClass.className}</span>
                      ) : '—'}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id, t.name)}>
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
              <h2 className="modal-title">Add New Teacher</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><MdClose /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-control" placeholder="Dr. Akosua Mensah" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="teacher@apexminds.edu" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Minimum 6 characters" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Assign Subject</label>
                  <select className="form-control" value={form.teachSubject}
                    onChange={(e) => setForm({ ...form, teachSubject: e.target.value })}>
                    <option value="">— Optional —</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.subName} ({s.subCode})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Assign Class</label>
                  <select className="form-control" value={form.schoolClass}
                    onChange={(e) => setForm({ ...form, schoolClass: e.target.value })}>
                    <option value="">— Optional —</option>
                    {classes.map((c) => (
                      <option key={c._id} value={c._id}>{c.className}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Adding…' : 'Add Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
