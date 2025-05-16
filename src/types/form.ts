import { type UseFormReturnType } from '@mantine/form';

export type Form = UseFormReturnType<
  {
    rows: string[][];
  },
  (values: { rows: string[][] }) => {
    rows: string[][];
  }
>;
