import { Flex, Paper } from '@mantine/core';

import { Profiler } from '@/app/components/Profiler';
import { gameTokens } from '@/app/constants';

export function TokenSelect({
  dataPath,
  select,
}: {
  dataPath: string;
  select: (event: ChangeEvent) => void;
}) {
  return (
    <Profiler component="TokenSelect">
      <Paper bg="dark" mt="lg" p="sm">
        <Flex justify="space-around">
          {gameTokens
            .filter((token) => 'color' in token)
            .map((token) => {
              const inputId = `${dataPath}-${token.color}`;
              return (
                <div key={token.id}>
                  <input
                    className="radio-button"
                    id={inputId}
                    name={dataPath}
                    onChange={select}
                    style={{ display: 'none' }}
                    type="radio"
                    value={token.color}
                  ></input>
                  <label
                    aria-label={token.label}
                    className="radio-button-label"
                    htmlFor={inputId}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                    }}
                  >
                    <span
                      className="radio-button-icon"
                      style={{
                        backgroundColor: token.color,
                        borderRadius: 'var(--token-size)',
                        display: 'flex',
                        height: 'var(--token-size)',
                        margin: 'var(--mantine-spacing-xs)',
                        width: 'var(--token-size)',
                      }}
                    ></span>
                  </label>
                </div>
              );
            })}
        </Flex>
      </Paper>
    </Profiler>
  );
}
