import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const LayOut = import('@/views/layout/layout')
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/register',
    component: () => import('@/views/login/register')
  },

  {
    path: '/',
    component: () => LayOut,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'home',
        meta: {title: '主页面板'}
      }
    ]
  },
  {
    path: '/rules',
    component: () => LayOut,
    redirect: '/rules/lists',
    children: [
      {
        path: 'lists',
        component: () => import('@/views/rules'),
        name: 'lists',
        meta: {title: '规则列表'}
      }
    ]
  },
  {
    path: '*',
    component: () => LayOut,
    redirect: '/404',
    children: [
      {
        path: '404',
        component: () => import('@/views/404'),
        name: 'info',
        meta: {title: '客户信息'}
      }
    ]
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // base: '/fe-risk',
  base: __dirname,
  routes: constantRouterMap
})

// export const asyncRouterMap = []
