import { MantineProvider, createTheme } from '@mantine/core';

import '@mantine/core/styles.css';

const theme = createTheme({
  cursorType: 'pointer',
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
}
