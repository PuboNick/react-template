/**
 * @desc 根據菜單ID/數據資源內容(ID/Name/Content)查詢是否擁有權限（返回權限菜單(不包含子菜單及功能)/數據信息及廠區組織信息）
 */

import { PontCore } from '../../../pontCore';
import constants from '@/plugins/constants';

export class Params {}

export function request(
  params: Params,
  body: iam.authorityQueryDTO,
  options?: any,
) {
  return PontCore.fetch(
    PontCore.getUrl(
      constants.IAM_URI + '/Common/queryAuthorityOrganization',
      params,
      'POST',
    ),
    {
      method: 'POST',
      body,
      ...options,
    },
  );
}
