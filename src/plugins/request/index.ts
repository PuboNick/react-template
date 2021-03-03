import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import constants from '../../system/constants';
import { jsonParser } from '../../system/utils';
import { blob2text, downloadFile } from '../../system/utils/file';

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
 * 判斷是否添加了自動下載
 * @param config axios配置
 */
export function isAutoDownload(config: any) {
  return config?.download?.auto;
}
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
 * 處理返回值
 * @param response
 */
function handleResponse(res: any, url: string): any {
  const { code, msg = '', data, message = '' } = res;
  const success = code === '200' || code === 200;
  let errorMessage = msg || message || '';
  if (success) return { success, data, errorCode: '0', errorMessage };
  let config = { success, data, errorCode: code, errorMessage, url };
  if (code && !success) return config;
  let { error, jsonData }: any = jsonParser(res);
  if (error) {
    return { success: true, data: res, errorCode: '0', errorMessage: '', url };
  }
  return handleResponse(jsonData, url);
}
/**
 * 獲取數據成功
 * @param response 返回內容
 * @returns ErrorInfoStructure 全局HTTP返回
 */
async function parseResponse(response: AxiosResponse) {
  const url: any = response.config.url;
  const data = response.data;
  const types = ['blob'];
  let isBlobFile = types.includes(response.config.responseType || '');
  if (!isBlobFile) return handleResponse(data, url);
  if (!isAutoDownload(response.config)) return handleResponse(data, url);
  let text: any = await blob2text(response.data);
  let result = handleResponse(text, url);
  if (!result.success) return result;
  return toDownload(data, response.headers, response.config);
}
/**
 * 攔截器擴展方法
 * @member reqLine 請求攔截器處理隊列
 * @member resLine 返回值攔截器處理隊列
 * @member request 請求攔截器註冊,將會暴露給外部使用
 * @member response 返回攔截器註冊,將會暴露給外部使用
 * @member run 允許函數
 * @param config 請求配置
 */
const requestFilterLine: any = {
  reqLine: [],
  resLine: [],
  request: (callback: any) => requestFilterLine.reqLine.push(callback),
  response: (callback: any) => requestFilterLine.resLine.push(callback),
  run: async (data: any, line: any) => {
    let temp = { ...data };
    for await (const func of line) {
      temp = await func(temp);
    }
    return temp;
  },
};
interface AxiosFilter {
  request: (callback: (config: any) => any) => any;
  response: (callback: (response: any) => any) => any;
}
/**
 * axios 攔截器註冊函數
 */
export const filter: AxiosFilter = {
  request: requestFilterLine.request,
  response: requestFilterLine.response,
};
/**
 * 請求攔截器 開發環境下載文件時自動添加參數
 * @param config axios config
 * @tip withoutToken 屬性為 true 時，會刪除全局添加的 access_token
 * @tip 需要添加攔截器請在 filter 裡面添加
 */
const requestFilter = async (config: AxiosRequestConfig) => {
  let res = await requestFilterLine.run(config, requestFilterLine.reqLine);
  return res;
};
/**
 * 返回值攔截器
 * @tip 需要擴展攔截器功能請在resFilter 註冊
 */
const responseFilter = async (response: any) => {
  let res = await requestFilterLine.run(response, requestFilterLine.resLine);
  return res;
};
/**
 * 獲取數據失敗處理
 * @param err 錯誤內容
 * @returns ErrorInfoStructure 全局HTTP返回
 */
async function onError(err: AxiosError) {
  const response: AxiosResponse | undefined = err.response;
  let res: ErrorInfoStructure = {
    success: false,
    data: err,
    errorCode: '0000',
    errorMessage: '請求發送失敗',
  };
  if (response) {
    const errorCode: string = response?.status.toString() || '';
    const errorMessage: string = response?.statusText || '';
    res = {
      success: false,
      data: response,
      errorCode,
      errorMessage,
    };
  }
  const results = await responseFilter(res);
  return results;
}
/**
 * 將返回值處理成統一格式
 */
const onSuccess = async (response: AxiosResponse) => {
  const res = await parseResponse(response);
  const results = await responseFilter(res);
  return results;
};
/**
 * 初始化 Axios 配置
 */
export function initAxios() {
  axios.defaults.baseURL = constants.API_BASE || '/';
  axios.interceptors.response.use(onSuccess, onError);
  axios.interceptors.request.use(requestFilter);
}
/**
 * 設置公共請求頭
 * @param name 請求頭名稱
 * @param content 請求頭內容
 */
export function setHeader(name: string, content: string) {
  axios.defaults.headers.common[name] = content;
}
