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
import bootstrap from '../bootstrap';
import constants from '../constants';
import { filter, ErrorInfoStructure } from './axios';

/**
 * 打印日誌
 * @param {any} message 內容
 */
filter.response((response: ErrorInfoStructure) => {
  if (!response.success && constants.IS_DEV) {
    console.log(response);
  }
  return response;
});
/**
 * 返回 401 時，重新登陸
 */
filter.response((response: ErrorInfoStructure) => {
  const { errorCode } = response;
  if (errorCode === '401') bootstrap.handle('401');
  return response;
});
