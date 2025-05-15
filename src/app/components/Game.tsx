import {
  ActionIcon,
  Center,
  ColorSwatch,
  Group,
  Overlay,
  Paper,
  SegmentedControl,
  Text,
  Timeline,
} from '@mantine/core';
import { useState } from 'react';

import { gameTokens } from '@/types/token';

type GameState = {
  activeAttempt: number;
  secretCode: string[];
  rows: { colors: string[]; feedback: string[] }[];
  tokenPosition: number;
  win: 'yes' | 'no' | 'tbd';
};

export function Game() {
  const config = {
    allowedAttempts: 3,
    solutionLength: 4,
  } as const;
  const { allowedAttempts, solutionLength } = config;

  const [gameState, setGameState] = useState<GameState>({
    activeAttempt: 0,
    rows: new Array(allowedAttempts).fill(0).map(() => ({
      colors: new Array(solutionLength).fill(0).map(() => 'gray'),
      feedback: [],
    })),
    tokenPosition: 0,
    secretCode: ['red', 'orange', 'yellow', 'green'],
    win: 'tbd',
  });
  const { activeAttempt, rows, secretCode, win } = gameState;

  const selectTokenColor = (value: string) => {
    console.log('[selectTokenColor]', { value });
    setGameState((draft) => {
      const draftRows = [...draft.rows];
      draftRows[draft.activeAttempt].colors[draft.tokenPosition] = value;

      return {
        ...draft,
        rows: draftRows,
      };
    });
  };

  const setTokenPosition = (value: string) => {
    console.log('[setTokenPosition]', { value });
    setGameState((draft) => {
      return {
        ...draft,
        tokenPosition: parseInt(value),
      };
    });
  };

  const rowItems = rows.map((row, i) => {
    const currentStep = allowedAttempts - i;
    const isActive = activeAttempt === currentStep - 1;

    return (
      <Timeline.Item
        bullet={<Text className="bullet-text">{currentStep}</Text>}
        key={i}
      >
        <SegmentedControl
          data={row.colors.map((color, i) => ({
            label: (
              <Center>
                <ColorSwatch color={color} />
              </Center>
            ),
            value: i.toString(),
          }))}
          onChange={(value: string) => {
            isActive && setTokenPosition(value);
          }}
          styles={{
            label: { padding: '8px' },
          }}
          withItemsBorders={false}
          {...(isActive
            ? {}
            : {
                defaultValue: '',
                readOnly: true,
              })}
        />
      </Timeline.Item>
    );
  });

  return (
    <>
      <Paper bg="dark" mb="sm" p="md" pos="relative">
        <Overlay backgroundOpacity={1} className="overlay" color="dark">
          <Center h="100%">
            <Text className="top-secret">TOP SECRET</Text>
          </Center>
        </Overlay>
        <Center>
          <Group>
            {secretCode.map((color, i) => (
              <ColorSwatch color={color} key={i} />
            ))}
          </Group>
        </Center>
      </Paper>

      <Timeline active={activeAttempt} reverseActive>
        {rowItems}
      </Timeline>

      <SegmentedControl
        data={gameTokens.map((token) => ({
          label: (
            <Center>
              <ColorSwatch color={token.color} />
            </Center>
          ),
          value: token.color,
        }))}
        defaultValue=""
        fullWidth
        mt="sm"
        onChange={selectTokenColor}
        styles={{
          label: { padding: '8px' },
          indicator: { backgroundColor: 'transparent' },
        }}
        transitionDuration={0}
        withItemsBorders={false}
      />
    </>
  );
}
