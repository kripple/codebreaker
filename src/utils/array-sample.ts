import crypto from 'crypto';

function getRandomInteger(max: number) {
  const byteArray = new Uint32Array(1);
  crypto.getRandomValues(byteArray);
  return Math.floor((byteArray[0] / (Math.pow(2, 32) - 1)) * max);
}

export function sample<T>(array: T[]) {
  const id = getRandomInteger(array.length);
  return array[id];
}
