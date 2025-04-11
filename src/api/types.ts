export interface GetUploadLinkResponse {
  operation_id: string;
  href: string;
  method: 'PUT';
  templated: boolean;
}

export interface GetDownloadLinkResponse {
  operation_id: string;
  href: string;
  templated: boolean;
}
