import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL
})

api.interceptors.request.use(async (config) => {
  const userData = await localStorage.getItem('managee:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.Authorization = `Bearer ${token}`
  return config
})