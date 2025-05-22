import { ColorSwatch } from '@mantine/core';

import { SvgIcon } from '@/app/components/SvgIcon';
import type { GameToken as Token } from '@/constants';
import { defaultColor } from '@/constants';

import '@/app/components/GameToken.css';

export function GameToken({
  active,
  token,
}: {
  active?: boolean;
  token?: Token;
}) {
  const className = active ? 'token active-token' : 'token';
  const color = token?.color || defaultColor;
  const icon = token?.icon ? <SvgIcon icon={token.icon} /> : null;

  return (
    <ColorSwatch className={className} color={color} pos="relative">
      {icon}
    </ColorSwatch>
  );
}
