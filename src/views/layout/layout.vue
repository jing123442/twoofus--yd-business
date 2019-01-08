<template>
  <el-container>
    <Sidebar />
    <el-container class="content">
      <subhead></subhead>
      <!-- <el-scrollbar id="pagescoll"> -->
      <main-app></main-app>
      <!-- </el-scrollbar> -->
    </el-container>
  </el-container>
</template>
<script>
import MainApp from './components/mainapp'
import Sidebar from './components/sidebar'
import Subhead from './components/subhead'
export default {
  name: 'Layout',
  components: {
    MainApp,
    Sidebar,
    Subhead
  },
  data () {
    return {
    }
  }
}
</script>
