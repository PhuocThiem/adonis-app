import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import Post from '../api/posts'

import {
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_POST_OF_USER_REQUEST,
  GET_POST_OF_USER_SUCCESS,
  GET_POST_OF_USER_FAIL,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  GET_FAVORITE_POST_REQUEST,
  GET_FAVORITE_POST_SUCCESS,
  GET_FAVORITE_POST_FAIL,
  GET_POSTED_POST_REQUEST,
  GET_POSTED_POST_SUCCESS,
  GET_POSTED_POST_FAIL
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
  },
  post: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  likePost: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  favoritePosts: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  postedPosts: {
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
  },
  async getPostByID ({ commit }, { postID }) {
    commit(GET_POST_BY_ID_REQUEST)
    try {
      const res = await Post.getPostByID(postID)
      const data = get(res, 'data')
      commit(GET_POST_BY_ID_SUCCESS, { data: data })
    } catch (error) {
      commit(GET_POST_BY_ID_FAIL, { error: serializeError(error) })
    }
  },
  async likePost ({ commit }, { postID, hasliked }) {
    commit(LIKE_POST_REQUEST)
    console.log('hasLiked', hasliked)
    try {
      const res = await Post.likePost(postID, hasliked)
      const data = get(res, 'data')
      console.log('data LikePost', res)
      commit(LIKE_POST_SUCCESS, { data: data })
    } catch (error) {
      commit(LIKE_POST_FAIL, { error: serializeError(error) })
    }
  },
  async getFavoritePosts ({ commit }, { userID }) {
    commit(GET_FAVORITE_POST_REQUEST)
    try {
      const res = await Post.getFavoritePosts(userID)
      const data = get(res, 'data')
      commit(GET_FAVORITE_POST_SUCCESS, { data: data })
    } catch (error) {
      commit(GET_FAVORITE_POST_FAIL, { error: serializeError(error) })
    }
  },
  async getPostedPosts ({ commit }, { userID }) {
    commit(GET_POSTED_POST_REQUEST)
    try {
      const res = await Post.getPostedPosts(userID)
      const data = get(res, 'data')
      commit(GET_POSTED_POST_SUCCESS, { data: data })
    } catch (error) {
      commit(GET_POSTED_POST_FAIL, { error: serializeError(error) })
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
    state.postOfUser.status = 'success'
    state.postOfUser.result = payload
  },
  [GET_POST_OF_USER_FAIL] (state, payload) {
    state.postOfUser.requesting = true
    state.postOfUser.status = 'error'
    state.postOfUser.error = payload.error
  },
  [GET_ALL_POST_REQUEST] (state) {
    state.posts.requesting = true
    state.posts.status = 'requesting..'
  },
  [GET_ALL_POST_SUCCESS] (state, payload) {
    state.posts.requesting = false
    state.posts.status = 'success'
    state.posts.result = payload.data
  },
  [GET_ALL_POST_FAIL] (state, payload) {
    state.posts.requesting = true
    state.posts.status = 'error'
    state.posts.error = payload.error
  },
  [GET_POST_BY_ID_REQUEST] (state) {
    state.post.requesting = true
    state.post.status = 'requesting..'
  },
  [GET_POST_BY_ID_SUCCESS] (state, payload) {
    state.post.requesting = false
    state.post.status = 'success'
    state.post.result = payload.data
  },
  [GET_POST_BY_ID_FAIL] (state, payload) {
    state.post.requesting = true
    state.post.status = 'error'
    state.post.error = payload.error
  },
  [LIKE_POST_REQUEST] (state) {
    state.likePost.requesting = true
    state.likePost.status = 'requesting..'
  },
  [LIKE_POST_SUCCESS] (state, payload) {
    state.likePost.requesting = false
    state.likePost.status = 'success'
    state.likePost.result = payload.data
  },
  [LIKE_POST_FAIL] (state, payload) {
    state.likePost.requesting = true
    state.likePost.status = 'error'
    state.likePost.result = payload.error
  },
  [GET_FAVORITE_POST_REQUEST] (state) {
    state.favoritePosts.requesting = true
    state.favoritePosts.status = 'requesting..'
  },
  [GET_FAVORITE_POST_SUCCESS] (state, payload) {
    state.favoritePosts.requesting = false
    state.favoritePosts.status = 'success'
    state.favoritePosts.result = payload.data
  },
  [GET_FAVORITE_POST_FAIL] (state, payload) {
    state.favoritePosts.requesting = true
    state.favoritePosts.status = 'error'
    state.favoritePosts.result = payload.error
  },
  [GET_POSTED_POST_REQUEST] (state) {
    state.postedPosts.requesting = true
    state.postedPosts.status = 'requesting..'
  },
  [GET_POSTED_POST_SUCCESS] (state, payload) {
    state.postedPosts.requesting = false
    state.postedPosts.status = 'success'
    state.postedPosts.result = payload.data
  },
  [GET_POSTED_POST_FAIL] (state, payload) {
    state.postedPosts.requesting = true
    state.postedPosts.status = 'error'
    state.postedPosts.result = payload.error
  }
}

const getters = {
  Posts: state => get(state, 'posts.result.data'),
  PostOfUser: state => get(state, 'postOfUser.result.data'),
  Post: state => get(state, 'post.result'),
  PostLiked: state => get(state, 'likePost.result'),
  favoritePosts: state => get(state, 'favoritePosts.result.data'),
  postedPosts: state => get(state, 'postedPosts.result')
}

export default {
  state,
  actions,
  mutations,
  getters
}
