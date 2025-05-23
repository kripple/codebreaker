import { Box } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { Profiler } from '@/app/components/Profiler';
import { type GameToken as Token, defaultColor } from '@/constants';

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
          disabled={!activeRow}
          id={inputId}
          name={inputId}
          onClick={() => setColumnId(columnId)}
          readOnly
          style={{ display: 'none' }}
          value={token?.color || defaultColor}
        ></input>
        <label
          className="token"
          htmlFor={inputId}
          style={{
            cursor: activeRow ? 'pointer' : 'default',
            outline:
              activeRow && activeColumn
                ? '1.5px ridge rgba(255, 255, 255, 0.8)'
                : undefined,
          }}
          tabIndex={0}
        >
          <GameToken token={token} />
        </label>
      </Box>
    </Profiler>
  );
}
