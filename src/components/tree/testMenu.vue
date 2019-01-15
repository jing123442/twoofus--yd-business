<template>
    <div>
    <el-submenu v-if='treeData.child && treeData.child.length > 0' :index='treeData.id'>
      <template slot="title">{{treedata.value}}</template>
      <div v-for='(middle,index) in treeData.child' :key='index+"mid"'>  
        <!-- 判断第二层数据是否有child -->
        <el-submenu v-if='middle.lastChild && treeData.child.length > 0' :index='middle.id'>
          <template slot="title">{{middle.value}}</template>
          <div v-for='(last,key) in middle.lastChild' :key='key+"last"'>
              <el-menu-item :index='last.href'>{{last.value}}</el-menu-item>
          </div>
        </el-submenu>
        <!-- 判断第二层数据是否有child -->
        <el-menu-item v-else :index='middle.id'>
          <span>{{middle.value}}</span>   
        </el-menu-item>
      </div>
    </el-submenu>
    <!-- 判断第一层数据是否有child -->
    <el-menu-item v-else :index='treeData.id'>
      <span>{{treedata.value}}</span>
    </el-menu-item>
    </div>
</template>

<script>
export default {
  props:['treeData'],
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  mounted () {
    console.log('组件引入成功')
  }       
}
</script>

<style scoped>

</style>