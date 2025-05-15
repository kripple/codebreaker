import { ColorSwatch } from '@mantine/core';
import { useState } from 'react';

import { gameTokens } from '@/types/token';

export function GameToken() {
  const [token, setToken] = useState(gameTokens[0]);

  return <ColorSwatch color={token.color} />;
}
