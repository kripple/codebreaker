import { Paper, Text } from '@mantine/core';

export function GameBoard() {
  return (
    <Paper p="xl" radius="md" shadow="md" withBorder>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that
        require background with shadow
      </Text>
    </Paper>
  );
}
