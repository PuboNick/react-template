import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { PontCore } from '@/apis/pontCore';
import constans from './constans';
import { downloadFile } from './utils';

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
 * 獲取數據成功
 * @param response 返回內容
 * @returns ErrorInfoStructure 全局HTTP返回
 */
function onSuccess(response: AxiosResponse): any {
  const types = ['blob', 'arraybuffer'];
  const res: any = response.data;
  const { code, msg = '', data, message = '' } = res;
  const success = code === '200' || code === 200;
  let errorMessage = msg || message || '';
  const url = response.config.url;
  if (success) return { success, data, errorCode: '0', errorMessage };
  let config = { success, data, errorCode: code, errorMessage, url };
  if (code && !success) return log<ErrorInfoStructure>(config);
  let isBlobFile = types.includes(response.config.responseType || '');
  let autoDownload = response.config.params['_download'] === 'auto';
  if (isBlobFile && autoDownload) toDownload(res, response.headers);
  return { success: true, data: res, errorCode: '0', errorMessage: '', url };
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
 */
const requestFilter = (config: AxiosRequestConfig) => {
  let { responseType } = config;
  if (responseType && constans.IS_DEV) {
    config.params['_responseType'] = responseType;
  }
  return config;
};
/**
 * 自動下載文件
 * @param data Blob 文件
 * @param headers 返回頭
 * @description 需要在參數中添加 _download=auto
 */
const toDownload = (data: Blob, headers: any) => {
  let url = URL.createObjectURL(data);
  let fileName = headers['content-disposition']?.split('=')[1] || '';
  downloadFile(url, decodeURI(fileName));
  return { success: true };
};
/**
 * 初始化 Axios 配置
 */
export function initAxios() {
  if (constans.IS_DEV) {
    axios.defaults.baseURL = constans.API_BASE || '/';
  } else {
    axios.defaults.baseURL = constans.BASE_URL;
  }
  axios.interceptors.response.use(onSuccess, onError);
  axios.interceptors.request.use(requestFilter);
  PontCore.useFetch((url, options = {}) => axios({ ...options, url }));
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
