import { Box, Center, Flex, Title } from '@mantine/core';

import { HowToPlayModal } from '@/app/components/HowToPlayModal';
import { Profiler } from '@/app/components/Profiler';

import '@/app/components/Header.css';

export function Header() {
  const title = 'Code:Breaker' as const;
  const headerStyles = {
    root: {
      flexGrow: 1,
      fontFamily: 'var(--title-font)',
      fontSize: 'clamp(16px, 7vw, 28px)',
      lineHeight: '28px',
      fontWeight: 400,
      letterSpacing: '2px',
      textAlign: 'center',
    },
  } as const;

  return (
    <Profiler component="Header">
      <header className="header">
        <Flex gap={8}>
          <Center>
            <Box h="var(--header-height)" w="var(--header-height)"></Box>
          </Center>
          <Title
            className="title"
            mb="sm"
            mt="md"
            order={1}
            styles={headerStyles}
          >
            {title}
          </Title>
          <Center>
            <Box h="var(--header-height)" w="var(--header-height)">
              <HowToPlayModal />
            </Box>
          </Center>
        </Flex>
      </header>
    </Profiler>
  );
}
