import axios from 'axios'

const fetch = {
  get: (path, token, options = {}) => {
    return axios.get(process.env.API_ROOT + path, { headers: {...options.headers, 'Authorization': `Bearer ${token}`}} )
  },
  post: (path, data) => {
    return axios.post(process.env.API_ROOT + path, data)
  }
}

export default fetch