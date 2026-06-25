import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subName: '', subCode: '', sessions: '', sclassName: '', teacher: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [sRes, cRes, tRes] = await Promise.all([
        api.get('/admin/subjects'),
        api.get('/admin/classes'),
        api.get('/admin/teachers'),
      ]);
      setSubjects(sRes.data.data || []);
      setClasses(cRes.data.data || []);
      setTeachers(tRes.data.data || []);
    } catch { toast.error('Failed to load subjects'); }
    finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.subName || !form.subCode || !form.sclassName) { toast.error('Subject name, code and class are required'); return; }
    setSaving(true);
    try {
      await api.post('/admin/subjects', form);
      toast.success('Subject created');
      setShowModal(false);
      setForm({ subName: '', subCode: '', sessions: '', sclassName: '', teacher: '' });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create subject');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete subject "${name}"?`)) return;
    try {
      await api.delete(`/admin/subjects/${id}`);
      toast.success('Subject deleted');
      setSubjects((prev) => prev.filter((s) => s._id !== id));
    } catch { toast.error('Failed to delete subject'); }
  };

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Subjects</h1>
          <p className="page-subtitle">{subjects.length} subjects in curriculum</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <MdAdd size={18} /> Add Subject
        </button>
      </div>

      <div className="card">
        {subjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📖</div>
            <p className="empty-state-text">No subjects created yet.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject Name</th>
                  <th>Code</th>
                  <th>Class</th>
                  <th>Sessions</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 500 }}>{s.subName}</td>
                    <td><span className="badge badge-gold">{s.subCode}</span></td>
                    <td><span className="badge badge-info">{s.sclassName?.className || '—'}</span></td>
                    <td>{s.sessions}</td>
                    <td>{s.teacher?.name || <span className="text-muted text-sm">Unassigned</span>}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id, s.subName)}>
                        <MdDelete size={14} /> Delete
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
              <h2 className="modal-title">Add New Subject</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><MdClose /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Subject Name</label>
                  <input className="form-control" placeholder="Financial Accounting" value={form.subName}
                    onChange={(e) => setForm({ ...form, subName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject Code</label>
                  <input className="form-control" placeholder="ACC101" value={form.subCode}
                    onChange={(e) => setForm({ ...form, subCode: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Total Sessions</label>
                  <input type="number" className="form-control" placeholder="30" value={form.sessions}
                    onChange={(e) => setForm({ ...form, sessions: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Assign to Class</label>
                  <select className="form-control" value={form.sclassName}
                    onChange={(e) => setForm({ ...form, sclassName: e.target.value })}>
                    <option value="">— Select class —</option>
                    {classes.map((c) => <option key={c._id} value={c._id}>{c.className}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Assign to Teacher</label>
                <select className="form-control" value={form.teacher}
                  onChange={(e) => setForm({ ...form, teacher: e.target.value })}>
                  <option value="">â€” Optional â€”</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-4" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Adding…' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
