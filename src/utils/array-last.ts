// a non-destructive version of `pop`
export function last<T>(array?: T[]): T | undefined {
  if (!array || array.length === 0) return undefined;
  return array[array.length - 1];
}
