import { fairy } from '@/app/assets/fairy';
import { fire } from '@/app/assets/fire';
import { grass } from '@/app/assets/grass';
import { ice } from '@/app/assets/ice';
import { info } from '@/app/assets/info';
import { lightning } from '@/app/assets/lightning';
import { lock } from '@/app/assets/lock';
import { rock } from '@/app/assets/rock';
import { water } from '@/app/assets/water';
import { x } from '@/app/assets/x';
import { dev } from '@/utils/env';

const icons = {
  fairy,
  fire,
  lightning,
  grass,
  ice,
  info,
  water,
  rock,
  lock,
  x,
} as const;

export function SvgIcon({
  icon: key,
  color,
}: {
  icon: keyof typeof icons;
  color?: string;
}) {
  const icon = icons[key];

  (async () => {
    if (dev) {
      const svg = await import(`@/app/assets/${key}.svg?raw`);
      const validateSvg = (await import('@/utils/svg-validate')).validateSvg;
      validateSvg(key, svg.default, icon);
    }
  })();

  return (
    <svg
      className={`${key}-icon`}
      fill="currentColor"
      style={{
        color,
      }}
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.dataPath}></path>
    </svg>
  );
}
