import '@mantine/core/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
}
