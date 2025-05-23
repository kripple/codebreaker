import { useEffect, useState } from 'react';
import * as uuid from 'uuid';

import { api } from '@/app/api';

export const useGame = () => {
  const key = 'user_id' as const;
  const [userId, setUserId] = useState<string | null>(
    (() => {
      const savedValue = window.localStorage.getItem(key);
      return uuid.validate(savedValue) ? savedValue : null;
    })(),
  );
  const id = userId || 'new';
  const response = api.useGetGameQuery(id);
  const data = response.currentData?.data;
  const error = response.currentData?.error;

  useEffect(() => {
    setUserId((current) => {
      if (!data?.id || data.id === current || !uuid.validate(data.id))
        return current;
      window.localStorage.setItem(key, data.id);
      return data.id;
    });
  }, [data]);

  return {
    ...response,
    currentData: data,
    currentError: error,
    userId,
  };
};
