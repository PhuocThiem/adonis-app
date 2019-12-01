// import { get } from 'lodash'
// import { serializeError } from 'serialize-error'

// import Profile from '../api/profiles'

// import {
//   SET_USER_PROFILE_REQUEST,
//   SET_USER_PROFILE_SUCCESS,
//   SET_USER_PROFILE_FAIL
// } from '../constants/mutationTypes'

const state = {
  profile: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}

const actions = {}

const mutations = {}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
