import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import Profile from '../api/profiles'

import {
  SET_USER_PROFILE_REQUEST,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_FAIL
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
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
