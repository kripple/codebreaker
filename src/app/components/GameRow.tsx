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
  // const [colors, setColors] = useState(new Array(count).fill('gray'));


  const handleChange = (value: string) => {
    // setColors((draft) =>
    //   draft.map((item, index) =>
    //     value === index.toString() ? selectedToken : item,
    //   ),
    // );
  };



  return (
    <SegmentedControl
      data={new Array(count).fill('gray').map((color, i) => ({
        label: (
          <Center>
            <ColorSwatch color={color} />
          </Center>
        ),
        value: i.toString(),
      }))}
      onChange={handleChange}
      withItemsBorders={false}
      {...(active
        ? {}
        : {
            defaultValue: '',
            readOnly: true,
          })}
    />
  );
}
