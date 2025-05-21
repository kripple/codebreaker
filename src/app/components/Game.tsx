import {
  Box,
  Center,
  ColorSwatch,
  Divider,
  Flex,
  Paper,
  Stack,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import * as uuid from 'uuid';

import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import { TokenSelect } from '@/app/components/TokenSelect';
import { useGame } from '@/app/hooks/useGame';
import { useMakeAttempt } from '@/app/hooks/useMakeAttempt';
import {
  config,
  defaultColor,
  gameRow,
  gameRows,
  gameTokens,
} from '@/constants';

import '@/app/components/Game.css';

export function Game() {
  const key = config.localStorageKey;
  const [userId, setUserId] = useState<string | null>(
    (() => {
      const savedValue = window.localStorage.getItem(key);
      return uuid.validate(savedValue) ? savedValue : null;
    })(),
  );
  const { currentData: gameData, currentError: gameError } = useGame(userId);
  const [makeAttempt, { currentData: attemptData, error: attemptError }] =
    useMakeAttempt();

  useEffect(() => {
    if (!gameData?.id) return;
    const id = gameData.id;
    if (uuid.validate(id)) {
      window.localStorage.setItem(key, id);
      setUserId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  useEffect(() => {
    if (!gameError) return;
    console.log({ gameError });
  }, [gameError]);
  useEffect(() => {
    console.log({ gameData });
  }, [gameData]);
  useEffect(() => {
    if (!attemptError) return;
    console.log({ attemptError });
  }, [attemptError]);
  useEffect(() => {
    console.log({ attemptData });
  }, [attemptData]);
  useEffect(() => {
    console.log({ userId });
  }, [userId]);

  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeColumn, setActiveColumn] = useState<number>(0);

  const getIsActiveRow = (rowId: number) => rowId === activeRow;
  const isActiveToken = (rowId: number, columnId: number) =>
    rowId === activeRow && columnId === activeColumn;

  const dataPath = (rowId: number, columnId: number) => `${rowId}.${columnId}`;
  const getRowValue = (value: string) => parseInt(value.split('.')[0]);
  const getColumnValue = (value: string) => parseInt(value.split('.')[1]);

  const [gameState, setGameState] = useState<string[][]>(gameRows);
  const validGuess = !gameState[activeRow].includes(defaultColor);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const currentId = data.get('userId');
    if (!currentId || typeof currentId !== 'string') {
      console.error('user id is missing');
      return;
    }
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

    makeAttempt({ id: currentId, attempt: code });
  };

  // useEffect(() => {
  //   if (!currentData) return;
  //   if (!currentData.code || !currentData.feedback) {
  //     console.warn('response is missing required properties', currentData);
  //     return;
  //   }
  //   setFeedback((draft) => ({
  //     ...draft,
  //     [currentData.code]: currentData.feedback,
  //   }));
  // }, [currentData]); // only run effect exactly once for new response data

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

  const feedbackToken = (columnId: number) => {
    const feedbackTokenColor = 'gray';
    return (
      <ColorSwatch color={feedbackTokenColor} key={columnId} size="12px" />
    );
  };

  const getFeedbackRows = (row: string[]) => {
    if (row.length % 2 !== 0)
      throw Error(
        'Our understanding of the data is severely flawed, do not proceed.',
      );
    const center = row.length / 2;
    return [row.slice(0, center), row.slice(center)];
  };

  return (
    <Profiler component="Game">
      <div className="game-board">
        <Paper withBorder>
          <form onSubmit={submit}>
            <input
              hidden
              name="userId"
              readOnly
              style={{ display: 'none' }}
              value={userId ? userId : undefined}
            ></input>
            <Flex direction="column-reverse">
              {gameRows.map((row, rowId) => {
                const isActiveRow = getIsActiveRow(rowId);
                const rowClassName = isActiveRow ? 'active-row row' : 'row';
                const divider = rowId === 0 ? null : <Divider />;
                const feedbackRows = getFeedbackRows(row);

                return (
                  <Paper
                    bg={isActiveRow ? 'dark' : undefined}
                    className={rowClassName}
                    key={rowId}
                  >
                    <Center>
                      <Stack gap="xs" p="xs">
                        {feedbackRows.map((feedbackRow, i) => (
                          <Flex gap="xs" key={i}>
                            {feedbackRow.map((_, columnId) =>
                              feedbackToken(columnId),
                            )}
                          </Flex>
                        ))}
                      </Stack>

                      <Flex gap="xs" p="xs">
                        {row.map((_, columnId) => {
                          const active = isActiveToken(rowId, columnId);
                          const tokenId = dataPath(rowId, columnId);
                          const color = gameState[rowId][columnId];
                          const token = gameTokens.find(
                            (gameToken) => gameToken.color === color,
                          );

                          return (
                            <Box key={columnId}>
                              <input
                                disabled={!isActiveRow}
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
                            </Box>
                          );
                        })}
                      </Flex>

                      <Center mx="8px">
                        <button
                          className="button"
                          disabled={!isActiveRow || !validGuess}
                          type="submit"
                        >
                          Try
                        </button>
                      </Center>
                    </Center>
                    {divider}
                  </Paper>
                );
              })}
            </Flex>
          </form>
        </Paper>
        <Box className="token-select">
          <TokenSelect
            dataPath={dataPath(activeRow, activeColumn)}
            select={select}
          />
        </Box>
      </div>
    </Profiler>
  );
}
