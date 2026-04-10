  // import axios from 'axios'
  // const api = axios.create({ baseURL: '/api' })
  // api.interceptors.request.use((config) => {
  //   const token = localStorage.getItem('token')
  //   if (token) config.headers.Authorization = `Bearer ${token}`
  //   return config
  // })
  // export default api

  import axios from 'axios'

const api = axios.create({ 
  // Change this to your ACTUAL backend URL
  baseURL: 'http://localhost:3000/api' 
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})

export default api