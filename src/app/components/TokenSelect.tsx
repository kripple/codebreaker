import { ColorSwatch, Flex, Image, Paper } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import { gameTokens } from '@/app/constants';

export function TokenSelect({
  dataPath,
  select,
}: {
  dataPath: string;
  select: (event: ClickEvent) => void;
}) {
  return (
    <Profiler component="TokenSelect">
      <Paper bg="dark" mt="lg" p="sm">
        <Flex justify="space-around">
          {gameTokens.map((token) => {
            const inputId = `${dataPath}-${token.color}`;
            return (
              <div key={token.id}>
                <input
                  id={inputId}
                  name={dataPath}
                  onClick={select}
                  readOnly
                  style={{ display: 'none' }}
                  value={token.color}
                ></input>
                <label
                  htmlFor={inputId}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                  tabIndex={0}
                >
                  <GameToken token={token} />
                </label>
              </div>
            );
          })}
        </Flex>
      </Paper>
    </Profiler>
  );
}
