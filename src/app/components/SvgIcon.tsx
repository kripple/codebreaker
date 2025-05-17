import { icons } from '@/app/constants';
import { dev } from '@/utils/env';
import { validateSvg } from '@/utils/svg-validate';

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
      fill="currentColor"
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.dataPath}></path>
    </svg>
  );
}
