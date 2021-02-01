import { request, RequestConfig } from 'umi';

import bootstrap from '@/plugins/bootstrap';
import { PontCore } from '@/apis/pontCore';
import constants from '../constants';
import { isAutoDownload, parseResponse } from './res';

// 默認請求頭
const headers: any = {
  'Content-Type': 'application/json',
};

bootstrap.on('init', () => {
  PontCore.useFetch((url, options = {}) => request(url, options));
});

bootstrap.on('getToken', (header: any) => {
  // headers['Authorization'] = `Bearer ${header}`;
});

export const requestConfig: RequestConfig = {
  middlewares: [
    async function setBase(ctx, next) {
      const options: any = ctx.req.options;
      ctx.req.options.headers = { ...headers };
      ctx.req.options.body = JSON.stringify(options.body);
      await next();
      ctx.res = await parseResponse(ctx.res, ctx.req.url, options);
      if (ctx.res.errorCode === '401') bootstrap.handle('401');
      if (options.showType) {
        ctx.res.showType = options.showType;
      }
    },
    async function withoutAuthorization(ctx, next) {
      const options: any = ctx.req.options;
      if (options.withoutToken) {
        const header: any = ctx.req.options.headers;
        delete header.Authorization;
      }
      await next();
    },
    async function autoApi(ctx, next) {
      let base: string = ctx.req.url?.split('/')[1] || '';
      let apis: any = constants.APIS;
      if (apis[base]) {
        ctx.req.url = apis[base] + ctx.req.url;
      }
      await next();
    },
    async function autoDownload(ctx, next) {
      if (isAutoDownload(ctx.req.options)) {
        ctx.req.options.responseType = 'blob';
      }
      const responseType = ctx.req.options.responseType;
      const params = ctx.req.options.params;
      if (responseType) {
        ctx.req.options.params = { ...params, _responseType: responseType };
      }
      await next();
    },
  ],
};
