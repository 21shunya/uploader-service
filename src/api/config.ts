import axios from 'axios';

export const api = axios.create({ baseURL: 'https://cloud-api.yandex.net/v1/disk/resources' });

api.interceptors.request.use((config) => {
  config.headers.Authorization = `OAuth ${import.meta.env.VITE_O_AUTH}`;
  return config;
});
