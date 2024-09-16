import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    auth: false,
    user: {},
  },
  getters: {
    user: (state) => state.user,
    auth: (state) => state.auth,
    token: (state) => state.token,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
