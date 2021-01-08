/**
 * webpack 拆包
 */

// 包名 常規配置只需增加或者刪除該數組元素即可
let chunksTemp: string[] = ['axios', 'react-dom', 'moment', 'antd', '@umijs'];

// webpack 配置方法
export const chainWebpack = (config: any) => {
  let cacheGroups: any = {
    vendors: {
      name: 'vendors',
      test: /[\\/]node_modules[\\/]/,
      priority: -11,
      enforce: true,
    },
  };
  chunksTemp.forEach((item, index) => {
    cacheGroups[item] = {
      name: item,
      test: new RegExp(`[\\\\/]${item}[\\\\/]`),
      priority: -10 + index,
      enforce: true,
    };
  });
  config.optimization.splitChunks({
    chunks: 'all',
    automaticNameDelimiter: '～',
    name: true,
    minSize: 30000,
    minChunks: 1,
    cacheGroups,
  });
  config.module
    .rule('mjs')
    .test(/\.mjs$/)
    .when(true, (rule: any) => rule.include.add(/node_modules/))
    .type('javascript/auto');
};

export const chunks = chunksTemp.concat(['vendors', 'umi']);
