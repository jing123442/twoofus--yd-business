import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

import {
  getToken,
  getAppId
} from '@/utils/token'

const TOKEN = getToken()
const APPID = getAppId()
const pageQuery = () => {
  return Object.assign({}, {
    tokenKey: TOKEN
  }, {
    appId: APPID
  }, commonQuery())
}

const loginApi = {
  LOGININFO  ({
    staffCode = '',
    staffPwd = '',
    ip = '',
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
