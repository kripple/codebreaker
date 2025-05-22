// a less restrictive version of `includes`
export function contains<T>(this: List<T>, searchElement: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function includes(array: List<T>, value: any) {
    return array.includes(value);
  }

  return includes(this, searchElement);
}
