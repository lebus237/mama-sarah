import axios, { type AxiosResponse } from 'axios'
import LocalStorage from '../local-storage/LocalStorage'
import { authSuccess } from './helpers/axios.session.helper'

const AxiosInstance = axios
export const getIsOk = (res: AxiosResponse<any>) => [200, 202, 201, 204, 203].includes(res.status)

let failedQueue: any[] = []
let isRefreshing = false

const processQueue = (error: any, token = null) => {
   failedQueue.forEach(prom => {
      if (error) {
         return prom.reject(error)
      } else {
         return prom.resolve(token)
      }
   })
   failedQueue = []
}

AxiosInstance.interceptors.response.use(
   response => response,
   function (error) {
      const originalRequest = error.config

      if (originalRequest?.url?.includes('/api/refresh-token') && !getIsOk(error.response)) {
         failedQueue = []
         window.location.href = '/logout'

         return
      } else if (
         originalRequest?.url !== '/login' &&
         401 === error.response.status &&
         !originalRequest._retry
      ) {
         if (isRefreshing) {
            delete axios.defaults.headers.Authorization

            return new Promise(function (resolve, reject) {
               failedQueue.push({ resolve, reject })
            })
               .then(token => {
                  originalRequest.headers.Authorization = `Bearer ${token}`

                  return axios(originalRequest) as any
               })
               .catch(err => {
                  return Promise.reject(err)
               })
         }

         originalRequest._retry = true
         isRefreshing = true

         const refreshToken = LocalStorage.getRefreshToken()

         return new Promise(function (resolve, reject) {
            axios
               .post('/api/refresh-token', { refreshToken })
               .then(({ data }) => {
                  authSuccess(data)
                  processQueue(null, data.token)
                  originalRequest.headers.Authorization = `Bearer ${data.token}`
                  isRefreshing = false
                  resolve(axios(originalRequest))
               })
               .catch(err => {
                  processQueue(err, null)
                  isRefreshing = false
                  reject(err)
               })
         })
      }

      return Promise.reject(error)
   },
)

export default AxiosInstance
