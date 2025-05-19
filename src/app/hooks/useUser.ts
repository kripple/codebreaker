import * as uuid from 'uuid';

import { api } from '@/app/api';

export const useUser = (id: string | null) => {
  const userId = id && uuid.validate(id) ? id : 'new';
  return api.useGetUserQuery(userId);
};
