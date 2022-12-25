export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true
  }),
  mutations: {
    triggerSidebarOpened(state: any) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
