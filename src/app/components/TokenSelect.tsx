import { Box, Flex, Paper } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import { gameTokens } from '@/constants/tokens';

export function TokenSelect({
  dataPath,
  locked,
  select,
}: {
  dataPath: string;
  locked: boolean;
  select: (event: ClickEvent) => void;
}) {
  return (
    <Profiler component="TokenSelect">
      <Paper bg="dark" px="md" py="sm">
        <Flex justify="space-around">
          {gameTokens.map((token) => {
            const inputId = `${dataPath}-${token.color}`;
            return (
              <Box key={token.id}>
                <input
                  id={inputId}
                  name={dataPath}
                  onClick={select}
                  readOnly
                  style={{ display: 'none' }}
                  value={token.color}
                ></input>
                <label
                  className="token"
                  htmlFor={inputId}
                  style={{
                    cursor: locked ? 'default' : 'pointer',
                  }}
                  tabIndex={0}
                >
                  <GameToken token={token} />
                </label>
              </Box>
            );
          })}
        </Flex>
      </Paper>
    </Profiler>
  );
}
