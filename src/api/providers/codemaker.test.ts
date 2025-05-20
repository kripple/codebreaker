import { expect, test } from '@playwright/test';

import { evaluateAttempt } from './services/codemaker';

const testCases = [
  { solution: '1111', input: '1111', expected: 'XXXX' },
  { solution: '1111', input: '2222', expected: '----' },

  { solution: '1122', input: '1111', expected: 'XX--' },
  { solution: '1122', input: '3333', expected: '----' },
  { solution: '1122', input: '2211', expected: 'OOOO' },
  { solution: '1122', input: '1122', expected: 'XXXX' },
  { solution: '1122', input: '1212', expected: 'XXOO' },

  // '1112',
  // '1122',
  // '1123',
  // '1234',
];

testCases.map(({ solution, input, expected }) => {
  test(`evaluates attempt '${input}' for solution '${solution}'`, () => {
    const actual = evaluateAttempt(input, solution);
    expect(actual).toEqual(expected);
  });
});
