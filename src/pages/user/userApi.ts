import { createApiFactory } from '@/plugins/request';

const userBaseUri = 'http://10.244.231.135:8080/tools/auth';
const aimBaseUri = '/iam/Common/';

export default createApiFactory({
  queryAuthorityOrganization: {
    url: `${aimBaseUri}queryAuthorityOrganization`,
    method: 'POST',
    withoutToken: true,
  },
  queryIsExistAuthority: {
    url: `${aimBaseUri}queryIsExistAuthority`,
    method: 'POST',
    withoutToken: true,
  },
  getUserInfo: {
    url: `${userBaseUri}/getUserInfo`,
    method: 'GET',
  },
});
