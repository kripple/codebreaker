import { ApiProvider as Provider } from '@reduxjs/toolkit/query/react';

import { api } from '@/app/api';

export function ApiProvider({ children }: { children: ReactNode }) {
  return <Provider api={api}>{children}</Provider>;
}
