// Dependencies
import React from 'react'
import {Button} from 'reactstrap'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import axios from 'axios'
import fetch from '../util/fetch'

/**
 * Login Page Component
 */
export default class LoginPage extends React.Component {
  /**
   * Login form - Logs user in
   * TODO: Error Handling
   * 
   * @param {Object} target
   * @api private
   */
  loginForm = (target) => {
    const data = new FormData(target)
    fetch.post('/auth/login', data).then(res => {
      document.cookie = `token=${res.data};path=/;`
      document.location = '/profile/user'
    })
    // axios.post('http://localhost:4000/auth/login', data).then(res => {
    //   document.cookie = `token=${res.data};path=/;`
    //   document.location = '/profile/user'
    // })
  }

  render () {
    return (
      <div className='content'>
        <style jsx>{`
            .content {
              height: 100%;
              background: #e7dfdd;
            }
            .form {
              background: #B0B0B0;
              padding: 5rem 2rem;
              border-radius: .25rem;
              box-shadow: 16px 1px 27px -7px rgba(0,0,0,0.43);
            }
            .login {
              display: flex;
              position: absolute;
              width: 100%;
              background: #e7dfdd;
              align-items: center;
              justify-content: center;
              top: 3.5rem;
              bottom: 2rem;
            }
            .footer {
              position: absolute;
              bottom: 0;
              width: 100%;
              background: #e7dfdd;
            }
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
        <Navbar />
        <div className='login'>
          <div className='form'>
            <h3>Login Now</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              this.loginForm(e.target)
            }}>
              <input name='email' type='text' placeholder='Email' />
              <input name='password' type='password' placeholder='Password' />
              <Button type='submit'>Login</Button>
            </form>
          </div>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    )
  }
}