import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: apiBaseUrl,
});

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('apexminds_user');
  if (stored) {
    const { token } = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('apexminds_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
