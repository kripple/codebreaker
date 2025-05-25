import { ColorSwatch } from '@mantine/core';

import { SvgIcon } from '@/app/components/SvgIcon';
import { type GameToken as Token, defaultColor } from '@/constants/tokens';

import '@/app/components/GameToken.css';

export function GameToken({
  token,
  altIcon,
}: {
  token?: Token;
  altIcon?: boolean;
}) {
  const color = token?.color || defaultColor;
  const icon = altIcon ? 'lock' : token?.icon ? token.icon : null;
  const svg = icon ? <SvgIcon icon={icon} /> : null;

  return (
    <ColorSwatch className="token" color={color} pos="relative">
      {svg}
    </ColorSwatch>
  );
}
