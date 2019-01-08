import request from '@/utils/request'
import moment from 'moment'
import md5 from 'js-md5'
import commonQuery from '@/utils/commonQuery'
let AppKey = '888qiandada888'
let AppId = 'qiandada12345678'
let TimeStamp = moment(Date.now()).format('YYYYMMDDHHmmss')
let SignSystem = md5(AppKey + AppId + TimeStamp)
let Rnd = ''
function setRnd () {
  Rnd = moment(Date.now()).format('YYYYMMDDHHmmss')
  return Rnd
}
const loginApi = {
  LOGININFO  ({
    staffCode = 'yuanli',
    staffPwd = '123456'
    // snKey = '',
    // timestamp = AppId,
    // signSystem = TimeStamp,
    // systemKey = SignSystem
  }) {
    return request({
      url: 'busi/login/submit.cmd',
      method: 'post',
      data: Object.assign({
        staffCode,
        staffPwd
      }, commonQuery())
    })
  },
  LOGINCODE () {
    let url = 'report/login/imagecode'
    return process.env.BASE_API + url + '?timestamp=' + TimeStamp + '&signSystem=' + SignSystem + '&appId=' + AppId + '&rnd=' + setRnd()
  }
}
export default loginApi
