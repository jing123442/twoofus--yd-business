import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import product from './modules/product'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    index,
    product
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
