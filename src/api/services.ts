import { api } from './config';

export const getUploadLink = (fileName: string, overwrite: boolean = false) => {
  return api.get(`https://cloud-api.yandex.net/v1/disk/resources/upload`, {
    headers: { Authorization: `OAuth ${import.meta.env.VITE_O_AUTH}` },
    params: {
      path: fileName,
      overwrite: overwrite,
    },
  });
};

export const uploadFile = (uploadLink: string, data: FormData) => api.put(uploadLink, data);
