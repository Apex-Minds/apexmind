import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const initialRole = useMemo(() => {
    const roleParam = searchParams.get('role') || searchParams.get('portal');
    return ROLES.some((item) => item.value === roleParam) ? roleParam : 'student';
  }, [searchParams]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);
  const [registeredNotice, setRegisteredNotice] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [user, navigate, location.state]);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  useEffect(() => {
    setEmail(searchParams.get('email') || '');
    setRegisteredNotice(searchParams.get('registered') === '1');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const loggedIn = await login(email, password, role);
      toast.success(`Welcome back, ${loggedIn.name}!`);
      const redirectMap = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/',
      };
      navigate(location.state?.from?.pathname || redirectMap[loggedIn.role] || '/', {
        replace: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your registered credentials to continue.</p>
        </div>

        {registeredNotice && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Account created successfully. Please sign in below.
          </div>
        )}

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {ROLES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setRole(item.value)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                role === item.value
                  ? 'border-[#0f766e] bg-[#0f766e]/5 text-[#0f766e]'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f766e] px-5 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing In...' : 'Sign In'}
            <FiArrowRight />
          </button>
        </form>

      </div>
    </div>
  );
}
