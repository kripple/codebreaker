import { expect, test } from '@playwright/test';

import { createNewUser, getUser } from '@/api/db/adapters/users';

test.describe('users', () => {
  // TODO: convert to unit test by injecting mock db instance
  test.skip('user', async () => {
    const user = await createNewUser();
    const currentUser = await getUser(user.uuid);

    expect(user).toBeTruthy();
    expect(currentUser).toBeTruthy();
    expect(user).toEqual(currentUser);
  });
});
