import { Box, ColorSwatch } from '@mantine/core';

import type { FeedbackToken as Token } from '@/constants';

export function FeedbackToken({ token }: { token?: Token }) {
  const size = '12px';

  const correct = (
    <ColorSwatch color="var(--feedback-token-2)" size={size}></ColorSwatch>
  );

  const halfCorrect = (
    <Box pos="relative">
      <ColorSwatch
        color="var(--feedback-token-2)"
        size={size}
        style={{
          clipPath: 'inset(0 50% 0 0)',
        }}
      ></ColorSwatch>
      <ColorSwatch
        color="var(--feedback-token-1)"
        left={0}
        pos="absolute"
        size={size}
        style={{
          clipPath: 'inset(0 0 0 50%)',
        }}
        top={0}
      ></ColorSwatch>
    </Box>
  );

  const empty = (
    <ColorSwatch color="var(--feedback-token-0)" size={size}></ColorSwatch>
  );

  return token?.icon === 'correct'
    ? correct
    : token?.icon === 'halfCorrect'
      ? halfCorrect
      : empty;
}
