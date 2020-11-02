import { defineConfig } from 'umi';

import { chainWebpack, chunks } from './config/chainWebpack';
import routes from './config/routes';
import { base, copy } from './config/define';

/**
 * umijs 配置項
 * @member {string} outputPath 文件輸出路徑(打包後的文件路徑)
 * 詳見: https://umijs.org/zh-CN/config
 * Tip: Targets 配置最低兼容至 ie11 再往下將出現不可預知問題
 */
export default defineConfig({
  outputPath: 'dist',
  chainWebpack,
  chunks,
  routes,
  title: '模板',
  mock: false,
  ignoreMomentLocale: true,
  base: base || '/',
  publicPath: `${base}/`,
  hash: true,
  copy,
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
    ie: 11,
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
});
