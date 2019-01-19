<template>
  <div>
    <el-submenu v-if='treedata.child && treedata.child.length > 0' :index='treedata.id+""' :unique-opened='true'>
      <template slot='title'>
        <!-- <svg-icon :icon-class='treedata.ico' v-if='treedata.ico' /> -->
        <span slot='title'>{{treedata.value}}</span>
      </template>
      <div v-for='(children, index) in treedata.child' :key='index+"mid"'>
        <el-submenu :index='children.id+""' v-if='children.lastChild && children.lastChild.length > 0'>
        <template slot="title">{{children.value}}</template>
        <el-menu-item :index="val.key+''" v-for='(val,key) in children.lastChild' :key='key+"nextchild"'>{{val.value}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index='children.key+""'>
          <span slot='title'>{{children.value}}</span>
        </el-menu-item>
      </div>
    </el-submenu>
    <el-menu-item v-else :index='treedata.id+""' >
      <template slot='title'>
        <svg-icon :icon-class='treedata.ico' v-if='treedata.ico' />
        <span slot='title'>{{treedata.value}}</span>
      </template>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: 'treeItem',
  props: ['treedata'],
  data () {
    return {}
  },
  mounted () {
  }
}
</script>
