/**
 * 返回值攔截器
 * @description 按照 filter.response 註冊順序執行
 */
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
import { AxiosResponse } from 'axios';

import { blob2text, downloadFile } from '../utils/file';
import { filter, ErrorInfoStructure, isAutoDownload, log } from './axios';

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
  if (code && !success) return log<ErrorInfoStructure>(config);
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
async function onSuccess(response: AxiosResponse) {
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
 * 將返回值處理成統一格式
 * @tip 在此之前添加可能造成錯誤，但是之前為原始返回值
 */
filter.response((response: AxiosResponse) => onSuccess(response));
