import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'

export default createStore({
  state() {
    return {
      globalName: 'Hello_AlexCc'
    }
  },
  getters,
  modules: {
    user,
    app,
    theme
  }
})
