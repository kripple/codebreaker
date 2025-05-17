export function objectKeys<T extends object>(object: T): (keyof T)[] {
  const keys = Object.keys(object);
  return keys as (keyof T)[];
}
