<template>
  <el-menu default-openeds="0" class="mainpage-left-side-menu el-menu-vertical-demo">
    <el-submenu index="0" v-for="(item,index) in menuItems" :key="index">
      <template slot="title">
        <p>
          <i class="el-icon-location"></i>
          <span style="font-size:13px;">{{item.subTitle}}</span>
        </p>
      </template>
      <el-menu-item
        :index="index+'-'+key"
        @click="clickItem"
        v-for="(val,key) in item.subMenuItems"
        :key="key"
      >
        <span>{{val.item}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: ["menuItems"],
  methods: {
    clickItem(ele) {
      let index = ele.index.split("-");
      let item = this.menuItems[index[0]].subMenuItems[index[1]];
      this.$emit("clickItem", item);
    }
  }
};
</script>

<style lang='scss'>
.mainpage-left-side-menu {
  i.el-icon-arrow-down {
    display: none;
  }
  .el-submenu__title {
    text-align: left;
    background: #f2f8f9;
    p {
      display: inline-block;
      margin: 0 0 0 15px;
    }
  }
  .el-menu-item {
    text-align: left;
    span {
      display: inline-block;
      margin-left: 30px;
      font-size: 12px;
    }
  }
}
</style>