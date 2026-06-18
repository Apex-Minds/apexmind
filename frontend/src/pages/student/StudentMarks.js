import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function StudentMarks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const marksRes = await api.get('/student/marks');
        setMarks(marksRes.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="text-muted">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Marks</h1>
        <p className="page-subtitle">Detailed breakdown of your assessment results</p>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Exam Type</th>
                <th>Score</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr key={mark._id}>
                  <td style={{ fontWeight: 500 }}>{mark.subject?.name || '—'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{mark.examType}</td>
                  <td>{mark.score}</td>
                  <td>{mark.totalMarks}</td>
                  <td>{Math.round((mark.score / mark.totalMarks) * 100)}%</td>
                </tr>
              ))}
              {marks.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ color: '#64748b', textAlign: 'center', padding: 24 }}>
                    No marks recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
