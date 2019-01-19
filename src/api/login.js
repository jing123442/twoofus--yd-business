import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

const loginApi = {
  LOGININFO  ({
    staffCode = 'yuanli',
    staffPwd = '123456'
  }) {
    return request({
      url: 'busi/login/submit.cmd',
      method: 'post',
      data: Object.assign({
        staffCode,
        staffPwd
      }, commonQuery())
    })
  }
}
export default loginApi
