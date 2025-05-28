import { Flex, Stack } from '@mantine/core';

import { FeedbackToken } from '@/app/components/FeedbackToken';
import { type FeedbackToken as Token } from '@/constants/tokens';

export function FeedbackGrid({
  tokens,
  locked,
}: {
  tokens?: Token['value'][];
  locked?: boolean;
}) {
  // TODO: add support for configurable solution lengths
  if (tokens && tokens.length !== 4) {
    console.error('unexpected feedback');
    return null;
  }

  return (
    <Stack gap="xs" p="xs">
      <Flex gap="xs">
        <FeedbackToken locked={locked} token={tokens?.[0]} />
        <FeedbackToken locked={locked} token={tokens?.[1]} />
      </Flex>
      <Flex gap="xs">
        <FeedbackToken locked={locked} token={tokens?.[2]} />
        <FeedbackToken locked={locked} token={tokens?.[3]} />
      </Flex>
    </Stack>
  );
}
