import { Center, Divider, Flex, Paper } from '@mantine/core';

import { Button } from '@/app/components/Button';
import { FeedbackGrid } from '@/app/components/FeedbackGrid';
import { GameRowColumn } from '@/app/components/GameRowColumn';
import { Profiler } from '@/app/components/Profiler';
import {
  type FeedbackToken,
  defaultColor,
  gameTokens as gameTokensLookup,
} from '@/constants/tokens';

export function GameRow({
  active,
  activeColumnId,
  feedbackTokens,
  gameDataRow,
  locked,
  row,
  rowId,
  setColumnId,
}: {
  active: boolean;
  activeColumnId: number;
  feedbackTokens?: FeedbackToken['value'][];
  gameDataRow?: string[];
  locked?: boolean;
  row: string[];
  rowId: number;
  setColumnId: SetState<number>;
}) {
  const disableButton = locked || !active || row.includes(defaultColor);

  // TODO: DRY repeated function
  const dataPath = (columnId: number) => `${rowId}.${columnId}`;
  const divider = rowId === 0 ? null : <Divider />;
  const selectTokenById = (id: string) =>
    gameTokensLookup.find((token) => token.id.toString() === id);
  const selectTokenByColor = (color: string) =>
    gameTokensLookup.find((token) => token.color === color);

  return (
    <Profiler component="GameRow">
      <Paper bg={active ? 'dark' : undefined}>
        <Flex align="center" justify="space-between">
          <FeedbackGrid locked={locked} tokens={feedbackTokens} />
          <Flex gap="2px">
            {row.map((tokenColor, columnId) => (
              <GameRowColumn
                activeColumn={columnId === activeColumnId}
                activeRow={active}
                columnId={columnId}
                inputId={dataPath(columnId)}
                key={columnId}
                locked={locked}
                setColumnId={setColumnId}
                token={
                  gameDataRow
                    ? selectTokenById(gameDataRow[columnId])
                    : selectTokenByColor(tokenColor)
                }
              />
            ))}
          </Flex>
          <Center p="xs">
            <Button
              disabled={disableButton}
              locked={locked && !gameDataRow}
              type="submit"
            >
              Try
            </Button>
          </Center>
        </Flex>
        {divider}
      </Paper>
    </Profiler>
  );
}
