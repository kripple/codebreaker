import { Box, Center, Flex, Paper } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { solutionLength } from '@/constants/config';
import { gameTokens } from '@/constants/tokens';

export function GameSolution({
  date,
  secretCode,
}: {
  date: string | undefined;
  secretCode: string | undefined;
}) {
  const hiddenCode = new Array(solutionLength).fill('*').join('');
  const solution = secretCode || hiddenCode;
  const getToken = (id: string) =>
    gameTokens.find((gameToken) => gameToken.id.toString() === id);

  return (
    <Paper p="xs" withBorder>
      <time dateTime={date} style={{ display: 'none' }}>
        {date}
      </time>
      <Center>
        <Flex gap="2px">
          {solution.split('').map((tokenId, key) => (
            <Box className="token" key={key}>
              <GameToken altIcon={tokenId === '*'} token={getToken(tokenId)} />
            </Box>
          ))}
        </Flex>
      </Center>
    </Paper>
  );
}
