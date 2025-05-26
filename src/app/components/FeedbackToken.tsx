import { Box, ColorSwatch, Tooltip } from '@mantine/core';

import { SvgIcon } from '@/app/components/SvgIcon';
import {
  type FeedbackToken as Token,
  defaultColor,
  feedbackTokenByValue as lookup,
} from '@/constants/tokens';

import '@/app/components/FeedbackToken.css';

export function FeedbackToken({ token: value }: { token?: Token['value'] }) {
  const key = value ? lookup[value].key : ('empty' as const);
  const size = '12px';
  // const showRightHalf = {
  //   clipPath: 'inset(0 50% 0 0)',
  // };
  // const showLeftHalf = {
  //   clipPath: 'inset(0 0 0 50%)',
  // };

  const correct = (
    <Tooltip
      bd="1px solid var(--mantine-color-dark-4)"
      color="dark"
      label="Correct Color Correct Position"
      multiline
      style={{ color: 'var(--mantine-color-text)', textAlign: 'center' }}
      w={137}
    >
      <ColorSwatch
        color="var(--feedback-token-correct)"
        size={size}
      ></ColorSwatch>
    </Tooltip>
  );

  const halfCorrect = (
    <Tooltip
      bd="1px solid var(--mantine-color-dark-4)"
      color="dark"
      label="Correct Color Incorrect Position"
      multiline
      style={{ color: 'var(--mantine-color-text)', textAlign: 'center' }}
      w={137}
    >
      <ColorSwatch
        bd="1px solid var(--mantine-color-dark-4)"
        color="var(--feedback-token-halfCorrect)"
        size={size}
      ></ColorSwatch>
    </Tooltip>
  );

  const incorrect = (
    <Tooltip
      bd="1px solid var(--mantine-color-dark-4)"
      color="dark"
      label="Incorrect Color"
      multiline
      style={{ color: 'var(--mantine-color-text)', textAlign: 'center' }}
      w={137}
    >
      <ColorSwatch
        className="outline-overlay"
        color="var(--feedback-token-incorrect)"
        size={size}
        withShadow={false}
      >
        <SvgIcon icon="x" />
      </ColorSwatch>
    </Tooltip>
  );

  const empty = <ColorSwatch color={defaultColor} size={size}></ColorSwatch>;

  const options = {
    correct,
    incorrect,
    halfCorrect,
    empty,
  } as const;

  return <Box pos="relative">{options[key]}</Box>;
}
