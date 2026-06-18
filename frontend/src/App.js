import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import AdminDashboard  from './pages/admin/AdminDashboard';
import AdminStudents   from './pages/admin/AdminStudents';
import AdminTeachers   from './pages/admin/AdminTeachers';
import AdminClasses    from './pages/admin/AdminClasses';
import AdminSubjects   from './pages/admin/AdminSubjects';
import AdminMessages   from './pages/admin/AdminMessages';
import TeacherDashboard  from './pages/teacher/TeacherDashboard';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherMarks      from './pages/teacher/TeacherMarks';
import TeacherMessages   from './pages/teacher/TeacherMessages';
import StudentDashboard  from './pages/student/StudentDashboard';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentMarks      from './pages/student/StudentMarks';
import StudentMessages   from './pages/student/StudentMessages';
import AppLayout from './components/AppLayout';

import WebsiteLayout from './website/WebsiteLayout';
import HomePage from './website/pages/HomePage';
import AboutPage from './website/pages/AboutPage';
import ProgramsPage from './website/pages/ProgramsPage';
import AdmissionsPage from './website/pages/AdmissionsPage';
import NewsEventsPage from './website/pages/NewsEventsPage';
import InnovationLabPage from './website/pages/InnovationLabPage';
import GalleryPage from './website/pages/GalleryPage';
import ContactPage from './website/pages/ContactPage';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const roleHome = {
    admin: '/admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/',
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={roleHome[user.role] || '/'} replace />;
  return children;
};

const PublicAuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (user) {
    const roleHome = {
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/',
    };
    return <Navigate to={roleHome[user.role] || '/'} replace />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<PublicAuthRoute><LoginPage /></PublicAuthRoute>} />

    <Route element={<WebsiteLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/admissions" element={<AdmissionsPage />} />
      <Route path="/news-events" element={<NewsEventsPage />} />
      <Route path="/innovation-lab" element={<InnovationLabPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Route>

    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route path="admin/dashboard"  element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="admin/students"   element={<ProtectedRoute roles={['admin']}><AdminStudents /></ProtectedRoute>} />
      <Route path="admin/teachers"   element={<ProtectedRoute roles={['admin']}><AdminTeachers /></ProtectedRoute>} />
      <Route path="admin/classes"    element={<ProtectedRoute roles={['admin']}><AdminClasses /></ProtectedRoute>} />
      <Route path="admin/subjects"   element={<ProtectedRoute roles={['admin']}><AdminSubjects /></ProtectedRoute>} />
      <Route path="admin/messages"   element={<ProtectedRoute roles={['admin']}><AdminMessages /></ProtectedRoute>} />

      <Route path="teacher/dashboard"  element={<ProtectedRoute roles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="teacher/attendance" element={<ProtectedRoute roles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />
      <Route path="teacher/marks"      element={<ProtectedRoute roles={['teacher']}><TeacherMarks /></ProtectedRoute>} />
      <Route path="teacher/messages"   element={<ProtectedRoute roles={['teacher']}><TeacherMessages /></ProtectedRoute>} />

      <Route path="student/dashboard"   element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="student/performance" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="student/attendance"  element={<ProtectedRoute roles={['student']}><StudentAttendance /></ProtectedRoute>} />
      <Route path="student/marks"       element={<ProtectedRoute roles={['student']}><StudentMarks /></ProtectedRoute>} />
      <Route path="student/messages"    element={<ProtectedRoute roles={['student']}><StudentMessages /></ProtectedRoute>} />
    </Route>
  </Routes>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme="colored" />
      </BrowserRouter>
    </AuthProvider>
  );
}
