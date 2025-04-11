import { api } from './config';
import { GetDownloadLinkResponse, GetUploadLinkResponse } from './types';

export const getUploadLink = (fileName: string, overwrite: boolean = false) => {
  return api.get<GetUploadLinkResponse>(`https://cloud-api.yandex.net/v1/disk/resources/upload`, {
    headers: { Authorization: `OAuth ${import.meta.env.VITE_O_AUTH}` },
    params: { path: fileName, overwrite },
  });
};

export const uploadFile = (uploadLink: string, data: FormData) => api.put(uploadLink, data);

export const getDownloadLink = (path: string) =>
  api.get<GetDownloadLinkResponse>(`https://cloud-api.yandex.net/v1/disk/resources/download`, {
    headers: { Authorization: `OAuth ${import.meta.env.VITE_O_AUTH}` },
    params: { path },
  });
