<template>
  <div class="formUpLoad">
    <div class='textCon'>
      <el-input v-model="uploadTxt" placeholder="上传图片"  disabled></el-input>
      </div>
      <!-- <div class='imgCon'>
      <img :src='outputURL' class='imgSize'>
    </div>       -->
    <div class='btnCon'>
      <el-button type="primary" plain class="uploadBtn">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <input type="file" accept="image/*" ref="uploadPic" @change="handlechange" class="uploadBtn"  style='opacity:0;zIndex:100'>
    </div>
  </div>
</template>

<script>
// import ImageCompressor from 'image-compressor.js'
import lrz from 'lrz'
// let URL = window.URL || window.webkitURL
export default {
  data () {
    return {
      outputURL: '',
      show: false,
      uploadTxt: ''
    }
  },
  methods: {
    // compressBolb: function (file) {
    //   if (!file) {
    //     return
    //   }
    //   let imgcompress = new ImageCompressor()
    //   imgcompress.compress(file, {
    //     checkOrientation: true,
    //     maxWidth: undefined,
    //     maxHeight: undefined,
    //     minWidth: 0,
    //     minHeight: 0,
    //     width: undefined,
    //     height: undefined,
    //     quality: 0.8,
    //     mimeType: '',
    //     convertSize: 5000000
    //   }).then((result) => {
    //     if (URL) {
    //       this.outputURL = URL.createObjectURL(result)
    //       this.show = true
    //     }
    //     this.$emit('picChange', this.outputURL)
    //   }).catch((err) => {
    //     this.show = false
    //     console.log(err)
    //   })
    // },
    compressBase64 (file) {
      lrz(file)
        .then((rst) => {
          // 处理成功会执行
          this.outputURL = rst.base64
          console.log(this.outputURL, 'inside')
          // console.log(rst.base64)
          this.$emit('getImg', this.outputURL)
        //   this.$emit('update:src', rst.base64)
        })
        .catch((err) => {
          this.show = false
          throw new Error(err)
        })
    },
    handlechange: function (e) {
      let file = e.target.files ? e.target.files[0] : null
      this.uploadTxt = e.target.value
      /**
       * Bolb 模式 前台渲染需要 URL.createObjectURL()
       */
      // if (!this.upType) {
      //   this.compressBolb(file)
      //   return false
      // }
      /**
       * 转为 base64
       */

      if (file.size > 0) {
        this.compressBase64(file)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.formUpLoad {
  display: flex;
  .btnCon{
    flex:1.5
  }
  .imgCon{
    flex:1.75;
    height:40px;
    text-align:center;
  }
  .textCon{
    flex:5;
    margin-right:15px;
  }
}
.imgSize{
  height:40px;
  // width:18%;
  padding-left:10px;
}
.uploadBtn{
  position:absolute;
  right:0;
  top:0;
  height:40px;
  width:22%;
}
</style>
