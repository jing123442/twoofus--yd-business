const product = {
  state: {
    presentId: {},
    iframeHref: {},
    breadnavTitle: ''
  },
  mutations: {
    setBreadnavTitle (state, val) {
      state.breadnavTitle = val
    },
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
