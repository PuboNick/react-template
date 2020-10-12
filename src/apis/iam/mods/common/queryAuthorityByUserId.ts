/**
     * @desc 獲取用戶菜單、資源
根據用戶id查詢用戶權限（用戶、菜單、子功能、數據資源）
     */

import * as defs from '../../baseClass';
import { PontCore } from '@/apis/pontCore';

export class Params {
  /** 用戶工號 */
  userId: string;
}

export const init = new defs.iam.ResponseMsg();

export function request(params: Params, options?: any) {
  return PontCore.fetch(
    PontCore.getUrl(
      '/iam/Common/queryAuthorityByUserId/{userId}',
      params,
      'GET',
    ),
    {
      method: 'GET',

      ...options,
    },
  );
}
