/**
     * @desc 建立數據信息及數據擁有著
建立數據信息及數據擁有著
     */

import * as defs from '../../baseClass';
import { PontCore } from '@/apis/pontCore';

export class Params {}

export const init = new defs.iam.MessageInfo();

export function request(
  params: Params,
  body: defs.iam.RescourceDataDTO,
  options?: any,
) {
  return PontCore.fetch(
    PontCore.getUrl('/iam/Common/api/saveRescourceData', params, 'POST'),
    {
      method: 'POST',

      body,
      ...options,
    },
  );
}
