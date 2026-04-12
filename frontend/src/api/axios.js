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
  // baseURL: import.meta.env.VITE_API_URL|| 'http://localhost:3000/api' 
baseURL:'https://full-stack-contact-app-production.up.railway.app/api'
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