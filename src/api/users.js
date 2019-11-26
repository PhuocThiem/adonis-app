import http from '../services/http'

export default class User {
  static register (username, email, password) {
    return http.post('/users/create', { username, email, password })
  }
}
