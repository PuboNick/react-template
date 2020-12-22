/**
 * app 生命週期管理器
 * 可以通過 onInit 註冊在進入app時要執行的事件
 * 可以通過 onLogin 註冊登陸後時要執行的事件,回調參數為用戶信息
 */

const bootstrap: any = {
  initEvents: [],
  loginEvents: [],
  loginOutEvents: [],
  historyChangeEvents: [],
  init() {
    bootstrap.initEvents.forEach((func: any) => func());
  },
  login(user: any) {
    bootstrap.loginEvents.forEach((func: any) => func(user));
  },
  loginOut() {
    bootstrap.loginOutEvents.forEach((func: any) => func());
  },
  historyChange(pathname: string) {
    bootstrap.historyChangeEvents.forEach((func: any) => func(pathname));
  },
  onInit(func: any) {
    bootstrap.initEvents.push(func);
  },
  onLogin(func: any) {
    bootstrap.loginEvents.push(func);
  },
  onLoginOut(func: any) {
    bootstrap.loginOutEvents.push(func);
  },
  onHistoryChange(func: any) {
    bootstrap.historyChangeEvents.push(func);
  },
};

export default bootstrap;
