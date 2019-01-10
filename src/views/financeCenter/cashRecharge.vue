<template>
  <div class='cashRecharge'>
    <div class='model-con'>
      <el-form :ref='cashRechargeForm' :model='cashRechargeForm' lable-width='80px'>
        <el-form-item label="公司名称">
          <span>{{merchantName}}</span>
        </el-form-item>
        <el-form-item label="账户余额">
          <span>￥{{balance}}</span>
        </el-form-item>
        <el-form-item label="汇款方式">
          <span>银行汇款</span>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="cashRechargeForm.bankCard"></el-input>
        </el-form-item>
        <el-form-item label="汇款公司">
          <el-input v-model="cashRechargeForm.remitCompany"></el-input>
        </el-form-item>
        <el-form-item label="汇款金额">
          <el-input v-model="cashRechargeForm.rechargeMoney"></el-input>
        </el-form-item>
        <el-form-item label="汇款日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="cashRechargeForm.remitDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item label='上传凭证'>

        <el-form-item>
         <el-form-item label="验证码">
          <el-input v-model="cashRechargeForm.ranDomManural"></el-input>
          <img src="imgurl" alt="">
        </el-form-item> 
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import financeApi from '@/api/financeCenter'
export default {
  data() {
    return {
      cashRechargeForm: {
        bankCard: '',
        remitCompany: '',
        remitDate: '',
        remitCompany: '',
        rechargeMoney: '',
        remitDate: '',
        ranDomManural: '',
      },
      merchantName: '',
      balance: '',
      imgurl: ''
      }
  },   
  methods:{
    getbasic(){
      financeApi['USERINFO']({}).then(res =>{
      const result =res.data.datas
      this.merchantName = result.merchantName
      this.balance = result.balance
      })
    },
    getImgCode(randomnum) {
      financeApi['IMGCODE']({randomnum}).then(res =>{
      this.imgurl= res
      })
    },

  },
  created(){
      this.getbasic()
      this.getImgCode('256986')
  }
}
</script>

<style scoped>

</style>