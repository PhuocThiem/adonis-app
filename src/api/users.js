import http from '../services/http'

export default class User {
  static register (username, email, password) {
    return http.post('/users/create', { username, email, password })
  }
  static logIn (email, password) {
    return http.post('/users/sign-in', { email, password })
  }
  static getProfile (token) {
    return http.get('/users/profile/:id', { token })
  }
}
