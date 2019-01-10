import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken,getAppId} from '@/utils/token'

const TOKEN = getToken()
const APPID = getAppId()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, {appId: APPID}, commonQuery())
  }  

const overViewApi = {
    NOTICELIST() {
      return request({
        url: 'busi/notice/list.cmd',
        method: 'post',
        data: pageQuery()
      })
    },
    SUMMATRYINFO() {
      return request({
        url: 'busi/statistic/user/summary.cmd',
        method: 'post',
        data: pageQuery()
      })
    },
    ACTIVATEPRODUCT({
      pageNum = '',
      pageSize = ''
    }) {
      return request({
        url: 'busi/product/busi/info.cmd',
        method: 'post',
        data: Object.assign({
          pageNum,
          pageSize,
        }, pageQuery())
      })
    },
    PRODUCTLIST() {
      return request({
        url: 'busi/product/busi/list.cmd',
        method: 'post',
        data: pageQuery()
      })
    },
    DATARECORD() {
      return request({
        url: 'busi/statistic/user/record.cmd',
        method: 'post',
        data: pageQuery()
      })   
    },
    TRENDCHART({
      index = '1',
      startDate = '',
      endDate = '',
      tokenKey = TOKEN
    }) {
      return request({
        url: 'busi/statistic/manage/trend.cmd',
        method: 'post',
        data: Object.assign({
          index,
          startDate,
          endDate
        },pageQuery())
      })
    } 
  }
  
export default overViewApi
  
