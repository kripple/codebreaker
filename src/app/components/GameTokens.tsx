import { Affix, Flex, Paper, Radio, RadioGroup } from '@mantine/core';

// import { DisplayToken } from '@/app/components/DisplayToken';
import { Profiler } from '@/app/components/Profiler';
import { gameTokens } from '@/types/token';

export function GameTokens({
  // form,
  columnId,
  rowId,
  showControls,
}: {
  // form: Form;
  columnId: number;
  rowId: number;
  showControls?: boolean;
}) {
  return (
    <Profiler component="GameTokens">
      <div>test</div>
      {/* <DisplayToken columnId={columnId} form={form} rowId={rowId} /> */}
      {showControls ? <div>test</div> : null}
      <Affix
          hidden={!showControls}
          position={{ bottom: 0, left: 0 }}
          w="100%"
        >
          <RadioGroup
            key={`${rowId}-${columnId}`}
            mb="xl"
            ml="xl"
            mr="xl"
            // {...form.getInputProps(`rows.${rowId}.${columnId}`)}
          >
            <Paper bg="dark" p="sm">
              <Flex gap="xs" justify="space-around">
                {gameTokens.map((token) => {
                  return 'color' in token ? (
                    <Radio
                      aria-label={token.label}
                      key={`${rowId}-${columnId}-${token.id}`}
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
                          backgroundColor: token.color,
                          borderColor: token.color,
                          zIndex: 1,
                        },
                      }}
                      value={token.color}
                    ></Radio>
                  ) : (
                    <Radio
                      key={`${rowId}-${columnId}-${token.id}`}
                      size="lg"
                    ></Radio>
                  );
                })}
              </Flex>
            </Paper>
          </RadioGroup>
        </Affix>
    </Profiler>
  );
}
