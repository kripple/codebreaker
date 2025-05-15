import {
  ActionIcon,
  Affix,
  Button,
  Center,
  Checkbox,
  ColorSwatch,
  Flex,
  Group,
  Overlay,
  Paper,
  Radio,
  RadioGroup,
  SegmentedControl,
  Select,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { DisplayToken } from '@/app/components/DisplayToken';
import { config } from '@/app/config';
import { gameTokens } from '@/types/token';

export function Game() {
  const { allowedAttempts, solutionLength } = config;
  const [activeSegment, setActiveSegment] = useState<string>('0');

  const row = new Array(solutionLength).fill(0);
  // const rows = new Array(allowedAttempts).fill(0).map(() => [...row]);
  const rows = new Array(allowedAttempts).fill(0).map(() => row);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      rows,
    },
  });

  // radio group only visible when segment is active
  const rowId = 0;
  const radioGroup = (columnId: number) => {
    const active = columnId.toString() === activeSegment;
    const displayToken = (
      <DisplayToken columnId={columnId} form={form} rowId={rowId} />
    );
    if (!active) return displayToken;

    return (
      <>
        {displayToken}
        <Affix position={{ bottom: 0, left: 0 }} w="100%">
          <RadioGroup
            key={`${rowId}-${columnId}`}
            mb="xl"
            ml="xl"
            mr="xl"
            {...form.getInputProps(`rows.${rowId}.${columnId}`)}
          >
            <Paper bg="dark" p="sm">
              <Flex gap="xs" justify="space-around">
                {gameTokens.map((token) => {
                  return 'color' in token ? (
                    <Radio
                      aria-label={token.label}
                      key={`${rowId}-${columnId}-${token.id}`}
                      size="lg"
                      styles={{
                        icon: {
                          height: '100%',
                          left: 0,
                          top: 0,
                          transform: 'scale(1.1)',
                          transition: 'none',
                          width: '100%',
                          zIndex: 0,
                        },
                        radio: {
                          backgroundColor: token.color,
                          borderColor: token.color,
                          zIndex: 1,
                        },
                      }}
                      value={token.color}
                    ></Radio>
                  ) : (
                    <Radio
                      key={`${rowId}-${columnId}-${token.id}`}
                      size="lg"
                    ></Radio>
                  );
                })}
              </Flex>
            </Paper>
          </RadioGroup>
        </Affix>
      </>
    );
  };
  const radioGroupsData = row.map((_, i) => ({
    label: radioGroup(i),
    value: i.toString(),
  }));
  return (
    <>
      {/* <Paper bg="dark" mb="sm" p="md" pos="relative">
        <Overlay backgroundOpacity={1} className="overlay" color="dark">
          <Center h="100%">
            <Text className="top-secret">TOP SECRET</Text>
          </Center>
        </Overlay>
        <Center>
          <Group>
            {secretCode.map((color, i) => (
              <ColorSwatch color={color} key={i} />
            ))}
          </Group>
        </Center>
      </Paper> */}

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <SegmentedControl
          data={radioGroupsData}
          fullWidth
          onChange={setActiveSegment}
          styles={{ label: { height: '100%' }, innerLabel: { height: '100%' } }}
          withItemsBorders={false}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Try</Button>
        </Group>
      </form>
    </>
  );
}
