/**
 * @description 路由配置
 */
export default [
  { path: '/', exact: true, redirect: '/home.html' },
  {
    path: '/',
    component: '@/pages/layouts/mainLayout',
    routes: [
      { path: '/home', component: '@/pages/main/home' },
      { path: '/editor', component: '@/pages/main/editor' },
      { path: '/pdf', component: '@/pages/main/pdf' },
    ],
  },
];
