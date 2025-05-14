import { ActionIcon, Center, Group, Paper } from '@mantine/core';

import { gameTokens } from '@/types/token';

export function GameTokens({ setTokenColor }: { setTokenColor: SetValue }) {
  return (
    <Paper bg="dark" mt="sm" p="md">
      <Center>
        <Group>
          {gameTokens.map((token) => (
            <ActionIcon
              aria-label={token.label}
              color={token.color}
              key={token.color}
              radius="xl"
              variant="filled"
            ></ActionIcon>
          ))}
        </Group>
      </Center>
    </Paper>
  );
}
