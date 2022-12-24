import { createStore } from 'vuex'
import user from './modules/user'

export default createStore({
  state() {
    return {
      globalName: 'Hello_AlexCc'
    }
  },
  modules: {
    user
  }
})
