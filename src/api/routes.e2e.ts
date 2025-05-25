import { expect, test } from '@playwright/test';

const port = 3000 as const;
const url = `http://localhost:${port}` as const;

test.describe('routes', () => {
  test('happy path', async ({ request }) => {
    // /game/new
    const response = await request.get(`${url}/game/new`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    const data = body.data;
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('attempts');
    const { id, attempts } = data;
    expect(id).toBeTruthy();
    expect(attempts).toHaveLength(0);

    // /game/:id
    const responseById = await request.get(`${url}/game/${id}`);
    expect(responseById.status()).toBe(200);
    const bodyById = await response.json();
    expect(bodyById).toHaveProperty('data');
    const dataById = bodyById.data;
    expect(dataById).toHaveProperty('id');
    expect(dataById).toHaveProperty('attempts');
    const { id: alsoId, attempts: alsoAttempts } = dataById;
    expect(id).toEqual(alsoId);
    expect(alsoAttempts).toHaveLength(0);

    // /game/:id/try/:code
    const attemptsResponse = await request.post(`${url}/game/${id}/try/1234`);
    expect(attemptsResponse.status()).toBe(200);
    const attemptsBody = await attemptsResponse.json();
    expect(attemptsBody).toHaveProperty('data');
    const attemptsData = attemptsBody.data;
    expect(attemptsData).toHaveProperty('id');
    expect(attemptsData).not.toHaveProperty('attempts');
    const { id: attemptsResponseId } = attemptsData;
    expect(id).toEqual(attemptsResponseId);

    // /game/:id (again)
    const updatedResponse = await request.get(`${url}/game/${id}`);
    expect(updatedResponse.status()).toBe(200);
    const updatedBody = await updatedResponse.json();
    expect(updatedBody).toHaveProperty('data');
    const updatedData = updatedBody.data;
    expect(updatedData).toHaveProperty('id');
    expect(updatedData).toHaveProperty('attempts');
    const { id: updatedId, attempts: updatedAttempts } = updatedData;
    expect(id).toEqual(updatedId);
    expect(updatedAttempts).toHaveLength(1);
  });
});
