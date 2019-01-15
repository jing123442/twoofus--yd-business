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
    // redirect: 'home',
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
    // redirect: '/site/nlist',
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
    // redirect: '/datacenter/index',
    meta: {title: '数据中心'},
    children: [
      {
        path: 'index',
        component: () => import('@/views/dataCenter/overView'),
        name: '',
        meta: {title: '总览'}
      },
      {
        path: 'user_view',
        component: () => import('@/views/dataCenter/userView'),
        name: '',
        meta: {title: '使用详情'}
      }
    ]
  },
  {
    path: '/financecenter',
    component: () => LayOut,
    // redirect: '/financecenter/recharge',
    meta: {title: '财务中心'},
    children: [
      {
        path: 'recharge',
        component: () => import('@/views/finanCecenter/cashRecharge'),
        name: '',
        meta: {title: '现金充值'}
      },
      {
        path: 'record',
        component: () => import('@/views/finanCecenter/rechargeList'),
        name: '',
        meta: {title: '充值记录'}
      },
      {
        path: 'consumption',
        component: () => import('@/views/finanCecenter/consumeRecord'),
        name: '',
        meta: {title: '消费记录'}
      }
    ]
  },
  {
    path: '/infomanage',
    component: () => LayOut,
    // redirect: '/infomanage/merchant',
    meta: {title: '信息管理'},
    children: [
      {
        path: 'merchant',
        component: () => import('@/views/infoManage/merchant'),
        name: '',
        meta: {title: '商户信息'}
      },
      {
        path: 'password',
        component: () => import('@/views/infoManage/password'),
        name: '',
        meta: {title: '修改密码'}
      },
      {
        path: 'setup',
        component: () => import('@/views/infoManage/setup'),
        name: '',
        meta: {title: '通用设置'}
      }
    ]
  },
  {
    path: '*',
    component: () => LayOut,
    // redirect: '/404',
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
