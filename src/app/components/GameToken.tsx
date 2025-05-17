import { ColorSwatch, Image } from '@mantine/core';

import type { GameToken as GameTokenType } from '@/app/constants';
import { defaultColor } from '@/app/constants';

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
  const icon = token?.icon ? (
    <Image src={token.icon} ></Image>
  ) : null;

  return (
    <ColorSwatch
      className={className}
      color={color}
      mb="xs"
      mt="xs"
      pos="relative"
    >
      {icon}
    </ColorSwatch>
  );
}
