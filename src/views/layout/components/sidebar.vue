<template>
  <el-aside width="250px" id="sidebar" class="sidebar">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="logotxt">RULE SYSTEM</div>
      <el-menu background-color="#333d54"
        text-color="rgba(255,255,255,0.5)"
        active-text-color="rgba(255,255,255)"
        :default-active="$route.name"
        @select="handleSel"
        :collapse="isCollapse"
        :default-openeds="openMenu">
        <template v-if="sidebarList">
          <template  v-for="(item, index) in sidebarList">
            <el-submenu v-if="item.child" :index="item.key" v-bind:key="index">
              <template slot="title">
                <svg-icon :icon-class="item.ico" />
                <span slot="title">{{item.value}}</span>
              </template>
              <template v-for="(children, index) in item.child">
                <el-menu-item :index="children.key" v-bind:key="index"><svg-icon :icon-class="children.ico" /> {{children.value}}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="item.key" v-bind:key="index">
              <template slot="title">
                <svg-icon :icon-class="item.ico" />
                <span slot="title">{{item.value}}</span>
              </template>
            </el-menu-item>
          </template>  </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import path from 'path'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  data () {
    return {
      isCollapse: false,
      openMenu: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebarList'
    ])
  },
  methods: {
    ...mapMutations({
      setSidebarList: 'SET_SIDEBAR_LIST'
    }),
    handleSel (key, keyPath) {
      this.$router.push({ path: path.resolve(process.cwd(), ...keyPath) })
    }
  },
  created () {
    this.setSidebarList('mainbar')
  },
  watch: {
    sidebarList () {
      if (this.sidebarList) {
        this.sidebarList.forEach((item) => {
          this.openMenu.push(item.key)
        })
      }
    }
  }
}
</script>
