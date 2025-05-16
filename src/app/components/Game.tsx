import { Center, ColorSwatch, Flex, Group, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from 'react';

import { TokenSelect } from './TokenSelect';

import { DisplayToken } from '@/app/components/DisplayToken';
import { Profiler } from '@/app/components/Profiler';
import { gameRows } from '@/app/constants';
import { useTrace } from '@/app/hooks/useTrace';

export function Game() {
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeColumn, setActiveColumn] = useState<number>(0);

  const isActiveRow = (rowId: number) => rowId === activeRow;
  const isActiveToken = (rowId: number, columnId: number) =>
    rowId === activeRow && columnId === activeColumn;
  // const attemptNumber = activeRow + 1;

  const dataPath = (rowId: number, columnId: number) => `${rowId}.${columnId}`;
  const getRowValue = (value: string) => parseInt(value.split('.')[0]);
  const getColumnValue = (value: string) => parseInt(value.split('.')[1]);

  // the idea is to subscribe to changes in a way that is more granular
  const [formState, setFormState] = useState<string[][]>(gameRows);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    console.log('submit', event);
  };

  // const inputProps = form.getInputProps('rows.0.0');
  // data-path, defaultValue, maybe onChange?

  // console.log(inputProps);

  const select = (event: ChangeEvent) => {
    const { name, value } = event.currentTarget;
    const row = getRowValue(name);
    const column = getColumnValue(name);

    setFormState((current) => {
      const draft = [...current];
      draft[row][column] = value;
      return draft;
    });
  };

  useTrace(
    {
      activeRow,
      activeColumn,
      formState,
      submit,
      select,
    },
    'Game',
  );

  return (
    <Profiler component="Game">
      <form onSubmit={submit}>
        <Flex direction="column-reverse">
          <TokenSelect
            dataPath={dataPath(activeRow, activeColumn)}
            select={select}
          />
          {gameRows.map((row, rowId) => {
            const activeRow = isActiveRow(rowId) ? 'active-row' : undefined;
            const rowClassName = activeRow ? 'active-row' : undefined;
            return (
              <Center key={rowId}>
                <Paper bg="dark" className={rowClassName}>
                  <Group pl="xs" pr="xs">
                    {row.map((_, columnId) => {
                      const activeToken = isActiveToken(rowId, columnId)
                        ? 'token active-token'
                        : 'token';
                      const tokenId = dataPath(rowId, columnId);
                      const color = formState[rowId][columnId];
                      return (
                        <div key={columnId}>
                          <input
                            disabled={!activeRow}
                            id={tokenId}
                            name={tokenId}
                            onClick={(event) => {
                              const name = event.currentTarget.name;
                              const column = getColumnValue(name);
                              setActiveColumn(column);
                            }}
                            readOnly
                            style={{ display: 'none' }}
                            value="gray"
                          ></input>
                          <label htmlFor={tokenId}>
                            <DisplayToken
                              className={activeToken}
                              color={color}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </Group>
                </Paper>
              </Center>
            );
          })}
        </Flex>
        <Group justify="flex-end" mt="md">
          <button type="submit">Try</button>
        </Group>
      </form>
    </Profiler>
  );
}
