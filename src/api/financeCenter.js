import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import {getToken, getAppId} from '@/utils/token'

const TOKEN = getToken()
const APPID = getAppId()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, {appId: APPID}, commonQuery())
}
const financeApi = {
  /**
   *  现金充值
   */
  USERINFO () {
    return request({
      url: 'busi/balance/info.cmd',
      method: 'post',
      data: pageQuery()
    })
  },
  IMGCODE ({
    ranDom = '125632'
  }) {
    return request({
      url: 'busi/apply/imagecode.cmd',
      method: 'post',
      data: Object.assign({
        ranDom
      }, pageQuery())
    })
  },
  RECHARGESAVE ({
    bankCard = '',
    remitCompany = '',
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
  },
  /**
   *  充值记录
   */
  RECHARGELIST ({
    pageNum = '',
    pageSize = '',
    rechargeType = '',
    rechargeStatus = '',
    orderId = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/recharge/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        rechargeType,
        rechargeStatus,
        orderId,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  EXPORTRECHARGELIST ({
    pageNum = '',
    pageSize = '',
    rechargeType = '',
    rechargeStatus = '',
    orderId = '',
    startDate = '',
    endDate = ''
  }) {
    return request({
      url: 'busi/recharge/export.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        rechargeType,
        rechargeStatus,
        orderId,
        startDate,
        endDate
      }, pageQuery())
    })
  },
  /**
   *  消费记录
   */
  CONSUMELIST ({
    pageNum = '',
    pageSize = '',
    custName = '',
    startDate = '',
    endDate = '',
    channelId = ''
  }) {
    return request({
      url: 'busi/consume/list.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        custName,
        startDate,
        endDate,
        channelId
      }, pageQuery())
    })
  },
  EXPORTRECONSUMELIST ({
    pageNum = '',
    pageSize = '',
    custName = '',
    startDate = '',
    endDate = '',
    channelId = ''
  }) {
    return request({
      url: 'busi/consume/export.cmd',
      method: 'post',
      data: Object.assign({
        pageNum,
        pageSize,
        custName,
        startDate,
        endDate,
        channelId
      }, pageQuery())
    })
  }
}
export default financeApi
