<template>
  <div class='riskData'>
     <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
    <el-tab-pane :label="item.typeName" :name="item.id+''" v-for='(item,key) in originMenu' :key='key+"tab"'>
    <el-col :span="8" v-for="(content, index) in randerData" :key="index">
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
    </el-tab-pane>
  </el-tabs>
  <el-dialog title='接入说明' :visible.sync="dialogTableVisible" v-if='dialogSrc' width='1500px' top='50px'>
    <iframe :src="'http://user.business.yipurse.cn/user/channel/'+dialogSrc" frameborder="0" class='myifram'></iframe>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      originMenu: [],
      side: [],
      randerData: [],
      dialogTableVisible: false,
      dialogSrc: ''
    }
  },
  computed: {
    activeName: {
      get: function () {
        return this.$store.state.product.iframeHref
      },
      set: function () {}
    }
  },
  methods: {
    clickButton (val) { // 更改vuex的三级展开的id
      this.dialogSrc = val
      this.dialogTableVisible = true
    },
    handleTabClick (tab, event) {
      this.$store.commit('setBreadnavTitle', tab.label)
      this.$store.commit('changeIframeHref', tab.name)
    }
  },
  beforeDestroy () { this.$store.commit('setBreadnavTitle', '') },
  mounted () { // 进入页面的时候渲染开头目录的页面
    this.originMenu = JSON.parse(sessionStorage.getItem('setSide'))
    this.randerData = []
    this.originMenu[0].subType.forEach(item => {
      if (item.subChannel && item.subChannel.length > 0) {
        this.randerData = this.randerData.concat(item.subChannel)
      }
    })
  },
  watch: {
    activeName () { // 监控一级目录id，变化以后，就改变页面渲染内容
      this.randerData = []
      this.originMenu.forEach(menu => {
        if ((menu.id + '') === this.activeName) {
          console.log(menu.subType)
          menu.subType.forEach(item => {
            if (item.subChannel && item.subChannel.length > 0) {
              this.randerData = this.randerData.concat(item.subChannel)
            }
          })
        }
      })
      console.log(this.randerData, 'this.randerData')
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
