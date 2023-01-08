import axios from 'axios';

const client = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
  return config;
});

export default client;
