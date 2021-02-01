import { message } from 'antd';
import qs from 'querystring';

import constants from '../constants';
import { jsonParser, random } from '../utils';
import bootstrap from '@/plugins/bootstrap';
import { sleep } from './../utils/index';

const client_id = constants.AUTH.clientId;
const path = constants.AUTH.provider;
const redirect_uri = constants.AUTH.redirectURI;
const index = constants.SYSTEM_ID + '/token';
const tempIndex = index + '/url';

/**
 * 登陸服務配置
 */
const params = {
  response_type: 'token',
  client_id,
  redirect_uri,
  scope: 'openid offline_access profile',
  state: random(),
};

/**
 * 跳轉登陸頁面
 */
const toLogin = async () => {
  sessionStorage.setItem(tempIndex, window.location.href);
  window.location.href = `${path}?${qs.stringify(params)}`;
  await sleep(1000);
};

/**
 * 存儲 token
 * @param token { access_token }
 */
const setToken = async (token: any) => {
  sessionStorage.setItem(index, JSON.stringify(token));
  const url = sessionStorage.getItem(tempIndex);
  if (url) {
    sessionStorage.removeItem(tempIndex);
    window.location.href = url;
  }
  return token;
};

/**
 * 獲取 token
 */
const getToken = async () => {
  const query = qs.parse(window.location.href.split('#')[1]);
  const { access_token, token_type } = query;
  if (access_token) return await setToken({ access_token, token_type });
  const session = sessionStorage.getItem(index);
  if (!session) return await toLogin();
  const { error, jsonData } = jsonParser(session);
  if (error) return await toLogin();
  return jsonData;
};

/**
 * 登陸驗證
 */
bootstrap.on('init', async () => {
  const token = await getToken();
  if (token) {
    bootstrap.handle('getToken', token.access_token);
  }
});

/**
 * 退出登陸
 */
bootstrap.on('loginOut', () => {
  sessionStorage.removeItem(index);
  const url = constants.AUTH.loginOutUrl + constants.AUTH.redirectURI;
  window.location.href = url;
});

bootstrap.on('401', (errorMessage: string) => {
  sessionStorage.removeItem(index);
  const key = `${index}/401`;
  if (sessionStorage.getItem(key)) {
    message.error(errorMessage);
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.setItem(key, '1');
    toLogin();
  }
});
