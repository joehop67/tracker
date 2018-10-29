/**
 * Dependencies
 */
import React from 'react'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import jwt from 'jwt-decode'
import fetch from '../../util/fetch'
import machine from 'react-states-machine'
import async from '../../util/async'
import {Button} from 'reactstrap'

/**
 * Create Budget page
 * 
 * @api public
 */

export default class CreateBudget extends React.Component {
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

  /**
   * Create Budget from form
   * 
   * @param {FormData} data
   * @param {String} token
   * @api private
   */

  createBudget = (data, token) => {
    fetch.post('/plans/single/new/budget', data, token).then(res => {
      document.location = '/profile/user'
    })
  }

  render () {
    return (
      <div className='budget'>
        <style jsx>{`
          .budget {
            background: #e7dfdd;
            height: 100%;
            overflow: hidden; 
          }
          .page {
            display: flex;
            position: absolute;
            width: 100%;
            align-items: center;
            justify-content: center;
            top: 3.5rem;
            bottom: 2rem;
            background: #e7dfdd;
            z-index: 9998;
          }
          .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #e7dfdd;
          }
          .form {
            background: #b0b0b0;
            padding: 5rem 2rem;
            border-radius: .25rem;
            box-shadow: 16px 1px 27px -7px rgba(0,0,0,0.43);
          }
        `}</style>
        <NavBar user={this.props.user} token={this.props.token} />
        <div className='page'>
          <div className='form'>
            <CreateBudgetForm user={this.props.user} token={this.props.token} onDone={data => {
              this.createBudget(data, this.props.token)
            }}/>
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
 * Budget Creation Form
 * 
 * Multistep form to create a budget
 * 
 * Props: -User: Object, User Object
 *        -onDone: Function, Run onDone when user finishes form
 * 
 * @param {Object} attrs (props)
 * @api private
 */

function CreateBudgetForm (attrs) {
  const {user, onDone} = attrs
  return async(getUserInfo(user.id, attrs.token), ({data}) => {
    if (data) return (
      <div>
        <style jsx>{`
          form {
            display: flex;
            flex-direction: column;
          }  
          form > input {
            margin-bottom: 1rem;
            border-radius: .25rem;
            height: 2rem;
            border: 0;
          }
        `}</style>
        {machine({
          'name': [
            props => {
              return (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  props.transition('next', e.target)
                }}>
                  <h5>Hey {data.user.name.split(' ')[0]}, about to make a budget?</h5>
                  <h5>Enter the name of your budget below to get started</h5>
                  <input type='text' name='name' placeholder='Ex. Saving for Hawai' />
                  <Button>Next</Button>
                </form>
              )
            }, {
              'next': [
                (prev, target) => {
                  const name = target.name.value
                  const data = new FormData(target)
                  return {data: data, name: name}
                }, 'savings'
              ]
            }
          ],
          'savings': [
            props => {
              return (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const {data} = props
                  data.set('savings', e.target.savings.value)
                  props.transition('final', data)
                }}>
                  <h5>Okay, it's time to start budgeting!</h5>
                  <h5>How much are you trying to save for {props.name}?</h5>
                  <input type='number' name='savings' placeholder='5000' />
                  <Button>Next</Button>
                </form>
              )
            }, {
              'final': [
                (prev, data) => {
                  return {data: data}
                }, 'expenses'
              ]
            }
          ],
          'expenses': [
            props => {
              return (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const {data} = props
                  onDone(data)
                }}>
                  <h5>Now it's time to add some expenses</h5>
                  <h5>Those pesky little things we're forced to spend money on</h5>
                  <h5>Add some from the list below</h5>
                  <input placeholder='placeholder' />
                  <Button>Finish</Button>
                </form>
              )
            }
          ]
        })}
      </div>
    )
    else return <h1>Loading</h1>
  })
}

/**
 * Get user info
 * 
 * @param {String} id - User ID
 * @param {String} token
 * @api private
 */

function getUserInfo (id, token) {
  return fetch.get('/users/' + id, token)
}