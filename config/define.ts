/**
 * 全局常量配置
 * 全局定義的常量，可以通過 constant 直接使用
 */

/**
 * 項目根路徑
 * Tip: 非空時需加 /
 * 例: '/example'
 */
export const base: string = '';

// 靜態文件夾
export const copy: any = ['static'];

/**
 * 接口服务器地址,对应 pont-config 配置
 * 理應一個數據源對應一個地址
 * Tip: 默認地址為 Axios 默認地址
 */
const APIS = {
  // 權限服務器地址
  iam: 'http://10.244.168.180',
};

export default {
  // 接口地址
  APIS,
  // 項目根路徑
  BASE_URL: `${base}/`,
  // 開發環境 axios 默認地址, axios 生產環境默認地址為 BASE_URL
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
  // 系統在權限系統中的資源 ID
  SYSTEM_ID: 'AE2804619ECB4A54E050F40A5BE75FB3',
  // ueditor 後台地址
  UE_SERVICE_URL: 'http://10.244.233.14:8080/ueditor/jsp/controller.jsp',
};
