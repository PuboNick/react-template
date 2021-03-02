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
import bootstrap from '../../system/bootstrap';
import { filter, ErrorInfoStructure } from '.';

/**
 * 返回 401 時，重新登陸
 */
filter.response((response: ErrorInfoStructure) => {
  const { errorCode } = response;
  if (errorCode === '401') bootstrap.handle('401');
  return response;
});

/**
 * 異常攔截
 */
filter.response((response: ErrorInfoStructure) => {
  console.log(response);
  if (response.success) return response;
  return Promise.reject(response);
});
