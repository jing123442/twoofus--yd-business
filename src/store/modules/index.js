import sideBar from '@/meta/sidebar'
const index = {
  state: {
    sidebar: {
      lists: []
    }
  },
  mutations: {
    SET_SIDEBAR_LIST: (state, lists) => {
      state.sidebar.lists = sideBar[lists]
    }
  }
}
export default index
