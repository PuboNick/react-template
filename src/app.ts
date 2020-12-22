import { getMenuList, getFactoryList } from './pages/user/userService';
import bootstrap from './plugins/bootstrap';

import '@/plugins/bootstrap/register';

export async function getInitialState() {
  bootstrap.handle('init');
  const user = { empNo: 'C3005993', name: '蔣金明' };
  const menuList = await getMenuList(user.empNo);
  const factoryList = await getFactoryList(user.empNo);
  bootstrap.handle('login', user);
  return { menuList, factoryList, user };
}
