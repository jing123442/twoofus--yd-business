const product = {
  state: {
    presentId: {},
    iframeHref: {}
  },
  mutations: {
    changePresentId (state, val) {
      state.presentId = val
      console.log(val)
    },
    changeIframeHref (state, val) {
      state.iframeHref = val
      console.log(val)
    }
  }

}

export default product
