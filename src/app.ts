import zhTW from 'antd/es/locale/zh_TW';
import { addLocale } from 'umi';

import { initAxios } from '@/plugins/axios';
import '@/assets/style.less';
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
  (window as any).AppMenuList = menuList;
  return { menuList, factoryList, user };
}
