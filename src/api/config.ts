import axios, { isAxiosError } from 'axios';
import { errorMessages } from '@/constants';

export const api = axios.create({ baseURL: 'https://cloud-api.yandex.net/v1/disk/resources' });

api.interceptors.request.use((config) => {
  config.headers.Authorization = `OAuth ${import.meta.env.VITE_O_AUTH}`;
  return config;
});

api.interceptors.response.use(null, (error) => {
  if (!isAxiosError(error)) {
    return Promise.reject(error);
  }

  const { status, response } = error;
  return Promise.reject({
    ...error,
    isAxiosError: true,
    message: status ? errorMessages[status] : response?.data.message,
  });
});
