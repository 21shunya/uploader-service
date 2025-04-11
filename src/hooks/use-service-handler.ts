import { isAxiosError } from 'axios';
import { useState } from 'react';
import { errorMessages } from '@/constants';
import { AppError } from '@/types';

export const useServiceHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = () => setError(null);

  const handler = async (service: () => Promise<unknown>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await service();
      return Promise.resolve();
    } catch (err) {
      if (isAxiosError(err)) {
        const status = err.status;
        const message = status ? errorMessages[status] : err?.response?.data.message || 'Неизвестная ошибка';
        setError({ status, message });
      }

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
