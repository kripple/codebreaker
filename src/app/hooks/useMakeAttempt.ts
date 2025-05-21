import { api } from '@/app/api';

// TODO: set user id to cookie and include it automagically
export const useMakeAttempt = () => {
  const [trigger, response] = api.useMakeAttemptMutation();
  const makeAttempt = ({ id, attempt }: { id: string; attempt: string }) =>
    trigger({ id, attempt });

  const data = response.data?.id;
  const error = response.data?.error;
  const responseData = {
    ...response,
    currentData: data,
    currentError: error,
  };

  return [makeAttempt, responseData] as const;
};
