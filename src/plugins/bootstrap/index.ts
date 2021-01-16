/**
 * app 生命週期管理器
 * events:
 * init 項目初始化時
 * login 登陸成功後，參數 user {User} 用戶信息
 * loginOut 登出時
 * historyChange 頁面切換時, 參數 pathname {字符串} 地址
 * 401 身份認證未通過時
 */
interface BootstrapType {
  state: any;
  on: (event: string, func: any) => any;
  handle: (event: string, ...args: any) => any;
}

const bootstrap: BootstrapType = {
  state: {},
  on(event: string, func: any) {
    if (!bootstrap.state[event]) bootstrap.state[event] = [];
    if (typeof func !== 'function') return;
    bootstrap.state[event].push(func);
  },
  handle(event: string, ...args: any) {
    if (Array.isArray(bootstrap.state[event])) {
      bootstrap.state[event].forEach((func: any) => {
        if (typeof func === 'function') func(...args);
      });
    }
  },
};

export default bootstrap;
