import { Box, ColorSwatch } from '@mantine/core';

import {
  type FeedbackToken as Token,
  feedbackTokenByValue as lookup,
} from '@/constants';

import '@/app/components/FeedbackToken.css';

// FIXME: empty and incorrect are not the same state
export function FeedbackToken({ token: value }: { token?: Token['value'] }) {
  const key = value ? lookup[value].key : undefined;
  const size = '12px';
  const showRightHalf = {
    clipPath: 'inset(0 50% 0 0)',
  };
  const showLeftHalf = {
    clipPath: 'inset(0 0 0 50%)',
  };

  const correct = (
    <ColorSwatch
      color="var(--feedback-token-correct)"
      size={size}
    ></ColorSwatch>
  );

  const halfCorrect = (
    <>
      <ColorSwatch
        color="var(--feedback-token-correct)"
        size={size}
        style={showRightHalf}
      ></ColorSwatch>
      <ColorSwatch
        color="var(--feedback-token-halfCorrect)"
        left={0}
        pos="absolute"
        size={size}
        style={showLeftHalf}
        top={0}
      ></ColorSwatch>
    </>
  );

  const incorrect = (
    <ColorSwatch
      color="var(--feedback-token-incorrect)"
      size={size}
    ></ColorSwatch>
  );

  return (
    <Box pos="relative">
      {key === 'correct'
        ? correct
        : key === 'halfCorrect'
          ? halfCorrect
          : incorrect}
    </Box>
  );
}
