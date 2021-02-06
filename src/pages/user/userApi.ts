import { createApiFactory } from '@/plugins/request/axios';

const userBaseUri = 'http://10.244.231.135:8080/tools/auth';
const aimBaseUri = '/iam/Common/';

// 獲取用戶信息
export const getUserApi = createApiFactory({
  url: `${userBaseUri}/getUserInfo`,
  method: 'GET',
});

// 獲取菜單
export const getMenuApi = createApiFactory({
  url: `${aimBaseUri}queryIsExistAuthority`,
  method: 'POST',
});

// 獲取廠區菜單
export const getFactoryApi = createApiFactory({
  url: `${aimBaseUri}queryAuthorityOrganization`,
  method: 'POST',
});
