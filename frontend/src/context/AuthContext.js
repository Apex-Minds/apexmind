import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('apexminds_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setUser(parsed);
        } else {
          localStorage.removeItem('apexminds_user');
        }
      } catch (err) {
        localStorage.removeItem('apexminds_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const res = await api.post('/auth/login', { email, password, role });
    // Backend wraps response in { success: true, data: { token, role, name, id } }
    const userData = res.data.data;
    localStorage.setItem('apexminds_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async ({ name, email, password, role }) => {
    const res = await api.post('/auth/register', { name, email, password, role });
    return {
      ...res.data.data,
      email,
      role: res.data.data.role || role,
    };
  };

  const logout = () => {
    localStorage.removeItem('apexminds_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
