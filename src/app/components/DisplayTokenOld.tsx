import { Center, Radio } from '@mantine/core';
import { useState } from 'react';

import { Profiler } from '@/app/components/Profiler';

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
    <Profiler id="display-token">
      <Center id="display-token">
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
    </Profiler>
  );
}
