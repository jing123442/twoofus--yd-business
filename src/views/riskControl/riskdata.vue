<template>
  <div class='riskData'>
    <el-col :span="8" v-for="(content, index) in renderData" :key="index">
    <el-card shadow="hover" >
      <div class='middleCon flex'>
        <img :src="'http://user.business.yipurse.cn/user/logo/'+content.channelLogo" class='imgSize'>
        <div class='textCon'>
          <h3>{{content.channelName}}</h3>
          <span class='block'>接口状态：{{content.channelStatus}}</span>
          <span>描述：</span><span>{{content.channelDesc}}</span>
        </div>
      </div>
      <div class='buttonCon'>
      <el-button type="primary" @click="clickButton(content.channelHtml)" size='mini'>详细</el-button>
      </div>
    </el-card>
  </el-col>
  <el-dialog title='接入说明' :visible.sync="dialogTableVisible" v-if='dialogSrc' width='1500px' top='50px'>
    <iframe :src="'http://user.business.yipurse.cn/user/channel/'+dialogSrc" frameborder="0" class='myifram'></iframe>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      side: [],
      renderData: [],
      dialogTableVisible: false
    }
  },
  computed: {
    fatherId () {
      return this.$store.state.product.presentId
    },
    dialogSrc () {
      return this.$store.state.product.iframeHref
    }
  },
  methods: {
    clickButton (val) {
      this.$store.commit('changeIframeHref', val)
    }
  },
  mounted () {
    this.side = JSON.parse(sessionStorage.getItem('setSide'))[0].subType
    this.renderData = this.side[0].subChannel
  },
  watch: {
    fatherId () {
      this.side.forEach(item => {
        if ((item.id + '') === this.fatherId) {
          this.renderData = item.subChannel
        }
      })
    },
    dialogSrc () {
      if (!this.dialogSrc) {
        this.dialogTableVisible = false
      } else {
        this.dialogTableVisible = true
      }
    },
    dialogTableVisible () {
      if (this.dialogTableVisible === false) {
        setTimeout(() => { this.$store.commit('changeIframeHref', '') }, 500)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.riskData{
  min-height:1000px;
.el-dialog__header{
  font-size:16px;
}
.iframCon{
  width:1300px;
  height:800px;
}
.myifram{
  width:100%;
  height:700px;
}
.imgSize{
  float:left;
  height:95px;
  max-width:140px;
  padding:20px 0 0 20px;
}
.textCon{
  // margin-left:200px;
  position:absolute;
  left:180px;
  width:50%;
}
span{
  font-size:12px
}
.buttonCon{
  margin-right:20px;
  text-align:right;
}
}
</style>
