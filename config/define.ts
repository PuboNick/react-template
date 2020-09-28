/**
 * 全局常量配置
 * 全局定義的常量，可以在constant中直接使用
 */

// 項目根路徑
export const base = '';

export default {
  // 項目根路徑
  BASE_URL: `${base}/`,
  // 開發環境 axios 默認地址
  API_BASE: `http://127.0.0.1:8099${base}/`,
  // API_BASE: `${base}/`,
  // moment 日期格式
  DATE_FORMAT: 'YYYY/MM/DD',
  // moment 時間格式
  TIME_FORMAT: 'HH:mm:ss',
  // moment 日期時間格式
  DATE_TIME_FORMAT: 'YYYY/MM/DD HH:mm:ss',
  // 頭像地址
  PORTRAIT_URI: 'http://10.244.168.180/humattend/emp/queryPhotoByEmpNo?empNo=',
  // 權限服務器地址
  IAM_URI: 'http://10.244.168.180/iam',
  // 系統在權限系統中的資源 ID
  SYSTEM_ID: 'A981B2A4C85A421EE050F40A5BE7165A',
  // ueditor 後台地址
  UE_SERVICE_URL: 'http://10.244.233.14:8080/ueditor/jsp/controller.jsp',
};
