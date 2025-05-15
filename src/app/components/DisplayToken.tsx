import { Center, Radio } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { useState } from 'react';

type Form = UseFormReturnType<
  {
    rows: string[][];
  },
  (values: { rows: string[][] }) => {
    rows: string[][];
  }
>;

export function DisplayToken({
  form,
  columnId,
  rowId,
}: {
  form: Form;
  columnId: number;
  rowId: number;
}) {
  const [color, setColor] = useState<string>('gray');
  form.watch(`rows.${rowId}.${columnId}`, ({ value }) => setColor(value));

  return (
    <Center>
      <Radio
        readOnly
        size="lg"
        styles={{
          icon: {
            height: '100%',
            left: 0,
            top: 0,
            transform: 'scale(1.1)',
            transition: 'none',
            width: '100%',
            zIndex: 0,
          },
          radio: {
            backgroundColor: color,
            borderColor: color,
            zIndex: -1,
          },
        }}
      ></Radio>
    </Center>
  );
}
