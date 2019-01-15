<template>
  <div class='riskData'>
    <el-col :span="8" v-for="(content, index) in renderData" :key="index">
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
  <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
    <iframe src="" frameborder="0"></iframe>
  </el-dialog> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      side: [],
      renderData: [],
      fatherId: ''
    }
  },
  methods: {
    clickButton () {
    }
  },
  mounted () {
    this.side = JSON.parse(sessionStorage.getItem('setSide'))[0].subType
    console.log(this.side, '%%%%%%%%%%%%%%%')
    let temp = JSON.parse(sessionStorage.getItem('productShow'))
    this.side.forEach(item => {
      if((item.id + '') === temp ) {
        this.renderData = item.subChannel
      }
    })
    console.log(this.renderData)
  },
  watch: {
    fatherId () {
      let temp =  JSON.parse(sessionStorage.getItem('productShow'))
      this.side.forEach(item => {
      if((item.id + '') === temp) {
        this.renderData = item.subChannel
      }
    })
    }
   
  }
}
</script>

<style scoped>

</style>
