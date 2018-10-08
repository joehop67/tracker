import React from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import NavBar from '../components/navbar'
import Footer from '../components/footer'

export default class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      conf: false
    }
  }
  
  registration = (target) => {
    if (this.state.conf) {
      const data = new FormData(target)
      axios.post('http://localhost:4000/auth/register', data).then(res => {
        if (res.data.error) {
          console.log('error')
        } else {
          const token = res.data
          document.cookie = `token=${token};path=/;`
          document.location = '/'
        }
      })
    }
  }

  render () {
    return (
      <div className='register'>
        <style jsx>{`
          .register {
            height: 100%;
            background: #e7dfdd;
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
          }
          .form {
            background: #B0B0B0;
            padding: 5rem 2rem;
            border-radius: .25rem;
            box-shadow: 16px 1px 27px -7px rgba(0,0,0,0.43);
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
          form > input.match:focus {
            outline:none; 
            border:1px solid green;
            box-shadow: 0px 0px 5px green;
          }
          form > input.match {
            outline:none; 
            border:1px solid green;
          }
        `}</style>
        <NavBar />
        <div className='page'>
          <div className='login'>
            <div className='form'>
              <h3>Sign up</h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                this.registration(e.target)
              }}>
                <input name='email' type='text' placeholder='Email' required />
                <input name='password' type='password' placeholder='Password' onChange={(e) => {
                  if (e.target.value.length > 8) {
                    this.setState({password: e.target.value})
                  }
                }} required />
                <input type='password' className={this.state.conf && 'match'} placeholder='Confirm Password' onChange={(e) => {
                  if (e.target.value === this.state.password) {
                    this.setState({conf: true})
                  } else {
                    this.setState({conf: false})
                  }
                }} required />
                <Button type='submit'>Login</Button>
              </form>
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