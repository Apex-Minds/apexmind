import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ className: '', numericID: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadClasses(); }, []);

  const loadClasses = async () => {
    try {
      const res = await api.get('/admin/classes');
      setClasses(res.data.data || []);
    } catch { toast.error('Failed to load classes'); }
    finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.className || !form.numericID) { toast.error('Both fields are required'); return; }
    setSaving(true);
    try {
      await api.post('/admin/classes', form);
      toast.success('Class created');
      setShowModal(false);
      setForm({ className: '', numericID: '' });
      loadClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create class');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete class "${name}"? This will also remove all its subjects.`)) return;
    try {
      await api.delete(`/admin/classes/${id}`);
      toast.success('Class deleted');
      setClasses((prev) => prev.filter((c) => c._id !== id));
    } catch { toast.error('Failed to delete class'); }
  };

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Classes</h1>
          <p className="page-subtitle">{classes.length} classes created</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <MdAdd size={18} /> Create Class
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {classes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <p className="empty-state-text">No classes created yet.</p>
          </div>
        ) : classes.map((cls) => (
          <div key={cls._id} className="card" style={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{cls.className}</h3>
                <p className="text-sm text-muted">ID: {cls.numericID}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cls._id, cls.className)}>
                <MdDelete size={14} />
              </button>
            </div>
            <div className="flex gap-3">
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700 }}>{cls.students?.length || 0}</div>
                <div className="text-sm text-muted">Students</div>
              </div>
              <div style={{ width: 1, background: 'var(--border)' }} />
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700 }}>{cls.subjects?.length || 0}</div>
                <div className="text-sm text-muted">Subjects</div>
              </div>
              <div style={{ width: 1, background: 'var(--border)' }} />
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700 }}>{cls.teacher ? 1 : 0}</div>
                <div className="text-sm text-muted">Teachers</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Class</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><MdClose /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Class Name</label>
                <input className="form-control" placeholder="e.g. Business Management Year 1" value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Numeric ID</label>
                <input type="number" className="form-control" placeholder="e.g. 101" value={form.numericID}
                  onChange={(e) => setForm({ ...form, numericID: e.target.value })} />
              </div>
              <div className="flex gap-2 mt-4" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Creating…' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
