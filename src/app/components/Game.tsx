import { Flex, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';

import { GameRow } from '@/app/components/GameRow';
import { GameSolution } from '@/app/components/GameSolution';
import { HiddenInput } from '@/app/components/HiddenInput';
import { Profiler } from '@/app/components/Profiler';
import { TokenSelect } from '@/app/components/TokenSelect';
import { useConfetti } from '@/app/hooks/useConfetti';
import { useGame } from '@/app/hooks/useGame';
import { useMakeAttempt } from '@/app/hooks/useMakeAttempt';
import { config } from '@/constants/config';
import {
  type FeedbackToken,
  gameRow,
  gameRows,
  gameTokens,
  isFeedbackToken,
  winningFeedback,
} from '@/constants/tokens';
import { last } from '@/utils/array-last';

import '@/app/components/Game.css';

// TODO: use backspace to remove current color
// TODO: use arrow keys to toggle between selectable tokens
// FIXME: game state should be derived from gameData
// TODO: use number keys to "click" on TokenSelect
// TODO: right-size the board based on the size of the screen

// TODO: investigate batching DOM updates to minimize the number of repaints (group multiple DOM updates together and perform them in a single requestAnimationFrame callback)

export function Game() {
  const { currentData: gameData, error: gameError, userId } = useGame();
  const [makeAttempt, { error: attemptError }] = useMakeAttempt();

  const activeRowId = gameData?.attempts.length || 0;
  const [activeColumnId, setColumnId] = useState<number>(0);
  useEffect(() => setColumnId(0), [gameData]);

  const currentAttempt = last(gameData?.attempts);
  const win = currentAttempt?.feedback === winningFeedback;
  useConfetti(win);
  const locked = win || gameData?.attempts.length === config.maxAttempts;
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
  function selectGameTokens(rowId: number): string[] | undefined {
    return gameData?.attempts[rowId]?.value?.split('');
  }

  const dataPath = (rowId: number, columnId: number) => `${rowId}.${columnId}`;
  const getRowValue = (value: string) => parseInt(value.split('.')[0]);
  const getColumnValue = (value: string) => parseInt(value.split('.')[1]);
  const getTokenId = (color: string | FormDataEntryValue | null) =>
    gameTokens.find((gameToken) => gameToken.color === color)?.id;

  const [gameState, setGameState] = useState<string[][]>(gameRows());

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const currentId = data.get('userId');
    if (!currentId || typeof currentId !== 'string') {
      console.error('user id is missing');
      return;
    }
    const turnOrder = activeRowId + 1;
    const code = gameRow
      .map((_, i) => {
        const name = `${activeRowId}.${i}`;
        const color = data.get(name);
        const id = getTokenId(color);
        return id;
      })
      .join('');

    makeAttempt({ id: currentId, attempt: code, order: turnOrder });
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
    const maxColumnId = config.solutionLength - 1;
    setColumnId((current) => {
      const draft = current + 1;
      if (draft > maxColumnId) return 0;
      return draft;
    });
  };

  // TODO: error handling
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
      <GameSolution secretCode={secretCode} />
      <Paper my="sm" withBorder>
        <form onSubmit={submit}>
          <HiddenInput name="userId" value={userId} />
          <Flex direction="column-reverse">
            {gameState.map((row, rowId) => (
              <GameRow
                active={!locked && rowId === activeRowId}
                activeColumnId={activeColumnId}
                feedbackTokens={selectFeedbackTokens(rowId)}
                gameDataRow={selectGameTokens(rowId)}
                key={rowId}
                locked={locked}
                row={row}
                rowId={rowId}
                setColumnId={setColumnId}
              />
            ))}
          </Flex>
        </form>
      </Paper>
      <TokenSelect
        dataPath={dataPath(activeRowId, activeColumnId)}
        locked={locked}
        select={select}
      />
    </Profiler>
  );
}
