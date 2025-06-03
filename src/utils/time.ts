export const toDatetime = (utcDate: string) => `${utcDate}T00:00:00.000Z`;

export const toTimestamp = (utcDateTime: string) =>
  new Date(utcDateTime).getTime();

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const toDate = (timestamp: number) => Math.floor(timestamp / MS_PER_DAY);

export const isSameDate = (timestamps: number[]) =>
  timestamps.every((t, _, [ref]) => toDate(ref) === toDate(t));
