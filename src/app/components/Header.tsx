import { Flex, Group } from '@mantine/core';

import { Label } from '@/app/components/Label';
import { Profiler } from '@/app/components/Profiler';
import { SvgIcon } from '@/app/components/SvgIcon';
import { modalInputId } from '@/constants/ids';

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
          <Label
            htmlFor={modalInputId}
            style={{
              aspectRatio: 1,
              background: 'none',
              border: 0,
              height: '100%',
              padding: '3px',
            }}
          >
            <SvgIcon icon="info" />
          </Label>
        </Flex>
      </Group>
    </Profiler>
  );
}
