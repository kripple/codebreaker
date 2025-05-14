import { Button, Container, Stack } from '@mantine/core';

import { GameBoard } from '@/components/GameBoard';
import { AppProviders } from '@/providers/AppProviders';

import '@/components/App.css';

export function App() {
  return (
    <AppProviders>
      <Container h="100%" mt="md">
        <Stack
          align="stretch"
          bg="var(--mantine-color-body)"
          gap="xs"
          h={300}
          justify="space-between"
        >
          <header>
            <h1 className="heading">Codebreaker</h1>
          </header>
          <main className="main"></main>

          <Button variant="default">2</Button>
          <Button variant="default">3</Button>
        </Stack>
      </Container>


    </AppProviders>
  );
}
