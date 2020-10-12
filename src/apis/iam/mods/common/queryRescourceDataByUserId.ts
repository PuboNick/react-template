/**
     * @desc 獲取用戶數據資源權限
根據用戶id查詢用戶數據資源權限
     */

import * as defs from '../../baseClass';
import { PontCore } from '@/apis/pontCore';

export class Params {
  /** 用戶工號 */
  userId: string;
}

export const init = new defs.iam.MessageInfo();

export function request(params: Params, options?: any) {
  return PontCore.fetch(
    PontCore.getUrl(
      '/iam/Common/queryRescourceDataByUserId/{userId}',
      params,
      'GET',
    ),
    {
      method: 'GET',

      ...options,
    },
  );
}
