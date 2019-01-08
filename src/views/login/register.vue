<template>
  <div class='register-page'>
    <div class='register-head'>
      <div class='navbar'>
        <img src="../../assets/logo.png" alt="" class='navbar-brand'>
        <span>官方首页</span>
        <p class='registerHeadRight'><i class='el-icon-phone'></i>&nbsp;&nbsp;0532-55558688</p>
      </div>
      <div class='banner_text_inner'>
        <h4>免费申请试用</h4>
        <h5>请留下您的相关信息，我们会尽快与您联系</h5>
      </div>
    </div>
    <main class='formCon'>
      <el-form :model='registerForm' ref='registerForm' :rules='rules' class='formcenter'>
        <el-form-item prop="companyName">
          <el-input v-model="registerForm.companyName" placeholder='请填写公司名称'></el-input>
        </el-form-item>
        <el-form-item prop="contactName">
          <el-input v-model="registerForm.contactName" placeholder='请填写联系人姓名'></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <el-input v-model="registerForm.mail" placeholder='请填写邮箱'></el-input>
        </el-form-item>
        <el-form-item prop="contactPhone">
          <el-input v-model="registerForm.contactPhone" placeholder='请填写联系人手机号'></el-input>
        </el-form-item>
        <div class='flexCon'>
        <el-form-item prop="imgText" class='formleft'>
          <el-input v-model="registerForm.imgText" placeholder='请输入图中文字' ></el-input>
        </el-form-item>
        <img src="" alt="" class=''>
        </div>
        <div class='flexCon'>
          <el-form-item prop="identifyCode" class='formleft'>
          <el-input v-model="registerForm.identifyCode" placeholder='请输入6位短信验证码'></el-input>
        </el-form-item>
         <div class='identifyButton'>发送验证码</div>
        </div>
        <div class='registerSub'>提交申请</div>
      </el-form>
    </main>
    <footer class='applyFooter'></footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registerForm: {
        companyName: '',
        contactName: '',
        mail: '',
        contactPhone: '',
        imgText: '',
        identifyCode: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang='scss' >
  .register-page {
    .register-head {
      height: 360px;
    }
    .applyHead {
      text-align: center;
    }
    .formCon {
      background-color: #f4f6f8;
      margin: auto;
    }
    .formcenter {
      padding: 100px 0 100px 0;
      margin: auto;
      width: 670px;
    }
    .formleft{
      width:495px;
      margin-right:15px;
    }
    .navbar {
      position: absolute;
      width: 100%;
      height: 100px;
      line-height: 100px;
      top: 0px;
      left: 0px;
      z-index: 30;
      .navbar-brand {
        position:absolute;
        top:25px;
        left:50px;
      }
      .registerHeadRight {
        float: right;
        color: #fff;
        margin: 0;
        margin-right: 50px;
        font-size: 25px;
      }
      span {
        color: #E7E7E7;
        float: right;
        margin-right: 50px;
      }
      .el-icon-phone {
        color: #000;
        background: #fff;
        height: 25px;
        width: 25px;
        font-size: 20px;
        text-align: center;
        line-height: 25px;
        border-radius: 5px;
      }
    }
    .banner_text_inner {
      text-align: center;
      position: relative;
      padding-top: 195px;
      color: #fff;
      h4 {
        font-size: 36px;
        font-weight: 500;
        margin: 0;
        padding-bottom: 10px;
      }
      h5 {
        font-size: 18px;
        font-weight: 500;
        margin: 0
      }
    }
    .flexCon{
      width:670px;
      display:flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .identifyButton{
       text-align:center;
       height:50px;
       line-height:50px;
       width:165px;
       border:1px solid #333;
       font-size:13px;
      }
    }
  }
</style>
