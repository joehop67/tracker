import React from 'react'
import {Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle} from 'reactstrap'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import jwt from 'jwt-decode'
import axios from 'axios'

export default class UserProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      budgets: {},
      expenses: {},
      partner: {}
    }
  }

  static async getInitialProps ({req, res}) {
    const token = req.headers.cookie.split('token=')[1]
    if (token) {
      return {user: jwt(token), token: token}
    } else {
      document.location = '/'
      return {}
    }
  }

  componentDidMount () {
    axios.get(`http://localhost:4000/plans/single/budgets`, {headers: {'Authorization': `Bearer ${this.props.token}`}})
      .then(budgets => {
        axios.get(`http://localhost:4000/plans/single/expenses`, {headers: {'Authorization': `Bearer ${this.props.token}`}})
          .then(expenses => {
            this.setState({budgets: budgets.data, expenses: expenses.data})
          })
      })
  }

  render () {
    console.log(this.props)
    return (
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
          
        `}</style>
        <NavBar user={this.props.user} />
        <div className='row'>
          <div className='user-card col-md-4'>
            <UserCard user={this.props.user} />
          </div>
          <div className='col-md-8'>
            <h1>Other Stuff</h1>
          </div>
        </div>
      </div>
    )
  }

}

function UserCard (props) {
  return (
    <div className='usercard'>
      <style jsx>{`
      
      `}</style>
      <Card>
        <CardImg top width='100%' src='/static/placeholder.jpg' alt='Profile Photo' />
        <CardBody>
          <CardTitle>{props.user.current_user}</CardTitle>
          <CardText>Just and example</CardText>
        </CardBody>
      </Card>
    </div>
  )
}