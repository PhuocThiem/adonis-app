import http from '../services/http'
export default class User {
  static register (username, email, password) {
    return http.post('/users/create', { username, email, password })
  }
  static logIn (email, password) {
    return http.post('/users/sign-in', { email, password })
  }
  static active (email) {
    console.log('email', email)
    return http.post('/users/resend-account-activation-email', { email })
  }
  static getCode (email) {
    console.log('email', email)
    return http.post('/users/send-password-reset-code', { email })
  }
  static verifyCode (userId, code) {
    console.log('userID', userId)
    console.log('code', code)
    return http.post('/users/verify-password-reset-code', { userId, code })
  }
  static resetPassword (userId, password) {
    console.log('userID', userId)
    console.log('password', password)
    return http.post('/users/reset-password  ', { userId, password })
  }
}
