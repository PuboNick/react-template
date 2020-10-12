/**
     * @desc 根據菜單ID，數據資源內容(ID/Name/Content)擁有權限廠區組織查詢（權限菜單(不包含子菜單及功能)/數據信息及廠區組織信息）
根據菜單ID/數據資源內容(ID/Name/Content)查詢是否擁有權限（返回權限菜單(不包含子菜單及功能)/數據信息及廠區組織信息）
     */

import * as defs from '../../baseClass';
import { PontCore } from '@/apis/pontCore';

export class Params {}

export const init = new defs.iam.MessageInfo();

export function request(
  params: Params,
  body: defs.iam.authorityQueryDTO,
  options?: any,
) {
  return PontCore.fetch(
    PontCore.getUrl('/iam/Common/queryAuthorityOrganization', params, 'POST'),
    {
      method: 'POST',

      body,
      ...options,
    },
  );
}
