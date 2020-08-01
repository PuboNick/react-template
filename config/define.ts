/**
 * 全局常量
 * @param baseURI 項目根路徑
 */

export default function(baseURI: string) {
  return {
    // axios baseURI
    baseURI: `${baseURI}/`,
    // 開發環境 axios 默認地址
    apiBase: `http://127.0.0.1:8099${baseURI}/`,
    // apiBase: `${baseURI}/`,
    // moment 日期格式
    dateFormat: 'YYYY/MM/DD',
    // moment 時間格式
    timeFormat: 'HH:mm:ss',
    // moment 日期時間格式
    datetimeFormat: 'YYYY/MM/DD HH:mm:ss',
    // 頭像地址
    portraitUri: 'http://10.244.168.180/humattend/emp/queryPhotoByEmpNo?empNo=',
    // 權限服務器地址
    iamUri: 'http://10.244.168.180/iam/',
    // 系統在權限系統中的資源 ID
    systemId: 'A981B2A4C85A421EE050F40A5BE7165A',
  };
}
