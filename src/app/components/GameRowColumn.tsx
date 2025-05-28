import { Box } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { Label } from '@/app/components/Label';
import { Profiler } from '@/app/components/Profiler';
import { type GameToken as Token, defaultColor } from '@/constants/tokens';

export function GameRowColumn({
  activeRow,
  activeColumn,
  columnId,
  inputId,
  locked,
  token,
  setColumnId,
}: {
  activeRow: boolean;
  activeColumn: boolean;
  columnId: number;
  inputId: string;
  locked?: boolean;
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
        <Label
          className="token"
          disabled={!activeRow}
          htmlFor={inputId}
          locked={locked && !token}
          style={{
            outline:
              activeRow && activeColumn
                ? '1.5px ridge rgba(255, 255, 255, 0.8)'
                : undefined,
          }}
        >
          <GameToken locked={locked} token={token} />
        </Label>
      </Box>
    </Profiler>
  );
}
