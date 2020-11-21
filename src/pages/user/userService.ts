import constants from '@/plugins/constants';
import {
  queryIsExistAuthority,
  queryAuthorityOrganization,
} from '@/apis/iam/mods/common';
import { iam } from '@/apis/iam/baseClass';

/**
 * 獲取系統菜單
 * @param userId 登錄工號
 */
export const getMenuList = async (userId: string): Promise<any[]> => {
  let body = new iam.authorityQueryDTO();
  body.authorityData = constants.SYSTEM_ID;
  body.userId = userId;
  let { data, success }: any = await queryIsExistAuthority.request(
    {},
    body,
    {},
  );
  if (!success || !data) return [];
  let { isAuthority, menuList } = data;
  if (!isAuthority || !menuList || menuList.length < 1) return [];
  let { childMenu } = menuList[0];
  return childMenu;
};

/**
 * 獲取系統廠區
 * @param userId 登錄工號
 */
export const getFactoryList = async (userId: string): Promise<any[]> => {
  let body = new iam.authorityQueryDTO();
  body.authorityData = constants.SYSTEM_ID;
  body.userId = userId;
  let { data, success }: any = await queryAuthorityOrganization.request(
    {},
    body,
    {},
  );
  if (!success || !data) return [];
  let { isAuthority, menuList } = data;
  if (!isAuthority || !menuList || menuList.length < 1) return [];
  let { userRelation } = menuList[0] || [];
  return userRelation;
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
  let menu = (window as any).AppMenuList || [];
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
