import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

import {
  getToken
} from '@/utils/token'

const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {
    tokenKey: TOKEN
  }, commonQuery())
}

const loginApi = {
  LOGININFO  ({
    staffCode = 'yuanli',
    staffPwd = '123456',
    ip = ''
  }) {
    return request({
      url: 'busi/login/submit.cmd',
      method: 'post',
      data: Object.assign({
        staffCode,
        staffPwd,
        ip
      }, commonQuery())
    })
  },
  PRODUCTMENU () {
    return request({
      url: 'busi/product/tree.cmd',
      method: 'post',
      data: pageQuery()
    })
  }
}
export default loginApi
