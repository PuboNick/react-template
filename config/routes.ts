/**
 * @description 路由配置
 */
export default [
  { path: '/', exact: true, redirect: '/home' },
  {
    path: '/',
    component: '@/pages/layouts/mainLayout',
    routes: [{ path: '/home', component: '@/pages/main/homePage' }],
  },
];
