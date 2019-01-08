import loginApi from '@/api/login'
import { getToken, setToken } from '@/utils/token'
import { Message } from 'element-ui'
const user = {
  state: {
    info: {
      name: '',
      mobile: ''
    },
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, obj) => {
      state.info = obj
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginApi['LOGININFO']({
          username: username,
          password: userInfo.password,
          imageCode: userInfo.checkcode
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            commit('SET_TOKEN', result.datas.tokenKey)
            commit('SET_INFO', {
              name: result.datas.userInfo.username,
              mobile: result.datas.userInfo.mobile
            })
            setToken(result.datas.tokenKey)
            resolve()
          } else {
            Message.warning({
              message: result.message
            })
            reject(new Error('system error'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
