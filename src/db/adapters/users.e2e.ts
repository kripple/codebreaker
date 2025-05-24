import { expect, test } from '@playwright/test';

import { createNewUser, getUser } from '@/db/adapters/users';

// start the database and server before running this test

test.describe('users', () => {
  test('user', async () => {
    const user = await createNewUser();
    const currentUser = await getUser(user.uuid);

    expect(user).toBeTruthy();
    expect(currentUser).toBeTruthy();
    expect(user).toEqual(currentUser);
  });
});
