import { getToken } from '@/utils/token'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (getToken()) {
//     if (to.path === '/login') {
//       next('/')
//       NProgress.done()
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next('/login')
//       NProgress.done()
//     }
//   }
// })

router.afterEach(() => {
  console.log(1)
  NProgress.done() // finish progress bar
})
