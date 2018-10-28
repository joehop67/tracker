import React from 'react'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import jwt from 'jwt-decode'
import async from '../../util/async'
import axios from 'axios'
import fetch from '../../util/fetch'

export default class BudgetList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      budgets: []
    }
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

  // componentDidMount () {
  //   fetch.get('/plans/single/budgets', this.props.token).then(res => {
  //     console.log(res)
  //     this.setState({budgets: res.data})
  //   })
  // }

  render () {
    return (
      <div className='budgets'>
      <style jsx>{`
        .budgets {
          background: #e7dfdd;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
      <NavBar user={this.props.user} />
      <div className='list'>
        <ListComp token={this.props.token} />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
    )
  }

}

function ListComp (props) {
  return async(getBudgets(props.token), ({data}) => {
    if (data) return (
      <div className='budget-list'>
        <style jsx>{`
          .current {
            color: green;
          }
        `}</style>
        <ul>
          {data.map(budget => {
            return <li className={budget.current && 'current'}>{budget.name}</li>
          })}
        </ul>
      </div>
    )
    else return <h1>Loading</h1>
  })
}

function getBudgets (token) {
  return fetch.get('/plans/single/budgets', token)
}