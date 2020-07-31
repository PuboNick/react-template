let chunksTemp: string[] = ['axios', 'react-dom', 'moment', 'antd', '@umijs'];

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
};

export const chunks = chunksTemp.concat(['vendors', 'umi']);
