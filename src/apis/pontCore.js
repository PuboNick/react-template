'use strict';
/**
 * @description pont内置请求单例
 */
let __assign = function() {
  __assign =
    Object.assign ||
    function(t) {
      for (let s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (let p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, '__esModule', { value: true });
let Manager = /** @class */ (function() {
  function PontCoreManager() {}
  PontCoreManager.getSignleInstance = function() {
    if (!PontCoreManager.singleInstance) {
      PontCoreManager.singleInstance = new PontCoreManager();
      return PontCoreManager.singleInstance;
    }
    return PontCoreManager.singleInstance;
  };
  /**
   * fetch请求
   * @param url 请求url
   * @param options fetch 请求配置
   */
  PontCoreManager.prototype.fetch = function(url, options) {
    if (options === void 0) {
      options = {};
    }
    return fetch(url, options).then(function(res) {
      return res.json();
    });
  };
  /**
   * 使用外部传入的请求方法替换默认的fetch请求
   */
  PontCoreManager.prototype.useFetch = function(fetch) {
    if (typeof fetch !== 'function') {
      console.error('fetch should be a function ');
      return;
    }
    this.fetch = fetch;
  };
  PontCoreManager.prototype.getUrl = function(path, queryParams, method) {
    let params = __assign({}, queryParams || {});
    let url = path.replace(/\{([^\\}]*(?:\\.[^\\}]*)*)\}/gm, function(
      match,
      key,
    ) {
      // eslint-disable-next-line no-param-reassign
      key = key.trim();
      if (params[key] !== undefined) {
        let value = params[key];
        delete params[key];
        return value;
      }
      console.warn('Please set value for template key: ', key);
      return '';
    });
    let paramStr = Object.keys(params)
      .map(function(key) {
        return params[key] === undefined ? '' : key + '=' + params[key];
      })
      .filter(function(id) {
        return id;
      })
      .join('&');
    if (paramStr) {
      return url + '?' + paramStr;
    }
    return url;
  };
  PontCoreManager.singleInstance = null;
  return PontCoreManager;
})();
exports.PontCore = Manager.getSignleInstance();
