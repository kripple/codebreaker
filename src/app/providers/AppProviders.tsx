import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
  );
}
