import { random } from '../utils';

/**
 * app 生命週期管理器
 * @member on 監聽器
 * @member cancel 取消監聽
 * @member handle 分發事件
 * events:
 * init 項目初始化時
 * login 登陸成功後，參數 user {User} 用戶信息
 * loginOut 登出時
 * historyChange 頁面切換時, 參數 pathname {字符串} 地址
 * 401 身份認證未通過時
 * getToken 獲取到 access_token 時, 參數 access_token {字符串}
 */
interface BootstrapType {
  on: (event: string, func: any) => string;
  cancel: (id: string) => void;
  handle: (event: string, ...args: any) => any;
}

// 方法緩存
const state: any = {};
// id 緩存
const ids: any = {};

const bootstrap: BootstrapType = {
  on(event: string, func: any) {
    if (!state[event]) state[event] = [];
    if (typeof func !== 'function') throw '第二個參數必須為方法!';
    const index = state[event].push(func) - 1;
    const key = random() + random();
    ids[key] = { event, index };
    return key;
  },
  cancel(id: string) {
    const { event, index } = ids[id] || {};
    if (!event) return;
    if (!Array.isArray(state[event])) return;
    state[event].splice(index, 1);
  },
  async handle(event: string, ...args: any) {
    if (Array.isArray(state[event])) {
      for (const func of state[event]) {
        if (typeof func === 'function') await func(...args);
      }
    }
  },
};

export default bootstrap;
