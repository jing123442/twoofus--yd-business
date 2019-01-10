<template>
  <el-main id="main">
    <router-view />
    <footer class='mainFooter'>
    Copyright © 2018
    <a href style="color:#17aef2;">青岛翼租融资租赁有限责任公司</a>. All rights reserved.
    </footer>
  </el-main>
  
</template>
<script>
export default {
  name: 'MainApp',
  data () {
    return {}
  },
  created () {
    console.log(this.$route)
  }
}
</script>
