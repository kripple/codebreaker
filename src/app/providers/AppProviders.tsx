import { Profiler } from '@/app/components/Profiler';
import { ApiProvider } from '@/app/providers/ApiProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Profiler component="AppProviders">
      <ApiProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ApiProvider>
    </Profiler>
  );
}
