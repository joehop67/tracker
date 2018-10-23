import axios from 'axios'

const fetch = {
  get: (path, token, options = {}) => {
    return axios.get(process.env.API_ROOT + path, { headers: {...options.headers, 'Authorization': `Bearer ${token}`}} )
  },
  post: (path, data, token = '', options = {}) => {
    return axios.post(process.env.API_ROOT + path, data, {headers: (token || options) ? {...options.headers, 'Authorization': `Bearer ${token}`} : {}})
  }
}

export default fetch