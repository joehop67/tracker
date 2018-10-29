/**
 * Dependencies
 */
import axios from 'axios'

/**
 * Fetch Component
 * 
 * is an object with functions that correspond to
 * HTTP verbs, corresponding with Axios methods,
 * used to simplify calls to the API
 * 
 * @api public
 */

const fetch = {
  /**
   * Fetch Get
   * 
   * Sends Get request to server
   * 
   * @param {String} path - trails after 'http://localhost:(port)'
   * @param {String} token
   * @param {Object} options
   * @returns {Promise} 
   */
  get: (path, token, options = {}) => {
    return axios.get(process.env.API_ROOT + path, { headers: {...options.headers, 'Authorization': `Bearer ${token}`}} )
  },
  /**
   * Fetch Post
   * 
   * Sends Post request to server with data
   * 
   * @param {String} path - trails after 'http://localhost:(port)'
   * @param {Object|FormData} data
   * @param {String} token
   * @param {Object} options
   * @returns {Promise} 
   */
  post: (path, data, token = '', options = {}) => {
    return axios.post(process.env.API_ROOT + path, data, {headers: (token || options) ? {...options.headers, 'Authorization': `Bearer ${token}`} : {}})
  }
}

export default fetch