import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import constants from '../constants';
import { PontCore } from '@/apis/pontCore';

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
 * 打印日誌
 * @param {any} message 內容
 */
export function log<T>(message: T): T {
  console.log(message);
  return message;
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
/**
 * axios 攔截器註冊函數
 */
export const filter: any = {
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
const responseFilter = async (response: AxiosResponse) => {
  let res = await requestFilterLine.run(response, requestFilterLine.resLine);
  return res;
};
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
 * 初始化 Axios 配置
 */
export function initAxios() {
  axios.defaults.baseURL = constants.API_BASE || '/';
  axios.interceptors.response.use(responseFilter, onError);
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
