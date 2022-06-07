import axios from 'axios'
import axiosRetry from 'axios-retry'

axios.defaults.timeout = 5000

axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => {
    if (error.message && error.message.startsWith('socket hang up')) {
      return true
    }
    return false
  }
})

console.log('=== CREATED AXIOS INSTANCE')

export const instance = axios