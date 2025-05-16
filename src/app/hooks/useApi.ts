import { api } from '@/app/api';

export const useApi = () => {
  return api.useLazyGetFeedbackQuery();
};
