/**
 * 請求攔截器 開發環境下載文件時自動添加參數
 * @param config axios config
 * @tip withoutToken 屬性為 true 時，會刪除全局添加的 access_token
 * @description 按照 filter.request 註冊順序執行
 */
import { UserAccessModelState } from 'umi';
import constants from '../constants';

import { getState } from '../dva';
import { filter, isAutoDownload } from './axios';

/**
 * @description params 防空處理
 */
filter.request((config: any) => {
  if (!config.params) config.params = {};
  return config;
});

/**
 * 自動添加廠區和部門參數
 */
filter.request((config: any) => {
  let { success, state } = getState<UserAccessModelState>('userAccess');
  if (success) {
    let { deptNo, factory } = state!;
    config.params = { ...config.params, factory, dept: deptNo };
  }
  return config;
});

/**
 * 自動下載文件配置
 */
filter.request((config: any) => {
  if (isAutoDownload(config)) {
    config.responseType = 'blob';
  }
  return config;
});

/**
 * 開發環境下自動添加下載類型參數（用於proxy代理工具）
 */
filter.request((config: any) => {
  let { responseType } = config;
  if (responseType && constants.IS_DEV) {
    config.params['_responseType'] = responseType;
  }
  return config;
});

/**
 * 自動切換接口地址
 */
filter.request((config: any) => {
  let base: string = config.url?.split('/')[1] || '';
  let apis: any = constants.APIS;
  if (apis[base]) {
    config.url = apis[base] + config.url;
  }
  return config;
});

/**
 * 刪除ACCESS_TOKEN
 */
filter.request((config: any) => {
  if (config.headers.common.Authorization && (config as any).withoutToken) {
    delete config.headers.common.Authorization;
  }
  return config;
});
