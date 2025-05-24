import { expect, test } from '@playwright/test';

const port = 3000 as const;
const url = `http://localhost:${port}` as const;

// start the server with `npm run api` before running this test.
test.describe('index', () => {
  test.skip('evaluates guesses', async ({ request }) => {
    const input = '1234' as const;
    // const expected = 'XXO-';
    const response = await request.get(`${url}/try/${input}`);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('feedback');
    const actual = responseBody.feedback;

    expect(typeof actual).toBe('string');
    expect(actual).toHaveLength(4);
    expect(
      actual
        .split('')
        .every((character: string) => ['X', 'O', '-'].includes(character)),
    ).toBe(true);
  });

  test.skip('returns request context', async ({ request }) => {
    const input = '1234' as const;
    const response = await request.get(`${url}/try/${input}`);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('code');
    const actual = responseBody.code;

    expect(actual).toBe(input);
  });

  // /game/new
  // /game/:id
  // /game/:id/try/:code

  test.skip('happy path', async ({ request }) => {
    const response = await request.get(`${url}/game/new`);

    expect(response.status()).toBe(200);
  });
});
