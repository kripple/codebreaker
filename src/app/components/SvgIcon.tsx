import { fairy } from '@/app/assets/fairy';
import { fire } from '@/app/assets/fire';
import { grass } from '@/app/assets/grass';
import { ice } from '@/app/assets/ice';
import { lightning } from '@/app/assets/lightning';
import { lock } from '@/app/assets/lock';
import { rock } from '@/app/assets/rock';
import { water } from '@/app/assets/water';
import { x } from '@/app/assets/x';
import { dev } from '@/utils/env';
import { validateSvg } from '@/utils/svg-validate';

const icons = {
  fairy,
  fire,
  lightning,
  grass,
  ice,
  water,
  rock,
  lock,
  x,
} as const;

export function SvgIcon({ icon: key }: { icon: keyof typeof icons }) {
  const icon = icons[key];

  (async () => {
    if (dev) {
      const svg = await import(`@/app/assets/${key}.svg?raw`);
      validateSvg(key, svg.default, icon);
    }
  })();

  return (
    <svg
      className={`${key}-icon`}
      fill="currentColor"
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.dataPath}></path>
    </svg>
  );
}
