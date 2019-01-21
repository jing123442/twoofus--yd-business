<template>
  <el-breadcrumb id="breadnav" separator="/">
    <template v-for="(item, index) in $route.matched">
      <el-breadcrumb-item :key="index" :to="{ path: `${item.path}` }">{{(index==($route.matched.length-1))?($store.state.product.breadnavTitle||item.meta.title):item.meta.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
export default {
  data () {
    return {
      breadPath: []
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>
