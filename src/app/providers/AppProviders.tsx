import { MantineProvider, createTheme } from '@mantine/core';

import { Profiler } from '@/app/components/Profiler';

import '@mantine/core/styles.css';

const theme = createTheme({
  cursorType: 'pointer',
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Profiler component="AppProviders">
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        {children}
      </MantineProvider>
    </Profiler>
  );
}
