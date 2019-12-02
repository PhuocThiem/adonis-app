import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import profiles from './profiles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    profiles
  }
})
