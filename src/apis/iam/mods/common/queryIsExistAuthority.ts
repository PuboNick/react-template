/**
     * @desc 根據菜單ID，數據資源內容(ID/Name/Content)查詢是否擁有權限（返回子菜單及功能列表、數據資源信息）
根據菜單ID，數據資源內容(ID/Name/Content)查詢擁有權限（返回子菜單及功能列表、數據資源信息）
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
    PontCore.getUrl('/iam/Common/queryIsExistAuthority', params, 'POST'),
    {
      method: 'POST',

      body,
      ...options,
    },
  );
}
