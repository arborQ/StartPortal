import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorized: false
  },
  mutations: {
    authorize (state, payload) {
      state.isAuthorized = true
    },
    logout (state) {
      state.isAuthorized = false
    }
  },
  actions: {
  },
  modules: {
  }
})
