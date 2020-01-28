import http from '../services/http'
import Storage from '../services/storage'

export default class Post {
  // static async getPostOfUser (UserId) {
  //   console.log('Requesting', UserId)
  //   const token = await Storage.getItem()
  //   return http.get(`/users/post?userId=${UserId}&limit=10&page=1`, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' } })
  // }
  static async getAllPost () {
    const token = await Storage.getItem()
    return http.get('/post/get?', { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' } })
  }
  static async getPostByID (postID) {
    console.log('GetPostById', postID)
    const token = await Storage.getItem()
    return http.get(`/post/get-post-detail/${postID}`, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' } })
  }
  static async getFavoritePosts (userID) {
    console.log('Favorite UID', userID)
    const token = await Storage.getItem()
    return http.get(`/users/post-liked?userId=${userID}&limit=10&page=1`, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' } })
  }
  static async getPostedPosts (userID) {
    console.log('Favorite UID', userID)
    const token = await Storage.getItem()
    return http.get(`/users/post?userId=${userID}`, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' } })
  }
  static async likePost (postId, hasLiked) {
    console.log('liked???', hasLiked)
    const token = await Storage.getItem()
    return http.post('/users/post/like ', { postId, hasLiked }, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' } })
  }
}
