import React from 'react'
import {Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Jumbotron,
Progress} from 'reactstrap'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import jwt from 'jwt-decode'
import async from '../../util/async'
import fetch from '../../util/fetch'

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
          <NavBar user={this.props.user} />
          <div className='row'>
            <div className='user-card col-md-4'>
              <UserCard data={data} />
            </div>
            <div className='budget col-md-8'>
              <BudgetCard budget={data.user.currentBudget} token={this.props.token} />
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

function BudgetCard (props) {
  return async(getBudget(props.budget, props.token), ({data}) => {
    if (data) {
      const progress = (data.saved / data.savings) * 100
      return (
        <div className='budget-card'>
          <style jsx>{`
            :global(.bg-bar) {
              background: grey;
            }
            .amounts {
              display: flex;
              justify-content: space-between;
            }
            .current {
              color: green;
              font-size: 2rem;
            }
            .desired {
              color: blue;
              font-size: 2rem;
            }
            .percent {
              color: grey;
              font-size: 1.5rem;
            }
          `}</style>
          <Jumbotron>
            <h1>{data.name}</h1>
            <div className='saving-progress'>
              <div className='amounts'>
                <span className='current'>${data.saved}</span>
                <span className='percent'>{progress}%</span>
                <span className='desired'>${data.savings}</span>
              </div>
              <div className='saved-bar'>
                <Progress value={25} className='bg-bar' />
              </div>
            </div>
          </Jumbotron>
        </div>
      )
    }
    else return <h1>Loading</h1>
  })
}

function getBudget (id, token) {
  return fetch.get(`/plans/single/budgets/${id}`, token)
}

function UserCard (props) {
  const {data} = props
  return (
    <div className='usercard'>
      <style jsx>{`
        ul {
          list-style-type: none;
          margin-top: .5rem;
        }
      `}</style>
      <Card>
        <CardImg top width='100%' src='/static/placeholder.jpg' alt='Profile Photo' />
        <CardBody>
          <CardTitle>{data.user.name || data.user.email}</CardTitle>
          {data.user.name && <CardSubtitle>{data.user.email}</CardSubtitle>}
          <CardText>
            <ul>
              <li><b>Salary:</b> ${data.user.salary}</li>
              <li><b>Groups:</b> Placeholder</li>
              {data.partner && <li><b>Partner: </b><a href={`/profile/user?id=${data.partner._id}`}>{data.partner.name}</a></li>}
            </ul>
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function getUser (id, token) {
  return fetch.get(`/users/${id}`, token)
}