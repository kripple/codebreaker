import { type APIRequestContext, expect, test } from '@playwright/test';

type Actual = ReturnType<typeof expect>;

test.describe('edge-functions', () => {
  async function expectResponse({
    expectProps,
    method,
    request,
    path,
  }: {
    expectProps: { [key: string]: (e: Actual) => void };
    method: 'get' | 'post';
    request: APIRequestContext;
    path: string;
  }) {
    const url = `${process.env.VITE_API_URL}${path}`;
    const response = await request[method](url);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeTruthy();
    Object.entries(expectProps).map(([key, callbackFn]) => {
      expect(body).toHaveProperty(key);
      callbackFn(expect(body[key]));
    });
    return body;
  }

  test('happy path', async ({ request }) => {
    // /game/new
    const { id } = await expectResponse({
      expectProps: {
        id: (e: Actual) => e.toBeTruthy(),
        attempts: (e: Actual) => e.toHaveLength(0),
      },
      method: 'get',
      request,
      path: '/game/new',
    });

    // /game/:id
    await expectResponse({
      expectProps: {
        id: (e: Actual) => e.toEqual(id),
        attempts: (e: Actual) => e.toHaveLength(0),
      },
      method: 'get',
      request,
      path: `/game/${id}`,
    });

    // /game/:id/try/:code
    await expectResponse({
      expectProps: {
        id: (e: Actual) => e.toEqual(id),
      },
      method: 'post',
      request,
      path: `/game/${id}/try/1234`,
    });

    // /game/:id (again)
    await expectResponse({
      expectProps: {
        id: (e: Actual) => e.toEqual(id),
        attempts: (e: Actual) => {
          e.toHaveLength(1);
          e.toContainEqual({
            feedback: expect.any(String),
            value: expect.any(String),
          });
        },
      },
      method: 'get',
      request,
      path: `/game/${id}`,
    });
  });
});
