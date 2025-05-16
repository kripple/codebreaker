import { Center, ColorSwatch, Flex, Group, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';

import { Profiler } from '@/app/components/Profiler';
import { TokenSelect } from '@/app/components/TokenSelect';
import { defaultColor, gameRow, gameRows, gameTokens } from '@/app/constants';
import { useApi } from '@/app/hooks/useApi';
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

  const [formState, setFormState] = useState<string[][]>(gameRows);
  const [feedback, setFeedback] = useState<string[][]>();
  const validGuess = !formState[activeRow].includes(defaultColor);
  const [getFeedback, response] = useApi();

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const code = gameRow
      .map((_, i) => {
        const name = `${activeRow}.${i}`;
        const color = data.get(name);
        const id = gameTokens.find(
          (gameToken) => gameToken.color === color,
        )?.id;
        return id;
      })
      .join('');

    getFeedback(code);
  };

  useEffect(() => {
    if (!response?.data?.data) return;
    setFeedback((current) => {
      const draft = [...(current || [])];
      draft.push(response.data.data);
      return draft;
    });
  }, [response.data]);

  useEffect(() => {
    console.log({ feedback });
  }, [feedback]);

  const select = (event: ClickEvent) => {
    const { name, value } = event.currentTarget;
    const row = getRowValue(name);
    const column = getColumnValue(name);

    setFormState((current) => {
      const draft = [...current];
      draft[row][column] = value;
      return draft;
    });
  };

  const changeActiveToken = (event: ClickEvent) => {
    const name = event.currentTarget.name;
    const column = getColumnValue(name);
    setActiveColumn(column);
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
                            onClick={changeActiveToken}
                            readOnly
                            style={{ display: 'none' }}
                            value={color}
                          ></input>
                          <label htmlFor={tokenId}>
                            <ColorSwatch
                              className={activeToken}
                              color={color}
                              mb="xs"
                              mt="xs"
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
          <button className="button" disabled={!validGuess} type="submit">
            Try
          </button>
        </Group>
      </form>
      <TokenSelect
        dataPath={dataPath(activeRow, activeColumn)}
        select={select}
      />
    </Profiler>
  );
}
