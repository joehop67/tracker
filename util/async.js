/**
 * Dependencies
 */
import React from 'react'

/**
 * Async state HOC
 * 
 * Takes a promise, returns the data retrived from the promise
 * 
 * @param {Promise} promise
 * @param {Function} cb
 * @api public
 */

export default (promise, cb) => {
  class AsyncRunner extends React.PureComponent {
    constructor () {
      super()
      this.state = {
        data: {}
      }
    }

    async componentDidMount () {
      const data = await promise
      this.setState({data: data})
    }

    render () {
      return cb(this.state.data)
    }
  }

  return <React.Fragment>
    <AsyncRunner />
  </React.Fragment>
}