import { defineConfig } from 'umi';

import routes from './config/routes';

// 項目根路徑
const baseURI = process.env.NODE_ENV === 'development' ? '' : '/glue';

export default defineConfig({
  routes,
  title: '模板',
  mock: false,
  base: baseURI || '/',
  publicPath: `${baseURI}/`,
  copy: ['static'],
  request: {
    dataField: 'data',
  },
  favicon: '/favicon.ico',
  locale: {
    antd: true,
    baseNavigator: false,
  },
  antd: {},
  polyfill: {
    imports: ['core-js/stable'],
  },
  targets: {
    chrome: 49,
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  dynamicImport: {
    loading: '@/pages/common/Loading.tsx',
  },
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
  define: {
    // axios baseURI
    baseURI: `${baseURI}/`,
    // 開發環境 axios 默認地址
    apiBase: `http://127.0.0.1:8086${baseURI}/`,
    // apiBase: `${baseURI}/`,
    // moment 日期格式
    dateFormat: 'YYYY/MM/DD',
    // moment 時間格式
    timeFormat: 'HH:mm:ss',
    // moment 日期時間格式
    datetimeFormat: 'YYYY/MM/DD HH:mm:ss',
    // 頭像地址
    portraitUri: 'http://10.244.168.180/humattend/emp/queryPhotoByEmpNo?empNo=',
  },
});
