import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import profiles from './profiles'
import posts from './posts'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    profiles,
    posts
  },
  plugins: [createPersistedState({
    paths: ['users.user', 'profiles.profile', 'profiles.avatar']
  })]
})
