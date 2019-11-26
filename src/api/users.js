import http from '../services/http'

export default class User {
  static register (username, email, password) {
    console.log('username', username)
    console.log('email', email)
    console.log('password', password)
    return http.post('/users/create', { username, email, password })
  }
}
