import { userWorker } from 'umi';
import bootstrap from './plugins/bootstrap';

import '@/plugins/bootstrap/register';

export async function getInitialState() {
  await bootstrap.handle('init');
  const user = await userWorker.getUser();
  await bootstrap.handle('login', user);
  const access = await userWorker.getAccess(user.empNo);
  bootstrap.handle('mount');
  return { ...access, user };
}
