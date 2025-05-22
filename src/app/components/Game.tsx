import { Box, Center, Divider, Flex, Paper, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import * as uuid from 'uuid';

import { FeedbackToken } from '@/app/components/FeedbackToken';
import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import { TokenSelect } from '@/app/components/TokenSelect';
import { useGame } from '@/app/hooks/useGame';
import { useMakeAttempt } from '@/app/hooks/useMakeAttempt';
import {
  config,
  defaultColor,
  feedbackTokens,
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
  const [makeAttempt, { currentError: attemptError }] = useMakeAttempt();

  useEffect(() => {
    if (!gameData?.id) return;
    const id = gameData.id;
    if (uuid.validate(id)) {
      window.localStorage.setItem(key, id);
      setUserId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  const activeRowId = gameData?.attempts.length || 0;
  const [activeColumnId, setActiveColumnId] = useState<number>(0);
  useEffect(() => setActiveColumnId(0), [gameData]);

  const getIsActiveRow = (rowId: number) => rowId === activeRowId;
  const isActiveToken = (rowId: number, columnId: number) =>
    rowId === activeRowId && columnId === activeColumnId;

  const dataPath = (rowId: number, columnId: number) => `${rowId}.${columnId}`;
  const getRowValue = (value: string) => parseInt(value.split('.')[0]);
  const getColumnValue = (value: string) => parseInt(value.split('.')[1]);

  const getTokenId = (color: string | FormDataEntryValue | null) =>
    gameTokens.find((gameToken) => gameToken.color === color)?.id;

  const getTokenColor = (id: string) => {
    const color = gameTokens.find(
      (gameToken) => gameToken.id.toString() === id,
    )?.color;
    if (!color) throw Error(`invalid token id '${id}'`);
    return color;
  };

  const [gameState, setGameState] = useState<string[][]>(gameRows);

  // FIXME this fails when the game is complete (activeRowId is outside of the array)
  const validGuess = !gameState?.[activeRowId]?.includes(defaultColor);

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
        const name = `${activeRowId}.${i}`;
        const color = data.get(name);
        const id = getTokenId(color);
        return id;
      })
      .join('');

    makeAttempt({ id: currentId, attempt: code });
  };

  const select = (event: ClickEvent) => {
    const { name, value } = event.currentTarget;
    const row = getRowValue(name);
    const column = getColumnValue(name);

    setGameState((current) => {
      const draft = [...current];
      draft[row][column] = value;
      return draft;
    });
    setActiveColumnId((current) => current + 1);
  };

  const changeActiveToken = (event: ClickEvent) => {
    const name = event.currentTarget.name;
    const column = getColumnValue(name);
    setActiveColumnId(column);
  };

  // on select color, auto-focus the next token
  // use backspace to remove current color
  // use arrow keys to toggle between selectable tokens

  const getFeedbackRows = (row: string[]) => {
    if (row.length % 2 !== 0)
      throw Error(
        'Our understanding of the data is severely flawed, do not proceed.',
      );
    const center = row.length / 2;
    return [row.slice(0, center), row.slice(center)];
  };

  // useEffect(() => {
  //   console.log({ gameState });
  // }, [gameState]);

  useEffect(() => {
    if (!gameError) return;
    console.log({ gameError });
  }, [gameError]);
  useEffect(() => {
    if (!attemptError) return;
    console.log({ attemptError });
  }, [attemptError]);

  return (
    <Profiler component="Game">
      <div className="game-board">
        <Paper mb="xs" p="xs" withBorder></Paper>
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

                const attempt = gameData?.attempts?.[rowId]?.value
                  ?.split('')
                  .map((id) => getTokenColor(id));
                const feedbackTokenValues =
                  gameData?.attempts?.[rowId]?.feedback?.split('');

                // console.log({ feedbackTokenValues });

                return (
                  <Paper
                    bg={isActiveRow ? 'dark' : undefined}
                    className={rowClassName}
                    key={rowId}
                  >
                    <Center>
                      <Stack gap="xs" p="xs">
                        {feedbackRows.map((feedbackRow, i) => {
                          return (
                            <Flex gap="xs" key={i}>
                              {feedbackRow.map((_, columnId) => {
                                const feedbackTokenValue =
                                  feedbackTokenValues?.[columnId];
                                const feedbackToken = feedbackTokens.find(
                                  (token) =>
                                    feedbackTokenValue &&
                                    token.value === feedbackTokenValue,
                                );

                                // if (feedbackTokenValue)
                                //   console.log({
                                //     feedbackTokenValue,
                                //     feedbackToken,
                                //   });

                                return (
                                  <FeedbackToken
                                    key={columnId}
                                    token={feedbackToken}
                                  />
                                );
                              })}
                            </Flex>
                          );
                        })}
                      </Stack>

                      <Flex gap="xs" p="xs">
                        {row.map((_, columnId) => {
                          const active = isActiveToken(rowId, columnId);
                          const tokenId = dataPath(rowId, columnId);
                          const color =
                            attempt?.[columnId] || gameState[rowId][columnId];
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
            dataPath={dataPath(activeRowId, activeColumnId)}
            select={select}
          />
        </Box>
      </div>
    </Profiler>
  );
}
