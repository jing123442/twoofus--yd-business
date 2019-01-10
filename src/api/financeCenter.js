import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken,getAppId} from '@/utils/token'

const TOKEN = getToken()
const APPID = getAppId()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, {appId: APPID}, commonQuery())
  }  
const financeApi = {
  /**
   *  现金充值
   */ 
  USERINFO() {
    return request({
      url: 'busi/balance/info.cmd',
      method: 'post',
      data: pageQuery()
    })
  },
  IMGCODE({
    ranDom = '125632'
  }) {
    return request({
      url: 'busi/apply/imagecode.cmd',
      method: 'post',
      data: Object.assign({
        ranDom,
      }, pageQuery())
    })
  },
  RECHARGESAVE({
    bankCard = '',
    remitCompany ='',
    rechargeMoney = '',
    remitDate = '',
    remitSrc = '',
    imageCode = '',
    ranDom = ''
  }) {
    return request({
      url: 'busi/recharge/save.cmd',
      method: 'post',
      data: Object.assign({
        bankCard,
        remitCompany,
        rechargeMoney,
        remitDate,
        remitSrc,
        imageCode,
        ranDom
      }, pageQuery())
    })
  }
}
export default financeApi