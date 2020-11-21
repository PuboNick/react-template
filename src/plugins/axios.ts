import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { UserAccessModelState } from 'umi';

import constants from './constants';
import { PontCore } from '@/apis/pontCore';
import { blob2text, downloadFile } from './file';
import { getState } from './dva';

/**
 * 全局HTTP返回
 * @member success 是否成功
 * @member data 內容
 * @member errorCode 錯誤碼
 * @member errorMessage 錯誤消息用於展示給用戶
 * @member showType 錯誤展示內型
 * 0 silent 不提示错误;
 * 1 message.warn 警告信息提示;
 * 2 message.error 错误信息提示;
 * 4 notification 通知提示;
 * 9 page 页面跳转
 * @member traceId 請求ID
 * @member host 主機IP地址
 */
export interface ErrorInfoStructure {
  success: boolean;
  data?: any;
  errorCode?: string;
  errorMessage?: string;
  showType?: number;
  traceId?: string;
  host?: string;
}
/**
 * 打印日誌
 * @param {any} message 內容
 */
function log<T>(message: T): T {
  console.log(message);
  return message;
}
/**
 * json 轉換
 * @param response
 */
function jsonParser(str: any) {
  let result = { error: '', jsonData: null };
  try {
    result.jsonData = JSON.parse(str);
  } catch (e) {
    result.error = 'JSON解析失敗!';
    result.jsonData = str;
  }
  return result;
}
/**
 * 處理返回值
 * @param response
 */
function handleResponse(res: any, url: string): any {
  const { code, msg = '', data, message = '' } = res;
  const success = code === '200' || code === 200;
  let errorMessage = msg || message || '';
  if (success) return { success, data, errorCode: '0', errorMessage };
  let config = { success, data, errorCode: code, errorMessage, url };
  if (code && !success) return log<ErrorInfoStructure>(config);
  let { error, jsonData }: any = jsonParser(res);
  if (error) {
    return { success: true, data: res, errorCode: '0', errorMessage: '', url };
  }
  return handleResponse(jsonData, url);
}
/**
 * 判斷是否添加了自動下載
 * @param config axios配置
 */
function isAutoDownload(config: any) {
  return config?.download?.auto;
}
/**
 * 獲取數據成功
 * @param response 返回內容
 * @returns ErrorInfoStructure 全局HTTP返回
 */
async function onSuccess(response: AxiosResponse) {
  const url: any = response.config.url;
  const data = response.data;
  const types = ['blob'];
  let isBlobFile = types.includes(response.config.responseType || '');
  if (!isBlobFile) return handleResponse(data, url);
  if (!isAutoDownload(response.config)) return handleResponse(data, url);
  let text: any = await blob2text(response.data);
  let result = handleResponse(text, url);
  console.log(result);
  if (!result.success) return result;
  return toDownload(data, response.headers, response.config);
}
/**
 * 獲取數據失敗處理
 * @param err 錯誤內容
 * @returns ErrorInfoStructure 全局HTTP返回
 */
function onError(err: AxiosError): ErrorInfoStructure {
  const response: AxiosResponse | undefined = err.response;
  const errorCode: string = response?.status.toString() || '';
  const errorMessage: string = response?.statusText || '';
  return log<ErrorInfoStructure>({
    success: false,
    data: response,
    errorCode,
    errorMessage,
  });
}
/**
 * 請求攔截器 開發環境下載文件時自動添加參數
 * @param config axios config
 * @tip withoutToken 屬性為 true 時，會刪除全局添加的 access_token
 */
const requestFilter = (config: AxiosRequestConfig) => {
  if (!config.params) config.params = {};

  // 自動添加廠區和部門參數
  let { success, state } = getState<UserAccessModelState>('userAccess');
  if (success) {
    let { deptNo, factory } = state!;
    config.params = { ...config.params, factory, dept: deptNo };
  }

  // 自動下載文件配置
  if (isAutoDownload(config)) {
    config.responseType = 'blob';
  }

  // 開發環境下自動添加下載類型參數（用於proxy代理工具）
  let { responseType } = config;
  if (responseType && constants.IS_DEV) {
    config.params['_responseType'] = responseType;
  }

  // 自動切換接口地址
  let base: string = config.url?.split('/')[1] || '';
  let apis: any = constants.APIS;
  if (apis[base]) {
    config.url = apis[base] + config.url;
  }

  // 刪除ACCESS_TOKEN
  if (config.headers.common.Authorization && (config as any).withoutToken) {
    delete config.headers.common.Authorization;
  }
  return config;
};
/**
 * 自動下載文件
 * @param data Blob 文件
 * @param headers 返回頭
 * @description 需要在config中添加 download: { auto: true, fileName?: string }
 * 當 fileName 為空時使用服務器提供的文件名
 */
const toDownload = (data: Blob, headers: any, config: any) => {
  let url = URL.createObjectURL(data);
  let fileName = config?.download?.fileName;
  if (!fileName) {
    fileName = headers['content-disposition']?.split('=')[1] || '';
  }
  downloadFile(url, decodeURI(fileName));
  return { success: true };
};
/**
 * 初始化 Axios 配置
 */
export function initAxios() {
  if (constants.IS_DEV) {
    axios.defaults.baseURL = constants.API_BASE || '/';
  }
  axios.interceptors.response.use(onSuccess, onError);
  axios.interceptors.request.use(requestFilter);
  PontCore.useFetch((url, options = {}) =>
    axios({ ...options, url, data: options.body }),
  );
}
/**
 * 設置公共請求頭
 * @param name 請求頭名稱
 * @param content 請求頭內容
 */
export function setHeader(name: string, content: string) {
  axios.defaults.headers.common[name] = content;
}

export default axios;
