<template>
  <div class='riskData'>
    <el-col :span="8" v-for="(content, index) in renderData" :key="index">
    <el-card >
      <h3>{{content.channelName}}</h3>
      <img :src="'http://user.business.yipurse.cn/user/logo/'+content.channelLogo">
      <div>
        <span>{{content.channelStatus}}</span>
        <span>{{content.channelDesc}}</span>
        <el-button type="text" @click="clickButton(content.channelHtml)">详细说明</el-button>
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
</style>
