import define from '../../config/define';

export default {
  IS_DEV: process.env.NODE_ENV === 'development',
  ...define,
};
