import http from '../services/http'

export default class Profile {
  static setUserProfile () {
    return http.post('/users/set-user-profile', {})
  }
}
