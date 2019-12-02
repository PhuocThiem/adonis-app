// import http from '../services/http';

export default class Profile {
  static setUserProfile (
    identifyCardNumber,
    phone,
    gender,
    address,
    city,
    country
  ) {
    console.log('id', identifyCardNumber)
    console.log('phone', phone)
    console.log('gender', gender)
    console.log('address', address)
    console.log('city', city)
    console.log('country', country)
    // return http.post('/users/set-user-profile', { identifyCardNumber, phone, gender, address, city, country })
  }
}
