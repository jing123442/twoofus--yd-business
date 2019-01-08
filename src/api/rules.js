import request from '@/utils/request'
import moment from 'moment'
import md5 from 'js-md5'

let AppKey = '888qiandada888'
let AppId = 'qiandada12345678'
let TimeStamp = moment(Date.now()).format('YYYYMMDDHHmmss')
let SignSystem = md5(AppKey + AppId + TimeStamp)

const rulesApi = {
  RULESLIST  ({
    appId = AppId,
    timestamp = TimeStamp,
    signSystem = SignSystem,
    pageNum = 1,
    pageSize = 10,
    status = '',
    tokenKey = ''
  }) {
    return request({
      url: 'report/rule/getlist',
      method: 'get',
      params: {
        appId,
        timestamp,
        signSystem,
        pageNum,
        pageSize,
        status,
        tokenKey
      }
    })
  },
  RULESSTATUS  ({
    appId = AppId,
    timestamp = TimeStamp,
    signSystem = SignSystem,
    id = '',
    status = '',
    tokenKey = ''
  }) {
    return request({
      url: 'report/rule/updstatus',
      method: 'get',
      params: {
        appId,
        timestamp,
        signSystem,
        id,
        status,
        tokenKey
      }
    })
  }
}
export default rulesApi
