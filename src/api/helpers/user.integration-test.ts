import { expect, test } from '@playwright/test';

import { createNewUser, getUser } from '@/api/helpers/user';

// start the database and server before running this test
test('user', async () => {
  const user = await createNewUser();
  const currentUser = await getUser(user.uuid);

  expect(user).toBeTruthy();
  expect(currentUser).toBeTruthy();
  expect(user).toEqual(currentUser);
});
