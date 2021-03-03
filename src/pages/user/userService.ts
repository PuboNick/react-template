import constants from '@/system/constants';
import userApi from './userApi';
import { createService } from '@/system/factory/service';

// 系统菜单列表
let AppMenuList: any = [];

/**
 * 獲取系統菜單
 * @param userId 登錄工號
 */
const getMenuList = createService(async (userId: string) => {
  const body = { authorityData: constants.SYSTEM_ID, userId };
  let data = await userApi.queryIsExistAuthority({}, body);
  let { isAuthority, menuList } = data;
  if (!isAuthority || !menuList || menuList.length < 1) return [];
  let { childMenu } = menuList[0];
  if (!Array.isArray(childMenu)) throw '獲取菜單失敗，數據不合法！';
  AppMenuList = [...childMenu];
  return childMenu;
})
  .setInitialValues([])
  .make();

/**
 * 獲取系統廠區
 * @param userId 登錄工號
 */
const getFactoryList = createService(async (userId: string) => {
  const body = { authorityData: constants.SYSTEM_ID, userId };
  let data = await userApi.queryAuthorityOrganization({}, body);
  let { isAuthority, menuList } = data;
  if (!isAuthority || !menuList || menuList.length < 1) return [];
  let { userRelation } = menuList[0] || [];
  return userRelation;
}).make();

/**
 * 獲取權限信息
 * @param empNo 工號
 */
export const getAccess = async (empNo: string) => {
  const menuList = await getMenuList(empNo);
  const factoryList = await getFactoryList(empNo);
  const isAuthority = menuList.length > 0 && factoryList.length > 0;
  return { menuList, factoryList, isAuthority };
};

/**
 * 递归查询节点
 * @param menu 菜单
 * @param pathName 资源路径
 */
export const findAccessItemByPathName = (
  menu: any[],
  pathName: string,
): any => {
  for (let item of menu) {
    if (item.relateurl === pathName) return { ...item };
    if (item.childMenu.length > 0) {
      return findAccessItemByPathName(item.childMenu, pathName);
    }
  }
  return { childSubFunction: [] };
};

// 動態規劃
const menuTemp: any = {};

/**
 * 獲取某個權限资源路径下的功能權限
 */
export const getAccessByPathName = (pathName: string) => {
  if (menuTemp[pathName]) return menuTemp[pathName];
  let menu = [...AppMenuList] || [];
  let access: any = {};
  let { childSubFunction = [], childMenu = [] } = findAccessItemByPathName(
    menu,
    pathName,
  );
  childSubFunction.forEach((item: any) => {
    access[item.childCode] = true;
  });
  let results = { access, childMenu };
  menuTemp[pathName] = results;
  return results;
};

/**
 * 獲取用戶信息
 */
export const getUser = createService(async () => {
  const data = await userApi.getUserInfo();
  const { sub, preferred_username } = data;
  return { name: preferred_username, empNo: sub };
}).make();
