<template>
  <div class="formUpLoad">
    <div></div>
    <div>
      <img src='outputURL' alt>
    </div>
    <div>
      <button></button>
      <input type="file" accept="image/*" ref="uploadPic" @change="handlechange" class="uploadFile">
    </div>
  </div>
</template>

<script>
export default {
data() {
    return {
        outputURL: '',
        show: false
    }
},
methods:{
 compressBolb: function (file) {
      if (!file) {
        return
      }
      let imgcompress = new ImageCompressor()
      imgcompress.compress(file, {
        checkOrientation: true,
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        quality: 0.8,
        mimeType: '',
        convertSize: 5000000
      }).then((result) => {
        if (URL) {
          this.outputURL = URL.createObjectURL(result)
          this.show = true
        }
        this.$emit('picChange', this.outputURL)
      }).catch((err) => {
        this.show = false
        console.log(err)
      })
    },
    compressBase64 (file) {
      lrz(file)
        .then((rst) => {
          // 处理成功会执行
          this.outputURL = rst.base64
          this.show = true
          this.$emit('picChange', this.outputURL)
        //   this.$emit('update:src', rst.base64)
        })
        .catch((err) => {
          this.show = false
          throw new Error(err)
        })
    },
    handlechange: function (e) {
      let file = e.target.files ? e.target.files[0] : null
      /**
       * Bolb 模式 前台渲染需要 URL.createObjectURL()
       */
      if (!this.upType) {
        this.compressBolb(file)
        return false
      }
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
}
</style>
