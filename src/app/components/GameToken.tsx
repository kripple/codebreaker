import { ColorSwatch } from '@mantine/core';

import { SvgIcon } from '@/app/components/SvgIcon';
import type { GameToken as GameTokenType } from '@/constants';
import { defaultColor } from '@/constants';

import '@/app/components/GameToken.css';

export function GameToken({
  active,
  token,
}: {
  active?: boolean;
  token?: GameTokenType;
}) {
  const className = active ? 'token active-token' : 'token';
  const color = token?.color || defaultColor;
  const icon = token?.icon ? <SvgIcon icon={token.icon} /> : null;

  return (
    <ColorSwatch
      className={className}
      color={color}
      // mb="xs"
      // mt="xs"
      pos="relative"
    >
      {icon}
    </ColorSwatch>
  );
}
