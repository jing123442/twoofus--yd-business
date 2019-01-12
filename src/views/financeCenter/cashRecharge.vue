<template>
  <div class="cashRecharge">
    <div class="model-con">
      <h3>线下充值</h3>
      <div class="form-con">
        <el-form ref="cashRechargeForm" :model="cashRechargeForm" label-width="80px" :rules="rules">
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
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="cashRechargeForm.remitDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="上传凭证">
            <upload></upload>
          </el-form-item>
          <el-form-item label="验证码">
            <el-col :span="18">
              <el-input v-model="cashRechargeForm.ranDomManural"></el-input>
            </el-col>
            <el-col :span="6">
              <img
                :src="imgurl"
                style="width:100%;height:40px;padding-left:15px"
                @click="getImgCode"
              >
            </el-col>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import financeApi from "@/api/financeCenter";
import commonQuery from "@/utils/commonQuery";
import upload from "@/components/upload";
import { validateBankCard } from "@/filters/index";
export default {
  data() {
    return {
      cashRechargeForm: {
        bankCard: "",
        remitCompany: "",
        remitDate: moment().format('YYYY-MM-DD'),
        rechargeMoney: "",
        ranDomManural: "",
        remitSrc: '',
      },
      rules: {
        bankCard: [
          { required: true, validator: validateBankCard, trigger: "blur" }
        ],
        remitCompany: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        remitDate: [{}],
        rechargeMoney: [{}],
        ranDomManural: ""
      },
      merchantName: "",
      balance: "",
      imgurl: "",
      randomnum: 123456,
      
    };
  },
  methods: {
    onSubmit() {
      financeApi['RECHARGESAVE']({
        bankCard: this.cashRechargeForm.bankCard,
        remitCompany: this.cashRechargeForm.remitCompany,
        rechargeMoney: this.cashRechargeForm.remitCompany,
        remitDate: this.cashRechargeForm.remitDate,
        remitSrc: this.cashRechargeForm.remitSrc,
        imageCode: this.imgurl,
        random: randomnum,
      }).then(res =>{
        
      }).catch(error => {
          console.log(error)
        })
    },
    getbasic() {
      financeApi['USERINFO']({}).then(res => {
        const result = res.data.datas
        this.merchantName = result.merchantName
        this.balance = result.balance
      });
    },
    getImgCode() {
      this.randomnum = Math.ceil(Math.random() * 1000000);
      this.imgurl = `http://api.business.yipurse.cn/api/busi/apply/imagecode.cmd?ranDom=${
        this.randomnum
      }&snKey=${commonQuery().snKey}&timestamp=${
        commonQuery().timestamp
      }&signSystem=${commonQuery().signSystem}&systemKey=${
        commonQuery().systemKey
      }`
    }
  },
  created() {
    this.getbasic()
    this.getImgCode()
  },
  components: {
    upload
  }
};
</script>

<style scoped>
</style>
