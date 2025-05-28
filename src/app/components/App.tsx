import { Center, Container } from '@mantine/core';

import { Game } from '@/app/components/Game';
import { Header } from '@/app/components/Header';
import { Profiler } from '@/app/components/Profiler';
import { AppProviders } from '@/app/providers/AppProviders';

import '@/app/components/App.css';

export function App() {
  return (
    <Profiler component="App">
      <AppProviders>
        <Header />
        <Center>
          <Container m="md">
            <main className="main">
              <Game />
            </main>
          </Container>
        </Center>
      </AppProviders>
    </Profiler>
  );
}
