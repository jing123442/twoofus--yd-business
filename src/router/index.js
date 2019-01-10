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
    path: '/',
    component: () => LayOut,
    redirect: 'home',
    meta: {title: '主页'},
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
    path: '/site',
    component: () => LayOut,
    redirect: '/site/nlist',
    meta: {title: '网站管理'},
    children: [
      {
        path: 'nlist',
        component: () => import('@/views/site/index'),
        name: '',
        meta: {title: '公告管理'}
      }
    ]
  },
  {
    path: '/datacenter',
    component: () => LayOut,
    redirect: '/datacenter/overview',
    meta: {title: '数据中心'},
    children: [
      {
        path: 'overview',
        component: () => import('@/views/dataCenter/overView'),
        name: '',
        meta: {title: '总览'}
      },
      {
        path: 'usedetails',
        component: () => import('@/views/dataCenter/useDetails'),
        name: '',
        meta: {title: '总览'}
      }
    ]
  },
  {
    path: '/financecenter',
    component: () => LayOut,
    redirect: '/financecenter/cashrecharge',
    meta: {title: '财务中心'},
    children: [
      {
        path: 'cashrecharge',
        component: () => import('@/views/finanCecenter/cashRecharge'),
        name: '',
        meta: {title: '现金充值'}
      },
      // {
      //   path: 'useDetails',
      //   component: () => import('@/views/dataCenter/useDetails'),
      //   name: '',
      //   meta: {title: '总览'}
      // }
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
        name: '404',
        meta: {title: '404'}
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
