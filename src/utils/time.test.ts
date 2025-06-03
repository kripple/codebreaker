import { expect, test } from '@playwright/test';

import { isSameDate, toDatetime, toTimestamp } from './time';

test.describe('time', () => {
  test.describe('toDatetime', () => {
    test('appends T00:00:00.000Z to date string', () => {
      const input = '2025-06-03';
      const expected = '2025-06-03T00:00:00.000Z';
      expect(toDatetime(input)).toBe(expected);
    });
  });

  test.describe('toTimestamp', () => {
    test('converts ISO date-time string to milliseconds since epoch', () => {
      const input = '2025-06-03T00:00:00.000Z';
      const result = toTimestamp(input);
      const roundTrip = new Date(result).toISOString();
      expect(roundTrip).toBe(input);
    });
  });

  test.describe('isSameDate', () => {
    test('returns true for timestamps on the same day (UTC)', () => {
      const day = '2025-06-03';
      const t1 = toTimestamp(toDatetime(day));
      const t2 = t1 + 60 * 60 * 1000; // +1 hour
      const t3 = t1 + 23 * 60 * 60 * 1000; // +23 hours
      expect(isSameDate([t1, t2, t3])).toBe(true);
    });

    test('returns false for timestamps on different days (UTC)', () => {
      const t1 = toTimestamp(toDatetime('2025-06-03'));
      const t2 = toTimestamp(toDatetime('2025-06-04'));
      expect(isSameDate([t1, t2])).toBe(false);
    });

    test('returns true for single-element array', () => {
      const t = toTimestamp(toDatetime('2025-06-03'));
      expect(isSameDate([t])).toBe(true);
    });

    test('returns true for empty array (vacuously true)', () => {
      expect(isSameDate([])).toBe(true);
    });
  });
});
