<template>
  <div class='cashRecharge'>
    <div class='model-con'>
      <h3>线下充值</h3>
      <div class='form-con'>
        <el-form ref='cashRechargeForm' :model='cashRechargeForm' label-width='80px' :rules='rule'>
          <el-form-item label='公司名称'>
            <span>{{merchantName}}</span>
          </el-form-item>
          <el-form-item label='账户余额'>
            <span>￥{{balance}}</span>
          </el-form-item>
          <el-form-item label='汇款方式'>
            <span>银行汇款</span>
          </el-form-item>
          <el-form-item label='银行卡号' prop='bankCard'>
            <el-input v-model='cashRechargeForm.bankCard' placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label='汇款公司' prop='remitCompany'>
            <el-input v-model='cashRechargeForm.remitCompany' placeholder="请输入汇款公司"></el-input>
          </el-form-item>
          <el-form-item label='汇款金额' prop='rechargeMoney'>
            <el-input v-model='cashRechargeForm.rechargeMoney' placeholder="请输入汇款金额"></el-input>
          </el-form-item>
          <el-form-item label='汇款日期' required>
            <el-col>
              <el-date-picker
                type='date'
                placeholder='选择日期'
                v-model='cashRechargeForm.remitDate'
                style='width: 100%;'
                prop='remitDate'
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label='上传凭证' requierd>
            <myUpload @getImg='getRemitSrc' ></myUpload>
          </el-form-item>
          <el-form-item label='验证码' prop='ranDomManural'>
            <el-col :span='18'>
              <el-input v-model='cashRechargeForm.ranDomManural'></el-input>
            </el-col>
            <el-col :span='6'>
              <img
                :src='imgurl'
                style='width:100%;height:40px;padding-left:15px'
                @click='getImgCode'
              >
            </el-col>
          </el-form-item >
          <div class='text-right' style='marginTop:50px'>
          <el-button type='primary' @click='onSubmit("cashRechargeForm")'>立即创建</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import financeApi from '@/api/financeCenter'
import commonQuery from '@/utils/commonQuery'
import myUpload from './cashRechargeTool/formUpload'
import { validateBankCard, validateText, validateOnlyNumber, validateCheckCode } from '@/filters/index'
export default {
  data () {
    return {
      cashRechargeForm: {
        bankCard: '125896521478563258',
        remitCompany: '你好',
        remitDate: moment().format('YYYY-MM-DD'),
        rechargeMoney: '100',
        ranDomManural: '',
        remitSrc: ''
      },
      rule: {
        bankCard: [{ required: true, validator: validateBankCard, trigger: 'blur' }],
        remitCompany: [{ required: true, validator: validateText, trigger: 'blur' }],
        remitDate: [{type: 'string', required: true, message: '请选择日期', trigger: 'change'}],
        rechargeMoney: [{required: true, validator: validateOnlyNumber, trigger: 'blur'}],
        ranDomManural: [{required: true, validator: validateCheckCode, trigger: 'blur'}],
        remitSrc: [{requierd: true, message: '请上传充值凭证', trigger: 'blur'}]
      },
      merchantName: '',
      balance: '',
      imgurl: '',
      randomnum: 123456
    }
  },
  methods: {
    onSubmit (cashRechargeForm) {
      this.$refs[cashRechargeForm].validate((valid) => {
        if (valid) {
          financeApi['RECHARGESAVE']({
            bankCard: this.cashRechargeForm.bankCard,
            remitCompany: this.cashRechargeForm.remitCompany,
            rechargeMoney: this.cashRechargeForm.rechargeMoney,
            remitDate: this.cashRechargeForm.remitDate,
            remitSrc: this.cashRechargeForm.remitSrc,
            imageCode: this.cashRechargeForm.ranDomManural,
            ranDom: this.randomnum
          }).then(res => {
            let result = res.data
            if (result.code === 200) {
              this.$message({message: '提交成功', type: 'success'})
            } else {
              this.$message.error({message: result.message})
            }
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error!')
          return false
        }
      })
    },
    getbasic () {
      financeApi['USERINFO']({}).then(res => {
        const result = res.data.datas
        this.merchantName = result.merchantName
        this.balance = result.balance
      })
    },
    getImgCode () {
      this.randomnum = Math.ceil(Math.random() * 1000000)
      console.log(this.randomnum, 'randomunu')
      this.imgurl = `http://api.business.yipurse.cn/api/busi/apply/imagecode.cmd?ranDom=${
        this.randomnum
      }&snKey=${commonQuery().snKey}&timestamp=${
        commonQuery().timestamp
      }&signSystem=${commonQuery().signSystem}&systemKey=${
        commonQuery().systemKey
      }`
    },
    getRemitSrc (val) {
      this.cashRechargeForm.remitSrc = val
    }
  },
  created () {
    this.getbasic()
    this.getImgCode()
  },
  components: {
    myUpload

  }
}
</script>

<style scoped>
</style>
