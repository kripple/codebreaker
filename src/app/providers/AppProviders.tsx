import { Profiler } from '@/app/components/Profiler';
import { ApiProvider } from '@/app/providers/ApiProvider';
import { ModalProvider } from '@/app/providers/ModalProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Profiler component="AppProviders">
      <ApiProvider>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </ApiProvider>
    </Profiler>
  );
}
