import { expect, test } from '@playwright/test';

import { createNewUser, getUser } from '@/api/db/adapters/users';
import { getDb } from '@/api/helpers/getDb';

const allowedOrigins = process.env.VITE_APP_URL as string;
const connectionString = process.env.DATABASE_URL as string;
const db = getDb({ allowedOrigins, connectionString });

test.describe('users', () => {
  test('user', async () => {
    const user = await createNewUser({ db });
    const currentUser = await getUser({ db, uuid: user.uuid });

    expect(user).toBeTruthy();
    expect(currentUser).toBeTruthy();
    expect(user).toEqual(currentUser);
  });
});
