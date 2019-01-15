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
          <TreeMenu :treedata="item" ></TreeMenu>
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
import sideBar from '@/meta/sidebar'
import TreeMenu from '@/components/tree/treemenu'
import { getUserName, getPassWord} from '@/utils/token'
export default {
  name: 'Sidebar',
  components: {
    TreeMenu
  },
  data () {
    return {
      isCollapse: false,
      openMenu: [],
      menuType: 1,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    sidebarList () {
      console.log(sideBar.mainbar())
      return sideBar.mainbar()
    }
  },
  methods: {
    handleSel (key, keyPath) {
      let pathTo = pathFilter(keyPath[1], keyPath[0])
      this.$router.push({ path: pathTo })
    },
    changeMenu () { // product,user 点击后请求另一套接口，渲染目录 ,vuex中存入的状态是user，触发
      if (this.menuType === '1') {
        this.$store.dispatch('productMenuGet').then(res => {
        })
      } else if (this.menuType === '2') {
        this.loginForm.username = getUserName()
        this.loginForm.password = getPassWord()
        this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
          this.$router.push({ path: '/' })
        }).catch(() => {
        })
      }
    }
  },
  created () {
    // this.setSidebarList('mainbar')
    this.sidebarList.forEach(item => {
      this.openMenu.push({key: item.key, parentId: item.id})
    })
  },
  watch: {
    sidebarList () {
      if (this.sidebarList) {
        this.sidebarList.forEach(item => {
          this.openMenu.push({key: item.key, parentId: item.id})
        })
      }
    }
  }
}
</script>
