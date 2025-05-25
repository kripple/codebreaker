import { api } from '@/app/api';

// TODO: set user id to cookie and include it automagically
export const useMakeAttempt = () => {
  return api.useMakeAttemptMutation();
};
