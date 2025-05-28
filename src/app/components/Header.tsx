import { Flex, Group } from '@mantine/core';

import { HowToPlayModal } from '@/app/components/HowToPlayModal';
import { Profiler } from '@/app/components/Profiler';

import '@/app/components/Header.css';

export function Header() {
  const title = 'Code:Breaker' as const;

  return (
    <Profiler component="Header">
      <Group
        align="center"
        className="header"
        component="header"
        grow
        h="var(--header-height)"
        justify="space-between"
      >
        <Flex p="md"></Flex>
        <Flex className="title" justify="center" px="md" py={0}>
          {title}
        </Flex>
        <Flex h="inherit" justify="flex-end" p="md">
          <HowToPlayModal />
        </Flex>
      </Group>
    </Profiler>
  );
}
