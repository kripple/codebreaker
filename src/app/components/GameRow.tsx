import { Center, ColorSwatch, SegmentedControl } from '@mantine/core';
import { useState } from 'react';

export function GameRow({
  active,
  count,
  setTokenColor,
}: {
  active?: boolean;
  count: number;
  setTokenColor: SetValue;
}) {
  const [colors, setColors] = useState(new Array(count).fill('gray'));

  const labels = colors.map((color, i) => {
    return {
      label: (
        <Center>
          <ColorSwatch color={color} />
        </Center>
      ),
      value: i.toString(),
    };
  });

  const handleChange = (value: string) => {
    // setColors((draft) =>
    //   draft.map((item, index) =>
    //     value === index.toString() ? selectedToken : item,
    //   ),
    // );
  };

  const optionalProps = active
    ? {}
    : {
        defaultValue: '',
        readOnly: true,
      };

  return (
    <SegmentedControl
      data={labels}
      onChange={handleChange}
      withItemsBorders={false}
      {...optionalProps}
    />
  );
}
