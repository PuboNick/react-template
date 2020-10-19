/**
 * @description 路由配置
 */
export default [
  {
    path: '/',
    exact: true,
    redirect: '/home.html',
  },
  {
    path: '/',
    component: '@/pages/layouts/main',
    routes: [
      {
        path: '/home',
        component: '@/pages/main/home',
      },
    ],
  },
];
