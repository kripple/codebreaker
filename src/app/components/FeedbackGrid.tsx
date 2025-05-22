import { Flex, Stack } from '@mantine/core';

import { FeedbackToken } from '@/app/components/FeedbackToken';
import { type FeedbackToken as Token } from '@/constants';

export function FeedbackGrid({ tokens }: { tokens?: Token['value'][] }) {
  // TODO: add support for configurable solution lengths
  if (tokens && tokens.length !== 4) {
    console.error('unexpected feedback');
    return null;
  }

  return (
    <Stack gap="xs" p="xs">
      <Flex gap="xs">
        <FeedbackToken token={tokens?.[0]} />
        <FeedbackToken token={tokens?.[1]} />
      </Flex>
      <Flex gap="xs">
        <FeedbackToken token={tokens?.[2]} />
        <FeedbackToken token={tokens?.[3]} />
      </Flex>
    </Stack>
  );
}
