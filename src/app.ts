import { userWorker } from 'umi';
import bootstrap from './plugins/bootstrap';

import '@/plugins/bootstrap/register';

export async function getInitialState() {
  bootstrap.handle('init');
  const user = await userWorker.getUser();
  const menuList = await userWorker.getMenuList(user.empNo);
  const factoryList = await userWorker.getFactoryList(user.empNo);
  bootstrap.handle('login', user);
  return { menuList, factoryList, user };
}
