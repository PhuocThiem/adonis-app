import http from '../services/http'
import Storage from '../services/storage'

export default class Profile {
  static async setUserProfile (
    identifyCardNumber,
    phone,
    gender,
    address,
    city,
    country
  ) {
    const token = await Storage.getItem()
    return http.post('/users/set-user-profile ', { identifyCardNumber, phone, gender, address, city, country }, { headers: { 'Authorization': `Bearer ${token}` } })
  }
  static async getProfile (UserID) {
    console.log('access API')
    const token = await Storage.getItem()
    return http.get(`/users/profile/${UserID}`, { headers: { 'Authorization': `bearer ${token}` } })
  }
  static async uploadAvatar (formData) {
    console.log('access API')
    const token = await Storage.getItem()
    return http.post('/users/set-user-avatar', formData, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } })
  }
}
