<template>
  <el-header id="header">
    <ul class="navbar">
      <li>
        <!-- <svg-icon icon-class="user" /> -->
        欢迎使用该系统</li>
    </ul>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SubHead',
  computed: {
    ...mapGetters([
      'subhead'
    ])
  },
  created () {
    console.log(this.subhead)
  }
}
</script>
