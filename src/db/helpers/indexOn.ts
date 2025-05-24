import { index, type pgTable, uniqueIndex } from 'drizzle-orm/pg-core';

type CallbackProps = Parameters<Parameters<typeof pgTable>['2']>['0'];

export function indexOn({
  table,
  columnName,
  unique,
}: {
  table: CallbackProps;
  columnName: string;
  unique: boolean;
}) {
  if (!(columnName in table))
    throw Error(
      `Invalid column name '${columnName}'. Valid options include: [${Object.keys(table).join(', ')}]`,
    );
  return (unique ? uniqueIndex : index)(`${columnName}_idx`).on(
    table[columnName],
  );
}
