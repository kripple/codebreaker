export async function times(
  length: number,
  callbackFn: (index: number) => void | Promise<void>,
) {
  for (let i = 0; i < length; i++) {
    await callbackFn(i);
  }
}
