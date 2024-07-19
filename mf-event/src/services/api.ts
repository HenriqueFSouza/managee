import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || 'https://managee.onrender.com',
  withCredentials: true
})

api.interceptors.request.use(async (config) => {
  const userData = await localStorage.getItem('managee:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.Authorization = `Bearer ${token}`
  return config
})