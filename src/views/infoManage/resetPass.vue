<template>
    <div class='model-con'>
    <el-form :model="resetPassForm" status-icon :rules="rules" ref="resetPassForm" label-width="100px" >
     <el-form-item label="原始密码" prop="beforePassword">
    <el-input v-model.number="resetPassForm.beforePassword"></el-input>
  </el-form-item>     
  <el-form-item label="密码" prop="newPassword">
    <el-input type="password" v-model="resetPassForm.newPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkNewPassword">
    <el-input type="password" v-model="resetPassForm.checkNewPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('resetPassForm')">提交</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
import {getStaffCode} from '@/utils/token'
import infoManageApi from '@/api/infoManage'
export default {
  data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.resetPassForm.checkNewPassword !== '') {
            this.$refs.resetPassForm.validateField('checkNewPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPassForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };      
    return {
      resetPassForm:{
        beforePassword:'',
        newPassword: '',
        checkNewPassword: '',
      }, 
      rules:{
        beforePassword:[{required:true, message:'请输入原始密码'}],
        newPassword:[{required:true, validator: validatePass, trigger: 'blur'}],
        checkNewPassword:[{required:true, validator: validatePass2, trigger: 'blur'}],
      },
      staffCode:''            
        }
    },
    methods:{
        submitForm(resetPassForm) {
        let staffcode= getStaffCode()
        this.$refs[resetPassForm].validate((valid) => {
          if (valid) {
           infoManageApi['RESETPASS']({
               beforePassword:this.resetPassForm.beforePassword,
               newPassword:this.resetPassForm.checkNewPassword,
               staffCode:staffcode
               }).then(res =>{
                 if (res.data.code === 200) {
            this.$message({ message: res.data.message, type: 'success' })
          } else {
             this.$message({ message: res.data.message, type: 'warning',duration: '3000' })  
          }
          }).catch(error =>{
                   console.log(error)
               })
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
    },
}
</script>

<style scoped>

</style>