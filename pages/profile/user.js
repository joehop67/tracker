/**
 * Dependencies
 */
import React from 'react'
import {Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
Button} from 'reactstrap'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import jwt from 'jwt-decode'
import async from '../../util/async'
import fetch from '../../util/fetch'
import BudgetCard from '../../components/cards/budgets'
import UserCard from '../../components/cards/user'

/**
 * User profile page
 * 
 * @api public
 */

export default class UserProfile extends React.Component {
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
    }
  }

  /**
   * Send Partner Request
   * 
   * @param {String} email
   * @param {String} token
   * @api private
   */

  sendRequest = (email, token) => {
    const data = new FormData()
    data.append('partner', email)
    return fetch.post('/users/partner/request', data, token).then(res => {
      if (!res.error) document.location = '/profile/user'
      else console.log(res)
    })
  }

  render () {
    const id = this.props.url.query.id || this.props.user.id
    return async(getUser(id, this.props.token), ({data}) => {
      if (data) return (
        <div className='profile'>
          <style jsx>{`
            .profile {
              background: #e7dfdd;
              height: 100%;
              overflow: hidden;
            }
            .user-card {
              border-right: 2px solid #000;
              padding: 2rem;
            }
            .budget {
              padding: 2rem;
            }
            .footer {
              width: 100%;
              background: #e7dfdd;
            }
          `}</style>
          <NavBar user={this.props.user} token={this.props.token} />
          <div className='row'>
            <div className='user-card col-md-4'>
              <UserCard data={data} current={(id === this.props.user.id) || (id === this.props.user.partner_id)} sendRequest={(email) => this.sendRequest(email, this.props.token)} />
            </div>
            <div className='budget col-md-8'>
              {data.user.currentBudget
                ? <BudgetCard budget={data.user.currentBudget} token={this.props.token} />
                : (id === this.props.user.id)
                  ? <a href='/budgets/create'>No Budget! Create a new one here!</a>
                  : 'This user has no budget yet!'}
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
 * Get user info
 * 
 * @param {String} id
 * @param {String} token
 * @api private
 */

function getUser (id, token) {
  return fetch.get(`/users/${id}`, token)
}