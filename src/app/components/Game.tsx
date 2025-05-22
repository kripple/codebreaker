import { Box, Center, Divider, Flex, Paper, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import * as uuid from 'uuid';

import { FeedbackGrid } from '@/app/components/FeedbackGrid';
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
  winningFeedback,
} from '@/constants';
import { type FeedbackToken, isFeedbackToken } from '@/constants';
import { last } from '@/utils/array-last';

import '@/app/components/Game.css';

// TODO: use backspace to remove current color
// TODO: use arrow keys to toggle between selectable tokens

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
  const currentAttempt = last(gameData?.attempts);
  const win = currentAttempt?.feedback === winningFeedback;
  const secretCode = win ? currentAttempt.value : undefined;

  function selectFeedbackTokens(
    rowId: number,
  ): FeedbackToken['value'][] | undefined {
    try {
      return gameData?.attempts[rowId]?.feedback?.split('').map((token) => {
        if (!isFeedbackToken(token)) {
          throw Error(`unexpected feedback token value '${token}'`);
        }
        return token;
      });
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }

  // useEffect(() => {
  //   console.log({
  //     secretCode,
  //     currentAttempt,
  //     win,
  //     'gameData?.attempts': gameData?.attempts,
  //   });
  // }, [secretCode, currentAttempt, win, gameData]);

  const getIsActiveRow = (rowId: number) => rowId === activeRowId;
  const isActiveToken = (rowId: number, columnId: number) =>
    rowId === activeRowId && columnId === activeColumnId;

  const dataPath = (rowId: number, columnId: number) => `${rowId}.${columnId}`;
  const getRowValue = (value: string) => parseInt(value.split('.')[0]);
  const getColumnValue = (value: string) => parseInt(value.split('.')[1]);

  const getToken = (id: string) =>
    gameTokens.find((gameToken) => gameToken.id.toString() === id);
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
        <Paper withBorder>
          <Center>
            <Flex>
              {secretCode
                ?.split('')
                .map((tokenId, key) => (
                  <GameToken key={key} token={getToken(tokenId)} />
                ))}
            </Flex>
          </Center>
        </Paper>
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
                // const feedbackRows = getFeedbackRows(row);

                // const feedbackTokenValues =
                //   gameData?.attempts?.[rowId]?.feedback?.split('');

                // console.log({ 'feedback?.[rowId]': feedback?.[rowId] });

                const attempt = gameData?.attempts?.[rowId]?.value
                  ?.split('')
                  .map((id) => getTokenColor(id));

                return (
                  <Paper
                    bg={isActiveRow ? 'dark' : undefined}
                    className={rowClassName}
                    key={rowId}
                  >
                    <Center>
                      <FeedbackGrid tokens={selectFeedbackTokens(rowId)} />
                      <Flex>
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
                              <label
                                className="token-label"
                                htmlFor={tokenId}
                                tabIndex={0}
                              >
                                <GameToken active={active} token={token} />
                              </label>
                            </Box>
                          );
                        })}
                      </Flex>

                      <Center>
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

        <TokenSelect
          dataPath={dataPath(activeRowId, activeColumnId)}
          select={select}
        />
      </div>
    </Profiler>
  );
}
