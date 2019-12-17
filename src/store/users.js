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
  LOGIN_USER_FAIL,
  GET_VARIFY_CODE_REQUEST,
  GET_VARIFY_CODE_SUCCESS,
  GET_VARIFY_CODE_FAIL,
  VERIFY_PASSWORD_CODE_REQUEST,
  VERIFY_PASSWORD_CODE_SUCCESS,
  VERIFY_PASSWORD_CODE_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from '../constants/mutationTypes'

const state = {
  user: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  confirm: {
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
  logOut () {
    return Storage.removeItem()
  },
  reSendEmail ({ commit }, email) {
    User.active(email)
  },
  async getCode ({ commit }, { email }) {
    commit(GET_VARIFY_CODE_REQUEST)
    try {
      const res = await User.getCode(email)
      const data = get(res, 'data')
      commit(GET_VARIFY_CODE_SUCCESS, data)
    } catch (error) {
      commit(GET_VARIFY_CODE_FAIL, { error: serializeError(error) })
    }
  },
  async verifyCode ({ commit }, { userID, code }) {
    commit(VERIFY_PASSWORD_CODE_REQUEST)
    try {
      const res = await User.verifyCode(userID, code)
      const data = get(res, 'data')
      commit(VERIFY_PASSWORD_CODE_SUCCESS, data)
    } catch (error) {
      commit(VERIFY_PASSWORD_CODE_FAIL, { error: serializeError(error) })
    }
  },
  async resetPassword ({ commit }, { userID, password }) {
    commit(RESET_PASSWORD_REQUEST)
    try {
      const res = await User.resetPassword(userID, password)
      const data = get(res, 'data')
      commit(RESET_PASSWORD_SUCCESS, data)
    } catch (error) {
      commit(RESET_PASSWORD_FAIL, { error: serializeError(error) })
    }
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
  },
  [GET_VARIFY_CODE_REQUEST] (state) {
    state.user.requesting = true
    state.user.status = 'requesting..'
  },
  [GET_VARIFY_CODE_SUCCESS] (state, payload) {
    state.user.requesting = false
    state.user.status = 'success'
    state.user.result = payload
  },
  [GET_VARIFY_CODE_FAIL] (state, payload) {
    state.user.requesting = false
    state.user.status = 'error'
    state.user.result = payload.error
  },
  [VERIFY_PASSWORD_CODE_REQUEST] (state) {
    state.confirm.requesting = true
    state.confirm.status = 'requesting..'
  },
  [VERIFY_PASSWORD_CODE_SUCCESS] (state, payload) {
    state.confirm.requesting = false
    state.confirm.status = 'success'
    state.confirm.result = payload
  },
  [VERIFY_PASSWORD_CODE_FAIL] (state, payload) {
    state.confirm.requesting = false
    state.confirm.status = 'error'
    state.confirm.result = payload.error
  },
  [RESET_PASSWORD_REQUEST] (state) {
    state.confirm.requesting = true
    state.confirm.status = 'requesting..'
  },
  [RESET_PASSWORD_SUCCESS] (state, payload) {
    state.confirm.requesting = false
    state.confirm.status = 'success'
    state.confirm.result = payload
  },
  [RESET_PASSWORD_FAIL] (state, payload) {
    state.confirm.requesting = false
    state.confirm.status = 'error'
    state.confirm.result = payload.error
  }
}

const getters = {
  user: state => get(state, 'user.result'),
  confirm: state => get(state, 'confirm.result')
}

export default {
  state,
  actions,
  mutations,
  getters
}
