const KEY_LOGIN = 'KEY_LOGIN'

export default class Storage {
  static setItem (value, key = KEY_LOGIN) {
    return localStorage.setItem(key, value)
  }
  static getItem (value, key = KEY_LOGIN) {
    return localStorage.setItem(key, value)
  }
  static removeItem (value, key = KEY_LOGIN) {
    return localStorage.setItem(key, value)
  }
}
