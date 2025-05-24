import { expect, test } from '@playwright/test';

import { sample } from './array-sample';

test.describe('array-sample', () => {
  test('returns an element from the array', () => {
    const arr = [10, 20, 30, 40, 50];
    const result = sample(arr);
    expect(arr).toContain(result);
  });

  test('returns undefined for empty array', () => {
    const arr: any[] = [];
    const result = sample(arr);
    expect(result).toBeUndefined();
  });

  test('returns the only element for single-item array', () => {
    const arr = ['only'];
    const result = sample(arr);
    expect(result).toBe('only');
  });

  test('returns all elements eventually (statistical test)', () => {
    const arr = [1, 2, 3];
    const results = new Set();

    for (let i = 0; i < 100; i++) {
      results.add(sample(arr));
    }

    // With enough runs, we should see all elements sampled at least once
    expect(results.size).toBe(arr.length);
  });
});
