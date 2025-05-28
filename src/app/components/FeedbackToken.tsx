import { Box, ColorSwatch } from '@mantine/core';

import { SvgIcon } from '@/app/components/SvgIcon';
import {
  type FeedbackToken as Token,
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
  const key = value ? lookup[value].key : locked ? 'darker' : 'empty';

  return (
    <Box pos="relative">
      <ColorSwatch
        color={`var(--feedback-token-${key})`}
        size="12px"
        withShadow={key !== 'incorrect'}
      >
        {key === 'incorrect' ? (
          <SvgIcon color="var(--feedback-token-incorrect-icon)" icon="x" />
        ) : null}
      </ColorSwatch>
    </Box>
  );
}
