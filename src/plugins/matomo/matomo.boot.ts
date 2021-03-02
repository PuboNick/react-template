import bootstrap from '../../system/bootstrap';
import constants from '../../system/constants';

interface PageType {
  path: string;
  name: string;
}

const global: any = window;
const _paq: any[] = global._paq || [];
const siteId: string = constants.PORTAL.siteId;
const whiteList: string[] = constants.PORTAL.whiteList;
const pages: PageType[] = constants.PORTAL.pages;

// 判斷是否為生產環境
const isNotProduction = () => {
  const inUrls = whiteList.some(item => window.location.href.includes(item));
  return constants.IS_DEV || !inUrls || !siteId;
};

/**
 * 加載遠程代碼
 */
const loadMatomo = () => {
  const u = constants.PORTAL.url;
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
bootstrap.on('init', () => {
  if (isNotProduction()) return;
  global._paq = _paq;
  const currentUrl = location.href;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  loadMatomo();
});

/**
 * 添加登录后的用户工号到matomo系统中
 * @param empNo 登录账号id（一般为用户工号
 */
bootstrap.on('login', (user: any) => {
  if (isNotProduction()) return;
  const currentUrl = location.href;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['setUserId', user.empNo]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
});

/**
 * 退出登录后在matomo系统中重置用户id
 */
bootstrap.on('loginOut', () => {
  if (isNotProduction()) return;
  _paq.push(['resetUserId']);
  _paq.push(['appendToTrackingUrl', 'new_visit=1']);
  _paq.push(['trackPageView']);
  _paq.push(['appendToTrackingUrl', '']);
});

/**
 * 制定统计的页面
 * @param pageName 页面名称,不能乱写，不然统计数据会出问题
 */
bootstrap.on('historyChange', (pathname: string) => {
  const page = pages.find(item => item.path === pathname);
  if (!page || isNotProduction()) return;
  const currentUrl = location.href;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['setCustomVariable', 1, 'PageName', page.name, 'page']);
  _paq.push(['trackPageView']);
});
