// import { type APIRequestContext, expect, test } from '@playwright/test';

// const port = 3000 as const;
// const url = `http://localhost:${port}` as const;

// type Actual = ReturnType<typeof expect>;

// test.describe('routes', () => {
//   async function expectResponse({
//     expectProps,
//     method,
//     request,
//     url,
//   }: {
//     expectProps: { [key: string]: (e: Actual) => void };
//     method: 'get' | 'post';
//     request: APIRequestContext;
//     url: string;
//   }) {
//     const response = await request[method](url);
//     expect(response.status()).toBe(200);
//     const body = await response.json();
//     expect(body).toBeTruthy();
//     Object.entries(expectProps).map(([key, callbackFn]) => {
//       expect(body).toHaveProperty(key);
//       callbackFn(expect(body[key]));
//     });
//     return body;
//   }

//   test('happy path', async ({ request }) => {
//     // /game/new
//     const { id } = await expectResponse({
//       expectProps: {
//         id: (e: Actual) => e.toBeTruthy(),
//         attempts: (e: Actual) => e.toHaveLength(0),
//       },
//       method: 'get',
//       request,
//       url: `${url}/game/new`,
//     });

//     // /game/:id
//     await expectResponse({
//       expectProps: {
//         id: (e: Actual) => e.toEqual(id),
//         attempts: (e: Actual) => e.toHaveLength(0),
//       },
//       method: 'get',
//       request,
//       url: `${url}/game/${id}`,
//     });

//     // /game/:id/try/:code
//     await expectResponse({
//       expectProps: {
//         id: (e: Actual) => e.toEqual(id),
//       },
//       method: 'post',
//       request,
//       url: `${url}/game/${id}/try/1234`,
//     });

//     // /game/:id (again)
//     await expectResponse({
//       expectProps: {
//         id: (e: Actual) => e.toEqual(id),
//         attempts: (e: Actual) => {
//           e.toHaveLength(1);
//           e.toContainEqual({
//             // expect.stringMatching()
//             feedback: expect.any(String),
//             value: expect.any(String),
//           });
//         },
//       },
//       method: 'get',
//       request,
//       url: `${url}/game/${id}`,
//     });
//   });
// });
