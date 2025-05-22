import { isAxiosError } from 'axios';
import { useState } from 'react';
import { unknownError } from '@/constants';
import { AppError } from '@/types';

export const useServiceHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = () => setError(null);

  const handler = async <T>(service: () => Promise<T>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await service();
      return Promise.resolve();
    } catch (err) {
      setError(() =>
        isAxiosError(err)
          ? { status: err.status, message: err.message || unknownError }
          : { message: unknownError },
      );
      return Promise.reject(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    error,
    isSubmitting,
    handler,
    clearError,
  };
};
