import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import Profile from '../api/profiles'

import {
  SET_USER_PROFILE_REQUEST,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL
} from '../constants/mutationTypes'

const state = {
  profile: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}

const actions = {
  async setProfile ({ commit }, { identifyCardNumber, phone, selected, address, city, country }) {
    commit(SET_USER_PROFILE_REQUEST)
    try {
      const res = await Profile.setUserProfile(identifyCardNumber, phone, selected, address, city, country)
      const data = get(res, 'data')
      console.log('data', data)
      commit(SET_USER_PROFILE_SUCCESS, { data: data })
    } catch (error) {
      commit(SET_USER_PROFILE_FAIL, { error: serializeError(error) })
    }
  },
  async getProfile ({ commit }, { userID }) {
    commit(GET_USER_PROFILE_REQUEST)
    try {
      const res = await Profile.getProfile(userID)
      const data = get(res, 'data')
      commit(GET_USER_PROFILE_SUCCESS, data)
    } catch (error) {
      commit(GET_USER_PROFILE_FAIL, { error: serializeError(error) })
    }
  }
}

const mutations = {
  [SET_USER_PROFILE_REQUEST] (state) {
    state.profile.requesting = true
    state.profile.status = 'requesting..'
  },
  [SET_USER_PROFILE_SUCCESS] (state, payload) {
    state.profile.requesting = true
    state.profile.status = 'success'
    state.profile.result = payload
  },
  [SET_USER_PROFILE_FAIL] (state, payload) {
    state.profile.requesting = true
    state.profile.status = 'error'
    state.profile.error = payload.error
  },
  [GET_USER_PROFILE_REQUEST] (state) {
    state.profile.requesting = true
    state.profile.status = 'requesting..'
  },
  [GET_USER_PROFILE_SUCCESS] (state, payload) {
    state.profile.requesting = true
    state.profile.status = 'success'
    state.profile.result = payload
  },
  [GET_USER_PROFILE_FAIL] (state, payload) {
    state.profile.requesting = true
    state.profile.status = 'error'
    state.profile.error = payload.error
  }
}

const getters = {
  profile: state => get(state, 'profile.result')
}

export default {
  state,
  actions,
  mutations,
  getters
}