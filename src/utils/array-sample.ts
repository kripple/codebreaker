import crypto from 'crypto';

function getRandomInt(max: number) {
  const byteArray = new Uint32Array(1);
  crypto.getRandomValues(byteArray);
  return Math.floor((byteArray[0] / (Math.pow(2, 32) - 1)) * max);
}

export function sample(array: any[]) {
  const id = getRandomInt(array.length);
  return array[id];
}
