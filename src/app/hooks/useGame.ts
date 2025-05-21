import * as uuid from 'uuid';

import { api } from '@/app/api';

export const useGame = (id: string | null) => {
  const userId = id && uuid.validate(id) ? id : 'new';
  const response = api.useGetGameQuery(userId);
  const data = response.currentData?.data;
  const error = response.currentData?.error;

  return {
    ...response,
    currentData: data,
    currentError: error,
  };
};
