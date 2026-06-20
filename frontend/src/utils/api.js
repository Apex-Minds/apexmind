import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: apiBaseUrl,
});

const readStoredUser = () => {
  const stored = localStorage.getItem('apexminds_user');
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (err) {
    localStorage.removeItem('apexminds_user');
    return null;
  }
};

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const user = readStoredUser();
  if (user?.token) {
    const { token } = user;
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
