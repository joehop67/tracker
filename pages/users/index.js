/**
 * Dependencies
 */
import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import machine from 'react-states-machine'
import async from '../../util/async'
import fetch from '../../util/fetch'
import jwt from 'jwt-decode'
import {Button, Table} from 'reactstrap'

/**
 * Search Users page
 * 
 * @api public
 */

export default class UserList extends React.Component {
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
    return (
      <div className='users'>
        <style jsx>{`
          .users {
            background: #e7dfdd;
            height: 100%;
            overflow: hidden;  
          }
          .search {
            display: flex;
            position: absolute;
            width: 100%;
            align-items: center;
            justify-content: center;
            top: 3.5rem;
            bottom: 2rem;
            background: #e7dfdd;
          }
          .forms {
            background: #B0B0B0;
            padding: 5rem 2rem;
            border-radius: .25rem;
            box-shadow: 16px 1px 27px -7px rgba(0,0,0,0.43);
          }
          .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
        `}</style>
        <Navbar user={this.props.user} />
        <div className='search'>
          <div className='users-search'>
            <div className='forms'>
              <Search token={this.props.token} />
            </div>
          </div>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    )
  }
}

/**
 * Search form component
 * 
 * Multistep form that allows users to search by either email or name
 * in order to find other users
 * 
 * Props: -token: String, User Auth Token
 * 
 * @param {Object} props
 * @api private
 */

function Search (props) {
  const {token} = props
  return (
    <div className='search-form'>
      <style jsx>{`
        .btns {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .profile {
          height: 25%;
          width: 25%;
        }
        tr:hover {
          cursor: pointer;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input {
          margin-bottom: 1rem;
          border-radius: .25rem;
          height: 2rem;
          border: 0;
        }
      `}</style>
      {machine({
        'search': [
          props => {
            return (
              <div>
                <h3>Search Users</h3>
                <h5>Will you be searching by name or email?</h5>
                <div className='btns'>
                  <Button onClick={() => props.goto('email')}>Email</Button>
                  <Button onClick={() => props.goto('name')}>Name</Button>
                </div>
              </div>
            )
          }
        ],
        'email': [
          props => {
            return (
              <form onSubmit={(e) => {
                e.preventDefault()
                props.transition('check', e.target)
              }}>
                <h3>Search Users</h3>
                <h5>Enter the users email below</h5>
                <input type='email' name='email' placeholder='User Email' />
                <Button>Search</Button>
              </form>
            )
          }, {
            'check': [
              (prev, target) => {
                const data = new FormData(target)
                return {data: data}
              }, 'results'
            ]
          }
        ],
        'name': [
          props => {
            return (
              <form onSubmit={(e) => {
                e.preventDefault()
                props.transition('terms', e.target)
              }}>
                <h3>Search Users</h3>
                <h5>Enter the users name below</h5>
                <input type='name' name='name' placeholder='User Name' />
                <Button>Search</Button>
              </form>
            )
          }, {
            'terms': [
              (prev, target) => {
                const data = new FormData(target)
                return {data: data}
              }, 'results'
            ]
          }
        ],
        'results': [
          props => {
            return async(searchUsers(token, props.data), ({data}) => {
              if (data) return (
                <div className='results-list'>
                  <h3>{data.length > 1 ? `${data.length} Users match your search` : `${data.length} User matches your search`}</h3>
                  <Table dark>
                    <thead>
                      <tr>
                        <th>Pic</th>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user, idx) => {
                        return (
                          <tr scope='row' onClick={() => {
                            document.location = `/profile/user?id=${user._id}`
                          }}>
                            <td><img className='profile' src='/static/placeholder.jpg' /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              )
              else return <h1>Loading</h1>
            })
          }
        ]
      })}
    </div>
  )
}

/**
 * Search users
 * 
 * @param {String} token
 * @param {FormData} data
 * @api private
 */

function searchUsers (token, data) {
  return fetch.post('/users/search', data, token)
}