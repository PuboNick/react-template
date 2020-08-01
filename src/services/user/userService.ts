import constans from '@/plugins/constans';
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
  body.authorityData = constans.SYSTEM_ID;
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
  body.authorityData = constans.SYSTEM_ID;
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
