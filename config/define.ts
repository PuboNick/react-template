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

// 打包文件夾
export const outputPath: string = 'dist';

/**
 * 接口服务器地址,对应 pont-config 配置
 * 理應一個數據源對應一個地址
 * Tip: 默認地址為 Axios 默認地址
 * 該配置會把key 作為根路徑來匹配例如：/iam/test 會匹配到 iam: 'http://10.244.168.180'
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
  // axios 默認地址
  API_BASE: `${base}/`,
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
  // matomo系统中注册的站点id，不能乱写
  PORTAL_SITE_ID: '',
  // 門戶系統 matomo 服務地址
  PORTAL_URL: '//10.244.231.138/matomo/',
  // 門戶統計服務器地址白名單 只有系統在白名單內時才會觸發統計,避免開發和測試時統計
  MATOMO_SERVER_URLS: ['10.244.168.180'],
  // 門戶系統需要特殊統計的頁面白名單 { name: '', path: '' }
  MATOMO_PAGES: [],
};
