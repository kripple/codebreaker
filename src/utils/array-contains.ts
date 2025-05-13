// less restrictive version of native `includes`
export function contains<T>(this: T[] | ReadonlyArray<T>, searchElement: any) {
  const includes = (array: any[] | readonly any[], value: any) =>
    array.includes(value);
  return includes(this, searchElement);
}
