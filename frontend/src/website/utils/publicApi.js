import axios from 'axios';

const publicApiBaseUrl = process.env.REACT_APP_API_URL || '/api';

const publicApi = axios.create({
  baseURL: `${publicApiBaseUrl.replace(/\/$/, '')}/public`,
});

export const fetchNewsEvents = (params = {}) =>
  publicApi.get('/news-events', { params }).then((r) => r.data);

export const fetchNewsEvent = (slug) =>
  publicApi.get(`/news-events/${slug}`).then((r) => r.data);

export const submitContact = (data) =>
  publicApi.post('/contact', data).then((r) => r.data);

export default publicApi;
