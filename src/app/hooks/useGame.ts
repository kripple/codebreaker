import * as uuid from 'uuid';

import { api } from '@/app/api';

export const useGame = (id: string | null) => {
  const userId = id && uuid.validate(id) ? id : 'new';
  return api.useGetGameQuery(userId);
};
