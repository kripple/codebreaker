import { Flex, Group } from '@mantine/core';

import { Modal } from '@/app/components/Modal';
import { Profiler } from '@/app/components/Profiler';
import { appTitle } from '@/constants/config';

import '@/app/components/Header.css';

export function Header() {
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
          {appTitle}
        </Flex>
        <Flex h="inherit" justify="flex-end" p="md">
          <Modal />
        </Flex>
      </Group>
    </Profiler>
  );
}
