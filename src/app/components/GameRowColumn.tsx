import { Box } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import type { GameToken as Token } from '@/constants';

export function GameRowColumn({
  activeRow,
  activeColumn,
  columnId,
  inputId,
  token,
  setColumnId,
}: {
  activeRow: boolean;
  activeColumn: boolean;
  columnId: number;
  inputId: string;
  token?: Token;
  setColumnId: SetState<number>;
}) {
  return (
    <Profiler component="GameRowColumn">
      <Box>
        <input
          disabled={!activeRow || !token}
          id={inputId}
          name={inputId}
          onClick={() => setColumnId(columnId)}
          readOnly
          style={{ display: 'none' }}
          value={token?.color}
        ></input>
        <label className="token-label" htmlFor={inputId} tabIndex={0}>
          <GameToken active={activeRow && activeColumn} token={token} />
        </label>
      </Box>
    </Profiler>
  );
}
