import bootstrap from './system/bootstrap';

import '@/system/bootstrap/register';
import { getAccess, getUser } from './pages/user/userService';

export async function getInitialState() {
  await bootstrap.handle('init');
  const user = await getUser();
  await bootstrap.handle('login', user);
  const access = await getAccess(user.empNo);
  bootstrap.handle('mount');
  return { ...access, user };
}
