import { Box, ColorSwatch } from '@mantine/core';

import { SvgIcon } from '@/app/components/SvgIcon';
import {
  type FeedbackToken as Token,
  defaultColor,
  feedbackTokenByValue as lookup,
} from '@/constants/tokens';

import '@/app/components/FeedbackToken.css';

export function FeedbackToken({
  token: value,
  locked,
}: {
  token?: Token['value'];
  locked?: boolean;
}) {
  const key = value ? lookup[value].key : ('empty' as const);
  const size = '12px';

  // const temp = !value && locked ?

  const correct = (
    <ColorSwatch
      color="var(--feedback-token-correct)"
      size={size}
    ></ColorSwatch>
  );

  const halfCorrect = (
    <ColorSwatch
      bd="1px solid var(--mantine-color-dark-4)"
      color="var(--feedback-token-halfCorrect)"
      size={size}
    ></ColorSwatch>
  );

  const incorrect = (
    <ColorSwatch
      className="outline-overlay"
      color="var(--feedback-token-incorrect)"
      size={size}
      withShadow={false}
    >
      <SvgIcon icon="x" />
    </ColorSwatch>
  );

  const empty = (
    <ColorSwatch
      color={locked ? 'var(--token-darker)' : defaultColor}
      size={size}
    ></ColorSwatch>
  );

  const options = {
    correct,
    incorrect,
    halfCorrect,
    empty,
  } as const;

  return <Box pos="relative">{options[key]}</Box>;
}
