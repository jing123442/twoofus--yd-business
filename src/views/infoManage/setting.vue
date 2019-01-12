<template>
    <div class='model-con'>
     <el-row>
    <el-col :span="6"><span>联系人</span></el-col>
    <el-col :span="6"><span>联系电话</span></el-col>
    <el-col :span="6"><span>联系邮箱</span></el-col>
    <el-col :span="6"><span>发送余额提醒</span></el-col>
     </el-row>
      <el-row>
      <el-col :span="6"><span>{{contactMan}}</span></el-col>
      <el-col :span="6"><span>{{contactManMobile}}</span></el-col>
      <el-col :span="6"><span>{{contactManMail}}</span></el-col>
      <el-col :span="6"><el-switch v-model="isSend" active-color="#13ce66"  inactive-color="#ff4949" @change='setsetting'></el-switch></el-col>
     </el-row>
    </div>
</template>

<script>
import infoManageApi from '@/api/infoManage'
export default {
  data() {
      return {
          isSend: false,
          contactMan: '',  
          contactManMobile: '',  
          contactManMail: '',
      }
  },
  methods:{
      getsetting(){
         infoManageApi['GETSETTING']({}).then(res =>{
         const result = res.data.datas
        this.contactMan=result.contactMan
        this.contactManMobile = result.contactManMobile
        this.contactManMail = result.contactManMail
        this.isSend = result.isSend
         }).catch(error =>{console.log(error)})
      },
      setsetting() {
          infoManageApi['SETSETTING']({
              isSend:this.isSend
          }).then({}).catch(error =>{console.log(error)})
      },
      data(type){
          if(type === true){
              return 1
          } else if (type === false){
              return 0
          }
      }
  },   
  created(){
      this.getsetting()
  }    
}
</script>

<style scoped>
.flex>span{
    flex-grow:1;
}
.el-row{
    margin:20px;
}
</style>