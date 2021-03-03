import axios, { AxiosRequestConfig } from 'axios';

type RequestFactory = (params?: any, data?: any, config?: any) => Promise<any>;

/**
 * download 是否自動下載文件
 * withoutToken 是否自動刪除 access_token
 */
interface CreateApiFactoryConfig extends AxiosRequestConfig {
  withoutToken?: boolean;
  download?: {
    auto: boolean;
    fileName?: string;
  };
}

type Config<T> = {
  [key in keyof T]: CreateApiFactoryConfig;
};

type Factory<T> = {
  [key in keyof T]: RequestFactory;
};

/**
 * 創建api工廠方法
 * @param options AxiosRequestConfig
 */
export const createApiFactory = <T extends Object>(
  apis: Config<T>,
): Factory<T> => {
  const factory: any = {};
  for (const key in apis) {
    const options = apis[key];
    factory[key] = async (
      params?: any,
      data?: any,
      config?: any,
    ): Promise<RequestFactory> => {
      const opt = { ...options, params, data, ...config };
      const results: any = await axios(opt);
      if (!results.success) throw results.errorMessage;
      return results.data;
    };
  }
  return factory;
};
