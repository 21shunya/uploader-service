import axios from 'axios';
import { api } from './config';
import { GetDownloadLinkResponse, GetUploadLinkResponse } from './types';

export const getUploadLink = (fileName: string, overwrite: boolean = false) => {
  return api.get<GetUploadLinkResponse>('/upload', {
    params: { path: fileName, overwrite },
  });
};

export const uploadFile = (uploadLink: string, data: FormData) => axios.put(uploadLink, data);

export const getDownloadLink = (path: string) =>
  api.get<GetDownloadLinkResponse>('/download', {
    params: { path },
  });
