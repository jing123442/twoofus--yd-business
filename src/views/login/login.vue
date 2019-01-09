<template>
  <div class="login-page">
    <div class="navbar"><img src="../../assets/logo.png" alt="" class='navbar-brand'></div>
    <div class="container">
      <div class="login-container">
        <el-form ref="loginForm" class="login-form" :model="loginForm" size="mini">
          <!--:rules="loginRules"-->
          <h3 class="text-center">翼盾客户合作平台</h3>
          <el-form-item prop="username">
            <span class='text-samll'>账号</span>
            <el-input v-model="loginForm.username" placeholder="邮箱/手机号" name="username" type="text" auto-complete="on" />
          </el-form-item>
          <el-form-item prop="password">
            <span class='text-samll'>密码</span>
            <el-input v-model="loginForm.password" placeholder="*********" name="password" type="password" auto-complete="on" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin" style="width:100%">登录</el-button>
          </el-form-item>
          <el-checkbox v-model="checked" class='text-samll'>保持登录状态</el-checkbox>
          <a class='forget-pass text-mini'>忘记密码</a>
          <p style='textAlign:center;padding:16px;margin:0'>
            <span class='text-mini'>还没有账号？</span>
            <a @click='gotoUrl' class='text-mini'>申请免费试用</a>
          </p>
        </el-form>
      </div>
      <p class='info-center'>copyright © 2018 青岛翼租融资租赁有限责任公司. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import loginApi from '@/api/login'
export default {
  components: {},
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      checked: '',
      imgsrc: '',
      loginRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 30,
          message: '长度在 3 到 30 个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          min: 3,
          max: 30,
          message: '密码长度在 2 到 30 个字符',
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  created () {
    this.handleCode()
  },
  methods: {
    handleCode () {
      this.imgsrc = loginApi['LOGINCODE']()
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    gotoUrl () {
      console.log('??????????????????')
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input-group__append {
  width: 100px;
  padding: 0;
  border: 0;
  }
.el-checkbox__label{
  font-size:13px!important;
  }
.forget-pass {
  float:right;
  }
  .el-button--primary{
    background:#308ee0
  }
  .info-center{
    text-align:center;
    color:rgba(255, 255, 255, 0.4);
    font-size:13px;
    margin-top:20px;
  }
</style>
