import { Center, Container, Title } from '@mantine/core';

import { Game } from '@/app/components/Game';
import { Profiler } from '@/app/components/Profiler';
import { AppProviders } from '@/app/providers/AppProviders';

import '@/app/components/App.css';

export function App() {
  return (
    <Profiler component="App">
      <AppProviders>
        <Center>
          <Container m="md">
            <header>
              <Center>
                <Title className="title" mb="md" mt="md" order={1}>
                  CodeBreaker
                </Title>
              </Center>
            </header>
            <main className="main">
              <Game />
            </main>
          </Container>
        </Center>
      </AppProviders>
    </Profiler>
  );
}
