import constants from '@/plugins/constants';
import bootstrap from './bootstrap';

interface PageType {
  path: string;
  name: string;
}

const global: any = window;
const _paq: any[] = global._paq || [];
const siteId: string = constants.PORTAL_SITE_ID;
const serverUrls: string[] = constants.MATOMO_SERVER_URLS;
const whiteList: PageType[] = constants.MATOMO_PAGES;

// 判斷是否為生產環境
const isNotProduction = () => {
  const inUrls = serverUrls.some(item => window.location.href.includes(item));
  return constants.IS_DEV && !inUrls && siteId;
};

const loadMatomo = () => {
  const u = constants.PORTAL_URL;
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', siteId]);
  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = u + 'matomo.js';
  s?.parentNode?.insertBefore(g, s);
};

/**
 * 初始化
 */
const initMatomo = () => {
  if (isNotProduction()) return;
  global._paq = _paq;
  const currentUrl = location.href;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  loadMatomo();
};

/**
 * 添加登录后的用户工号到matomo系统中
 * @param empNo 登录账号id（一般为用户工号
 */
const matomoLogin = (empNo: string) => {
  if (isNotProduction()) return;
  const currentUrl = location.href;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['setUserId', empNo]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
};

/**
 * 退出登录后在matomo系统中重置用户id
 */
const matomoLoginOut = () => {
  if (isNotProduction()) return;
  _paq.push(['resetUserId']);
  _paq.push(['appendToTrackingUrl', 'new_visit=1']);
  _paq.push(['trackPageView']);
  _paq.push(['appendToTrackingUrl', '']);
};

/**
 * 制定统计的页面
 * @param pageName 页面名称,不能乱写，不然统计数据会出问题
 */
export const matomoAddPage = (pageName: string) => {
  if (isNotProduction()) return;
  const currentUrl = location.href;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['setCustomVariable', 1, 'PageName', pageName, 'page']);
  _paq.push(['trackPageView']);
};

bootstrap.onInit(() => {
  initMatomo();
});

bootstrap.onLogin((user: any) => {
  matomoLogin(user.empNo);
});

bootstrap.onLoginOut(() => {
  matomoLoginOut();
});

bootstrap.onHistoryChange((pathname: string) => {
  const page = whiteList.find(item => item.path === pathname);
  if (page) matomoAddPage(page.name);
});
