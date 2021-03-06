import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import User from '../api/users'

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
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
  async register ({ commit }, { username, email, password }) {
    commit(REGISTER_USER_REQUEST)
    try {
      const res = await 
    } catch (error)
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
    state.user.status = 'success'
    state.user.result = payload.error
  }
}

const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}
