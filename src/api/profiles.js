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
}
