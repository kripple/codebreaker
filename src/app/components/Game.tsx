import {
  Box,
  Center,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  Paper,
  SimpleGrid,
} from '@mantine/core';
import {
  useEventListener,
  useHash,
  useLocalStorage,
  useWindowEvent,
} from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import { TokenSelect } from '@/app/components/TokenSelect';
import {
  defaultColor,
  feedbackTokens,
  gameRow,
  gameRows,
  gameTokens,
} from '@/app/constants';
import { useApi } from '@/app/hooks/useApi';
import { useTrace } from '@/app/hooks/useTrace';

import '@/app/components/Game.css';

export function Game() {
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeColumn, setActiveColumn] = useState<number>(0);
  const attemptNumber = activeRow + 1;
  const [hash, setHash] = useHash();

  const isActiveRow = (rowId: number) => rowId === activeRow;
  const isActiveToken = (rowId: number, columnId: number) =>
    rowId === activeRow && columnId === activeColumn;

  const dataPath = (rowId: number, columnId: number) => `${rowId}.${columnId}`;
  const getRowValue = (value: string) => parseInt(value.split('.')[0]);
  const getColumnValue = (value: string) => parseInt(value.split('.')[1]);

  const [gameState, setGameState] = useState<string[][]>(gameRows);
  const validGuess = !gameState[activeRow].includes(defaultColor);
  const [getFeedback, { currentData }] = useApi();
  const [feedback, setFeedback] = useState<{ [code: string]: string }>({});

  // // The hook will read value from localStorage.getItem('color-scheme')
  // // If localStorage is not available or value at a given key does not exist
  // // 'dark' will be assigned to value variable
  // const [value, setValue] = useLocalStorage({
  //   key: 'color-scheme',
  //   defaultValue: 'dark',
  // });

  // // Value is set both to state and localStorage at 'color-scheme'
  // setValue('light');

  // // You can also use callback like in useState hook to set value
  // setValue((current) => (current === 'dark' ? 'light' : 'dark'));

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const code = gameRow
      .map((_, i) => {
        const name = `${activeRow}.${i}`;
        const color = data.get(name);
        const id = gameTokens.find(
          (gameToken) => gameToken.color === color,
        )?.id;
        return id;
      })
      .join('');

    getFeedback(code);
  };

  useEffect(() => {
    if (!currentData) return;
    if (!currentData.code || !currentData.feedback) {
      console.warn('response is missing required properties', currentData);
      return;
    }
    setFeedback((draft) => ({
      ...draft,
      [currentData.code]: currentData.feedback,
    }));
  }, [currentData]); // only run effect exactly once for new response data

  const select = (event: ClickEvent) => {
    const { name, value } = event.currentTarget;
    const row = getRowValue(name);
    const column = getColumnValue(name);

    setGameState((current) => {
      const draft = [...current];
      draft[row][column] = value;
      return draft;
    });
  };

  const changeActiveToken = (event: ClickEvent) => {
    const name = event.currentTarget.name;
    const column = getColumnValue(name);
    setActiveColumn(column);
  };

  // useTrace(
  //   {
  //     activeRow,
  //     activeColumn,
  //     gameState,
  //     submit,
  //     select,
  //   },
  //   'Game',
  // );

  // on select color, auto-focus the next token
  // use backspace to remove current color
  // use arrow keys to toggle between selectable tokens

  return (
    <Profiler component="Game">
      <Paper withBorder>
        <form onSubmit={submit}>
          <Flex direction="column-reverse">
            {gameRows.map((row, rowId) => {
              const activeRow = isActiveRow(rowId) ? 'active-row' : undefined;
              const rowClassName = activeRow ? 'active-row' : undefined;
              const divider = rowId === 0 ? null : <Divider />;
              return (
                <Box key={rowId}>
                  <Center>
                    <SimpleGrid
                      cols={2}
                      mr="xs"
                      spacing="xs"
                      verticalSpacing="xs"
                    >
                      {row.map((_, columnId) => {
                        const feedbackTokenColor = 'gray';
                        return (
                          <ColorSwatch
                            color={feedbackTokenColor}
                            key={columnId}
                            size="12px"
                          />
                        );
                      })}
                    </SimpleGrid>
                    <Paper bg="dark" className={rowClassName}>
                      <Group pl="xs" pr="xs">
                        {row.map((_, columnId) => {
                          const active = isActiveToken(rowId, columnId);

                          const tokenId = dataPath(rowId, columnId);
                          const color = gameState[rowId][columnId];
                          const token = gameTokens.find(
                            (gameToken) => gameToken.color === color,
                          );

                          return (
                            <div key={columnId}>
                              <input
                                disabled={!activeRow}
                                id={tokenId}
                                name={tokenId}
                                onClick={changeActiveToken}
                                readOnly
                                style={{ display: 'none' }}
                                value={color}
                              ></input>
                              <label htmlFor={tokenId} tabIndex={0}>
                                <GameToken active={active} token={token} />
                              </label>
                            </div>
                          );
                        })}
                      </Group>
                    </Paper>
                    <Center ml="xs">
                      <button
                        className="button"
                        disabled={!activeRow || !validGuess}
                        type="submit"
                      >
                        Try
                      </button>
                    </Center>
                  </Center>
                  {divider}
                </Box>
              );
            })}
          </Flex>
        </form>
      </Paper>
      <TokenSelect
        dataPath={dataPath(activeRow, activeColumn)}
        select={select}
      />
    </Profiler>
  );
}
