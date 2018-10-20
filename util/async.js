import React from 'react'

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