/**
 * Dependencies
 */
import React from 'react'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import jwt from 'jwt-decode'
import async from '../../util/async'
import fetch from '../../util/fetch'
import BudgetCard from '../../components/cards/budgets'
import {ListGroup, ListGroupItemHeading, ListGroupItemText, ListGroupItem, Progress} from 'reactstrap'

/**
 * List Users budgets page
 */

export default class BudgetList extends React.Component {
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
      <div className='budgets'>
      <style jsx>{`
        .budgets {
          background: #e7dfdd;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
      <NavBar user={this.props.user} token={this.props.token} />
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

/**
 * Display list of all users budgets
 * 
 * Props: -token: String, User Auth Token
 * 
 * @param {Object} props
 * @api private
 */

function ListComp (props) {
  return async(getBudgets(props.token), ({data}) => {
    if (data) {
      const current = []
      data.map(budget => {
        if (budget.current) current.push(budget)
      })
      return (
        <div className='budget-list'>
          <style jsx>{`
            .budget-list {
              margin-top: 2rem;
            }
            .current, .list {
              margin: 0 2rem;
            }
          `}</style>
          <div className='current'>
            {current.map(current => {
                return <BudgetCard token={props.token} budget={current._id} title />
              })}
          </div>
          <div className='list'>
            <h3>All Budgets</h3>
            <hr />
            <ListGroup>
              {data.map(budget => {
                const progress = (budget.saved / budget.savings) * 100
                return (
                  <>
                    <ListGroupItemHeading>
                      {budget.name}
                    </ListGroupItemHeading>
                    <Progress value={progress} className='bg-bar' />
                    <ListGroupItemText>${budget.saved} saved of ${budget.savings}</ListGroupItemText>
                  </>
                )
              })}
            </ListGroup>
          </div>
        </div>
      )
    }
    else return <h1>Loading</h1>
  })
}

/**
 * Get User's Budgets
 * 
 * @param {String} token
 * @api private
 */

function getBudgets (token) {
  return fetch.get('/plans/single/budgets', token)
}