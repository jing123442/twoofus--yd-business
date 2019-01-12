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

const infoManageApi = {
 /**
   *  商户信息
   */
  USERINFO () {
    return request({
      url: 'busi/user/info.cmd',
      method: 'post',
      data: pageQuery()
    })
  },
  RESETPASS ({
    beforePassword = '' ,
    newPassword = '',
    staffCode = '' 
  }) {
    return request({
      url: 'busi/person/password.cmd',
      method: 'post',
      data: Object.assign({
        beforePassword,
        newPassword,
        staffCode,
      },  pageQuery())
    })
  },
  GETSETTING () {
    return request({
      url: 'busi/person/info.cmd',
      method: 'post',
      data: pageQuery()
    })
  },
  SETSETTING ({
    isSend = ''
  }) {
    return request({
      url: 'busi/person/handle.cmd',
      method: 'post',
      data: Object.assign({
        isSend
      }, pageQuery())
    })
  }
}

export default infoManageApi