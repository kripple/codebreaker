/* eslint-disable @typescript-eslint/no-explicit-any */

export function lookup<
  T extends object & { [key in K]: string },
  K extends keyof T,
>(array: T[], lookupKey: K) {
  type Lookup = {
    [key in T[K]]: T;
  };
  const lookup = {} as Lookup;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = item[lookupKey];
    lookup[key] = item;
  }

  return lookup;
}
