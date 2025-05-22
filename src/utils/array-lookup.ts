/* eslint-disable @typescript-eslint/no-explicit-any */

export function lookup(array: any[], lookupKey: string) {
  const lookup = {} as any;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = item[lookupKey];
    lookup[key] = item;
  }

  return lookup;
}
