import { defineConfig } from 'umi';

import { chainWebpack, chunks } from './config/chainWebpack';
import routes from './config/routes';
import getDefine from './config/define';

// 項目根路徑
const baseURI = process.env.NODE_ENV === 'development' ? '' : '';

export default defineConfig({
  chainWebpack,
  chunks,
  routes,
  title: '模板',
  mock: false,
  ignoreMomentLocale: true,
  base: baseURI || '/',
  publicPath: `${baseURI}/`,
  hash: true,
  copy: ['static'],
  request: {
    dataField: 'data',
  },
  exportStatic: {
    htmlSuffix: true,
  },
  favicon: '/favicon.ico',
  locale: {
    antd: true,
    baseNavigator: false,
    default: 'zh-TW',
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
    loading: '@/pages/common/loading.tsx',
  },
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
  define: getDefine(baseURI),
});
