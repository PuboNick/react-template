import qs from 'querystring';
import bootstrap from '@/plugins/bootstrap';

import constants from '../constants';
import { jsonParser, random } from '../utils';
import { setHeader } from '../request/axios';

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
const toLogin = () => {
  sessionStorage.setItem(tempIndex, window.location.href);
  window.location.href = `${path}?${qs.stringify(params)}`;
};

/**
 * 存儲 token
 * @param token { access_token }
 */
const setToken = (token: any) => {
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
const getToken = () => {
  const query = qs.parse(window.location.href.split('#')[1]);
  const { access_token, token_type } = query;
  if (access_token) return setToken({ access_token, token_type });
  const session = sessionStorage.getItem(index);
  if (!session) return toLogin();
  const { error, jsonData } = jsonParser(session);
  if (error) return toLogin();
  return jsonData;
};

/**
 * 登陸驗證
 */
bootstrap.on('init', () => {
  setHeader('Authorization', `Bearer ${getToken().access_token}`);
});

/**
 * 退出登陸
 */
bootstrap.on('loginOut', () => {
  sessionStorage.removeItem(index);
  const url = constants.AUTH.loginOutUrl + constants.AUTH.redirectURI;
  window.location.href = url;
});

bootstrap.on('401', () => toLogin());
