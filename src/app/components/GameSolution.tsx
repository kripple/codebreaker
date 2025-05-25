import { Box, Center, Flex, Paper } from '@mantine/core';

import { GameToken } from '@/app/components/GameToken';
import { config, gameTokensById } from '@/constants';

export function GameSolution({
  secretCode,
}: {
  secretCode: string | undefined;
}) {
  const hiddenCode = new Array(config.solutionLength).fill('*').join('');
  const solution = secretCode || hiddenCode;

  return (
    <Paper p="xs" withBorder>
      <Center>
        <Flex gap="2px">
          {solution.split('').map((tokenId, key) => (
            <Box className="token" key={key}>
              <GameToken
                altIcon={tokenId === '*'}
                token={gameTokensById[tokenId]}
              />
            </Box>
          ))}
        </Flex>
      </Center>
    </Paper>
  );
}
