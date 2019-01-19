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
        default-active="15"
        @select="handleSel"
        :collapse="isCollapse"
        :default-openeds="openMenu"
        v-if="sidebarList"
        @open='handleOpen'
        :unique-opened='menuUnique'
      >
        <div v-for="(item, index) in sidebarList" :key="index" >
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
import { getUserName, getPassWord } from '@/utils/token'
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
      sidebarList: [],
      menuUnique: false,
      activeMenu: '15'
    }
  },
  computed: {
  },
  methods: {
    handleSel (key, keyPath) { // 点击末级目录
      if (this.menuType === '2') { // 直接打开risk页面中的iframe
        let temp = keyPath[2].split('.')[0] + '.html'
        this.$store.commit('changeIframeHref', temp)
      } else {
        let pathTo = pathFilter(keyPath[1], keyPath[0])
        this.$router.push({ path: pathTo })
      }
    },
    handleOpen (val) { // 点击可展开的目录
      if (this.menuType === '2') {
        // sessionStorage.setItem('productShow', cc)
        this.$store.commit('changePresentId', val)
      }
    },
    changeMenu () {
      if (this.menuType === '1') {
        this.menuType = '2'
        this.$store.dispatch('productMenuGet').then(res => {
          this.getMenuArr = JSON.parse(sessionStorage.getItem('setSide'))
          this.sidebarList = formatSide(this.getMenuArr, this.menuType)
          this.$router.push({path: '/product/index'})
        })
      } else if (this.menuType === '2') {
        this.menuType = '1'
        this.getMenuArr = JSON.parse(sessionStorage.getItem('dataMenuSide'))
        this.sidebarList = formatSide(this.getMenuArr, this.menuType)
        this.$router.push({path: '/datacenter/index'})
      }
    }
  },
  created () {
    this.getMenuArr = JSON.parse(sessionStorage.getItem('dataMenuSide'))
    this.sidebarList = formatSide(this.getMenuArr, this.menuType)
    this.loginForm.username = getUserName()
    this.loginForm.password = getPassWord()
    // if (this.menuType === '1') {
    this.sidebarList.forEach(item => {
      this.openMenu.push(item.id)
    })
    console.log(this.openMenu, '当前的openMenu')
    // }
  },
  watch: {
    menuType () {
      if (this.menuType === '1') {
        this.menuUnique = false
      } else if (this.menuType === '2') {
        this.menuUnique = true
      }
      console.log(this.menuUnique)
    }
  }
}
</script>
