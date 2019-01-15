<template>
  <el-aside width="200px" id="sidebar" class="sidebar">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="logotxt">
        <img :src="require(`@/assets/logo.png`)">
      </div>
      <el-menu
        background-color="#333d54"
        text-color="rgba(255,255,255,0.5)"
        active-text-color="rgba(255,255,255)"
        :default-active="$route.name"
        @select="handleSel"
        :collapse="isCollapse"
        :default-openeds="openMenu"
        v-if="sidebarList"
      >
        <div v-for="(item, index) in sidebarList" :key="index" >
          <!-- <el-submenu v-if="item.child && item.child.length > 0" :index="item.key" v-bind:key="index">
              <template slot="title">
                <svg-icon :icon-class="item.ico" v-if="item.ico" />
                <span slot="title">{{item.value}}</span>
              </template>
              <template v-for="(children, index) in item.child">
                <el-menu-item :index="children.key" v-bind:key="index">
                  <svg-icon :icon-class="children.ico" v-if="children.ico"  />
                  {{children.value}}
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="item.key" v-bind:key="index">
              <template slot="title">
                <svg-icon :icon-class="item.ico" v-if="item.ico" />
                <span slot="title">{{item.value}}</span>
              </template>
          </el-menu-item>-->
          <TreeMenu :treedata="item"></TreeMenu>
        </div>
        <div class='text-center'>
        <el-button class='navButton' @click='changeMenu'>{{this.menuType === '1'?'产品服务':'用户中心'}}</el-button>
        </div>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>

import { pathFilter } from '@/filters/index'
// import path from 'path'
// import { mapMutations, mapGetters } from 'vuex'
import { formatSide } from '@/meta/sidebar'
import TreeMenu from '@/components/tree/treemenu'
import { getMenuType, getUserName, getPassWord} from '@/utils/token'
export default {
  name: 'Sidebar',
  components: {
    TreeMenu
  },
  data () {
    return {
      isCollapse: false,
      openMenu: [],
      menuType: '1',
      loginForm: {
        username: '',
        password: ''
      },
      getMenuArr: [],
      sidebarList: []
    }
  },
  computed: {
    // ...mapGetters([
    //   'sidebarList'
    // ])
  },
  methods: {
    // ...mapMutations({
    //   setSidebarList: 'SET_SIDEBAR_LIST'
    // }),
    handleSel (key, keyPath) {
      let pathTo = pathFilter(keyPath[1], keyPath[0])
      this.$router.push({ path: pathTo })
    },
    changeMenu () {
      console.log(getMenuType())
      if (this.menuType === '1') {
        this.menuType = '2'
        this.$store.dispatch('productMenuGet').then(res => {
          this.getMenuArr = JSON.parse(sessionStorage.getItem("setSide"))
          this.sidebarList = formatSide(this.getMenuArr, this.menuType)
        })
      } else if (this.menuType === '2') {
        this.menuType = '1'
        this.loginForm.ip = sessionStorage.getItem('Ip')
        this.$store.dispatch('LoginByUsername', this.loginForm).then(res => {
          this.getMenuArr = JSON.parse(sessionStorage.getItem("setSide"))
          this.sidebarList = formatSide(this.getMenuArr, this.menuType)
        }).catch(() => {
        })
      }
    }
  },
  created () {
    this.getMenuArr = JSON.parse(sessionStorage.getItem("setSide"))
    this.sidebarList = formatSide(this.getMenuArr, this.menuType)
    this.loginForm.username = getUserName()
    this.loginForm.password = getPassWord() 
  },
  watch: {

  }
}
</script>
