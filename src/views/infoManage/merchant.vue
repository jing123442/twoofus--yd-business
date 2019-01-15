<template>
  <div>
    <div class='model-con'>
        <h3>基本信息</h3>
        <el-form >
            <el-form-item label='公司名称'>
             <span>{{userInfomation.businessName}}</span>
            </el-form-item>
            <el-form-item label='公司电话'>
             <span>{{userInfomation.businessTelephone}}</span>
            </el-form-item>
            <el-form-item label='手机号码'>
             <span>{{userInfomation.businessMobile}}</span>
            </el-form-item>
            <el-form-item label='公司地址'>
             <span>{{userInfomation.businessAddr}}</span>
            </el-form-item>
            <el-form-item label='创建时间'>
             <span>{{userInfomation.createTime}}</span>
            </el-form-item>
        </el-form>
    </div>
    <div class='model-con'>
        <h3>联系人信息</h3>
        <el-form>
            <el-form-item label='联系人姓名'>
             <span>{{userInfomation.contactMan}}</span>
            </el-form-item>
            <el-form-item label='联系电话'>
             <span>{{userInfomation.contactManMobile}}</span>
            </el-form-item>
            <el-form-item label='业务邮箱'>
             <span>{{userInfomation.contactManMail}}</span>
            </el-form-item>
            <el-form-item label='业务QQ'>
             <span>{{userInfomation.contactManQq}}</span>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
import moment from 'moment'
import infoManageApi from '@/api/infoManage'
export default {
  data () {
    return {
      userInfomation: {}
    }
  },
  methods: {
    getUserInfo () {
      infoManageApi['USERINFO']({}).then(res => {
        this.userInfomation = res.data.datas
        this.userInfomation.createTime = moment(new Date(this.userInfomation.createTime) * 1).format('YYYY-MM-DD ')
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
</style>
