import { api } from '@/app/api';

export const useGame = () => {
  return api.useGetGameQuery;
};
