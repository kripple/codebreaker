import { useEffect, useState } from 'react';
import * as uuid from 'uuid';

import { api } from '@/app/api';
import { isSameDate, toTimestamp } from '@/utils/time';

const invalidateGame = () => {
  api.util.invalidateTags(['Game']);
};

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
  const currentId = response.currentData?.id;

  const timestamp = response.startedTimeStamp;
  const date = response.currentData?.date;
  if (date && timestamp && !isSameDate([toTimestamp(date), timestamp])) {
    invalidateGame();
  }

  useEffect(() => {
    setUserId((current) => {
      if (!currentId || currentId === current || !uuid.validate(currentId))
        return current;
      window.localStorage.setItem(key, currentId);
      return currentId;
    });
  }, [currentId]);

  return {
    ...response,
    userId,
  };
};
