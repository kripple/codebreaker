import { icons } from '@/app/constants';

export function SvgIcon({ icon: key }: { icon: keyof typeof icons }) {
  const { viewBox, dataPath } = icons[key];

  return (
    <svg
      fill="currentColor"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={dataPath}></path>
    </svg>
  );
}
