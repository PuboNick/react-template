import { UserAccessModelState } from 'umi';

import bootstrap from '../../system/bootstrap';
import { filter, initAxios, setHeader } from '.';

import { getState } from '../../system/utils/dva';
import './reqFilter';
import './resFilter';

bootstrap.on('init', () => {
  initAxios();
});

bootstrap.on('getToken', (token: any) => {
  setHeader('Authorization', `Bearer ${token}`);
});

/**
 * 自動添加廠區和部門參數
 */
const deptFilter = (config: any) => {
  let { deptNo, factory } = getState<UserAccessModelState>('userAccess');
  config.params = { ...config.params, factory, dept: deptNo };
  return config;
};

bootstrap.on('mount', () => {
  filter.request(deptFilter);
});
