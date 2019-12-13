import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import User from '../api/users'
import Storage from '../services/storage'
import router from '../router'
// import axios from 'axios'
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../constants/mutationTypes'

const state = {
  user: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}
const actions = {
  async register ({ commit, state }, { username, email, password }) {
    commit(REGISTER_USER_REQUEST)
    try {
      const res = await User.register(username, email, password)
      const data = get(res, 'data')
      const token = get(res, 'data.token')
      Storage.setItem(token)
      commit(REGISTER_USER_SUCCESS, data)
    } catch (error) {
      commit(REGISTER_USER_FAIL, { error: serializeError(error) })
    }
  },
  async logIn ({ commit }, { email, password }) {
    commit(LOGIN_USER_REQUEST)
    try {
      const res = await User.logIn(email, password)
      const data = get(res, 'data')
      const token = get(res, 'data.token')
      Storage.setItem(token)
      const redirectPath = get(router, 'currentRoute.query.redirect')
      console.log('redirectPath', redirectPath)
      router.push(redirectPath)
      commit(LOGIN_USER_SUCCESS, data)
    } catch (error) {
      commit(LOGIN_USER_FAIL, { error: serializeError(error) })
    }
  },
  logOut (token) {
    return Storage.removeItem(token)
  },
  isActiveEmail (sendEmail) {
    console.log('storeEmail', sendEmail)
    return User.active(sendEmail)
  }
}

const mutations = {
  [REGISTER_USER_REQUEST] (state) {
    state.user.requesting = true
    state.user.status = 'requesting..'
  },
  [REGISTER_USER_SUCCESS] (state, payload) {
    state.user.requesting = false
    state.user.status = 'success'
    state.user.result = payload
  },
  [REGISTER_USER_FAIL] (state, payload) {
    state.user.requesting = false
    state.user.status = 'error'
    state.user.result = payload.error
  },
  [LOGIN_USER_REQUEST] (state) {
    state.user.requesting = true
    state.user.status = 'requesting..'
  },
  [LOGIN_USER_SUCCESS] (state, payload) {
    state.user.requesting = false
    state.user.status = 'success'
    state.user.result = payload
  },
  [LOGIN_USER_FAIL] (state, payload) {
    state.user.requesting = false
    state.user.status = 'error'
    state.user.result = payload.error
  }
}

const getters = {
  user: state => get(state, 'user.result')
}

export default {
  state,
  actions,
  mutations,
  getters
}
