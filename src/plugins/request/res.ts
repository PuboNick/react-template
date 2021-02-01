import { jsonParser } from '../utils';
import { blob2text, downloadFile } from '../utils/file';

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
const toDownload = (data: Blob, config: any) => {
  let url = URL.createObjectURL(data);
  let fileName = config?.download?.fileName;
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
  if (typeof code !== 'undefined' && !success) return config;
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
export async function parseResponse(data: any, url: string, options: any) {
  const types = ['blob'];
  let isBlobFile = types.includes(options.responseType || '');
  if (!isBlobFile) return handleResponse(data, url);
  if (!isAutoDownload(options)) return handleResponse(data, url);
  let text: any = await blob2text(data);
  let result = handleResponse(text, url);
  if (!result.success) return result;
  return toDownload(data, options);
}
