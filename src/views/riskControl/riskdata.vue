<template>
  <div class='riskData'>
    <el-col :span="8" v-for="(content, index) in datalist" :key="index">
    <el-card >
      <h3>{{content.channelName}}</h3>
      <img src="content.channelLogo">
      <div>
        <span>{{content.channelStatus}}</span>
        <span>{{content.channelDesc}}</span>
        <el-button type="text" class="clickButton">详细说明</el-button>
      </div>
    </el-card>
  </el-col>
  <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
    <iframe src="" frameborder="0"></iframe>
  </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['datalist'],
  data () {
    return {
      key: value
    }
  },
  methods:{
    clickButton () {
      
    },
  },


        
}
</script>

<style scoped>

</style>