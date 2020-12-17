import zhTW from 'antd/es/locale/zh_TW';
import { addLocale } from 'umi';

import { initAxios } from '@/plugins/request/axios';
import '@/assets/style.less';
import '@/plugins/request/reqFilter';
import '@/plugins/request/resFilter';
import { getMenuList, getFactoryList } from './pages/user/userService';

const option: any = {
  momentLocale: 'zh-tw',
  antd: zhTW,
};

initAxios();
addLocale('zh-TW', {}, option);

export async function getInitialState() {
  let user = { empNo: 'C3005993', name: '蔣金明' };
  let menuList = await getMenuList(user.empNo);
  let factoryList = await getFactoryList(user.empNo);
  let gl: any = window;
  gl.AppMenuList = menuList;
  return { menuList, factoryList, user };
}
