import {
  ActionIcon,
  Center,
  ColorSwatch,
  Group,
  Overlay,
  Paper,
  SegmentedControl,
  Text,
} from '@mantine/core';

export function GameSoultion({
  hide,
  length,
}: {
  hide?: boolean;
  length: number;
}) {
  const solution = new Array(length).fill('gray');

  return (
    <Paper bg="dark" mb="sm" p="md" pos="relative">
      <Overlay backgroundOpacity={1} className="overlay" color="#000000">
        <Center h="100%">
          <Text className="top-secret">TOP SECRET</Text>
        </Center>
      </Overlay>
      <Center>
        <Group>
          {solution.map((color, i) => (
            <ColorSwatch color={color} key={i} />
          ))}
        </Group>
      </Center>
    </Paper>
  );
}
