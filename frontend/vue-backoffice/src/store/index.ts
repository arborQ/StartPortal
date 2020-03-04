import Vue from 'vue'
import Vuex from 'vuex'
import { SetToken } from '@/utils/fetch'

Vue.use(Vuex)
const storageKey = 'authtoken'
const token = localStorage.getItem(storageKey)
SetToken(token || '')

export default new Vuex.Store({
  state: {
    isAuthorized: !!token,
    token: token
  },
  mutations: {
    authorize (state, { token }) {
      localStorage.setItem(storageKey, token)
      SetToken(token)
      state.isAuthorized = true
      state.token = token
    },
    logout (state) {
      localStorage.setItem(storageKey, '')
      SetToken()
      state.isAuthorized = false
      state.token = null
    }
  },
  actions: {
  },
  modules: {
  }
})
