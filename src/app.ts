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
  let menuList = await getMenuList('C3005993');
  let factoryList = await getFactoryList('C3005993');
  //@ts-ignore
  window.AppMenuList = menuList;
  return { menuList, factoryList };
}
