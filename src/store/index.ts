import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'

export default createStore({
  state() {
    return {
      globalName: 'Hello_AlexCc'
    }
  },
  getters,
  modules: {
    user
  }
})
