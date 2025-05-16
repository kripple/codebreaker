import { ColorSwatch } from '@mantine/core';

import { Profiler } from '@/app/components/Profiler';

export function DisplayToken({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <Profiler component="DisplayToken">
      <ColorSwatch className={className} color={color} mb="xs" mt="xs" />
    </Profiler>
  );
}
