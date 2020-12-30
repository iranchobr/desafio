import axios from 'axios'

const HTTPClient = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// HTTPClient.interceptors.request.use(
//   config => {
//     const token = getStorage('token')
//     if (token) {
//       config.headers.common.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// HTTPClient.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => Promise.reject(error)
// )

export { HTTPClient }
