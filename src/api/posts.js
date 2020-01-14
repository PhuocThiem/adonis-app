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
}
