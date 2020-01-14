import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import Post from '../api/posts'

import {
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_POST_OF_USER_REQUEST,
  GET_POST_OF_USER_SUCCESS,
  GET_POST_OF_USER_FAIL
} from '../constants/mutationTypes'

const state = {
  posts: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  postOfUser: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}

const actions = {
  async getPostOfUser ({ commit }, { UserID }) {
    commit(GET_POST_OF_USER_REQUEST)
    try {
      console.log('UserId in Store', UserID)
      const res = await Post.getPostOfUser(UserID)
      const data = get(res, 'data')
      commit(GET_POST_OF_USER_SUCCESS, { data: data })
    } catch (error) {
      commit(GET_POST_OF_USER_FAIL, { error: serializeError(error) })
    }
  },
  async getAllPost ({ commit }) {
    commit(GET_ALL_POST_REQUEST)
    try {
      const res = await Post.getAllPost()
      const data = get(res, 'data')
      commit(GET_ALL_POST_SUCCESS, { data: data })
    } catch (error) {
      commit(GET_ALL_POST_FAIL, { error: serializeError(error) })
    }
  }
}

const mutations = {
  [GET_POST_OF_USER_REQUEST] (state) {
    state.postOfUser.requesting = true
    state.postOfUser.status = 'requesting..'
  },
  [GET_POST_OF_USER_SUCCESS] (state, payload) {
    state.postOfUser.requesting = false
    state.postOfUser.status = 'seccess'
    state.postOfUser.result = payload
  },
  [GET_POST_OF_USER_FAIL] (state, payload) {
    state.postOfUser.requesting = true
    state.postOfUser.status = 'error'
    state.postOfUser.result = payload.error
  },
  [GET_ALL_POST_REQUEST] (state) {
    state.posts.requesting = true
    state.posts.status = 'requesting..'
  },
  [GET_ALL_POST_SUCCESS] (state, payload) {
    state.posts.requesting = false
    state.posts.status = 'seccess'
    state.posts.result = payload.data
  },
  [GET_ALL_POST_FAIL] (state, payload) {
    state.posts.requesting = true
    state.posts.status = 'error'
    state.posts.result = payload.error
  }
}

const getters = {
  Posts: state => get(state, 'posts.result.data'),
  PostOfUser: state => get(state, 'postOfUser.result.data')
}

export default {
  state,
  actions,
  mutations,
  getters
}
