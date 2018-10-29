/**
 * Dependencies
 */
import React from 'react'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import async from '../../../util/async'
import fetch from '../../../util/fetch'
import jwt from 'jwt-decode'
import UserCard from '../../../components/cards/user'

/**
 * View Partner Request Page
 * 
 * @api public
 */

export default class PartnerRequests extends React.Component {
  constructor (props) {
    super(props)
  }

  static async getInitialProps ({req, res}) {
    if (req.headers.cookie) {
      const token = req.headers.cookie.split('token=')[1]
      if (token) {
        return {user: jwt(token), token: token}
      } else {
        res.writeHead(302, {location: '/'})
        res.end()
        return {}
      }
    } else {
      res.writeHead(302, {location: '/'})
      res.end()
      return {}
    }
  }

  render () {
    return async(getRequest(this.props.token), ({data}) => {
      if (data) return (
        <div className='requests'>
          <style jsx>{`
            .users {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
          <Navbar user={this.props.user} token={this.props.token} />
          <div className='row'>
            <div className='col users'>
              <Requester id={data.requesterId} token={this.props.token} reqId={data._id} />
            </div>
            <div className='col users'>
              <Recipient id={data.recipientId} token={this.props.token} />
            </div>
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </div>
      )
      else return <h1>Loading</h1>
    })
  }
}

/**
 * Get User By ID
 * 
 * @param {String} id
 * @param {String} token
 * @api private
 */

function getUser (id, token) {
  return fetch.get(`/users/${id}`, token)
}

/**
 * Get partner request
 * 
 * @param {String} token
 * @api private
 */

function getRequest (token) {
  return fetch.get('/users/partner/request', token)
}

/**
 * Small recipient component to fetch data
 * before rendering
 * 
 * Props: -id: String, User ID
 *        -token: String, User Auth Token
 * 
 * @param {Object} props
 * @api private
 */

function Recipient (props) {
  const {id, token} = props
  return async(getUser(id, token), ({data}) => {
    if (data) return <UserCard data={data} current={true} />
    else return <h1>Loading</h1> 
  })
}

/**
 * Small requester component to fetch data
 * before rendering
 * 
 * Props: -id: String, User ID
 *        -token: String, User Auth Token
 * 
 * @param {Object} props
 * @api private
 */

function Requester (props) {
  const {id, token, reqId} = props
  return async(getUser(id, token), ({data}) => {
    if (data) return <UserCard data={data} current accept acceptRequest={() => {
      acceptRequest(reqId, token).then(res => {
        if (!res.error) document.location = '/profile/user'
        else console.log(res)
      })
    }} />
    else return <h1>Loading</h1> 
  })
}

/**
 * Accept request
 * 
 * @param {String} id
 * @param {String} token
 * @api private
 */

function acceptRequest (id, token) {
  const data = new FormData()
  data.append('request', id)
  data.append('accept', 'accept')
  return fetch.post('/users/partner/request/accept', data, token)
}