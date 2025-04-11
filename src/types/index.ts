export type ErrorStatus = 400 | 401 | 403 | 404 | 406 | 409 | 413 | 423 | 429 | 500 | 503 | 507;
export interface AppError {
  status?: number;
  message: string;
}
