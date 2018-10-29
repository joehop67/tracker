import React from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import machine from 'react-states-machine'

export default class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      conf: false,
      salary: ''
    }
  }
  
  /**
   * Register User
   * 
   * @param {FormData} data
   * @api private
   */

  multiStep = (data) => {
    axios.post('http://localhost:4000/auth/register', data).then(res => {
        if (res.data.error) {
          console.log('error')
        } else {
          const token = res.data
          document.cookie = `token=${token};path=/;`
          document.location = '/profile/user'
        }
      })
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
              <SignForm onDone={data => this.multiStep(data)} />
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
 * User registration form
 * 
 * Users must enter their email, password, name, and salary
 * in order to register
 * 
 * Props: -onDone: function, run when form is completed
 * 
 * @param {Object} props
 * @api private
 */

function SignForm (props) {
  const {onDone} = props
  return (
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
        'email': [
          props => {
            return (
              <form onSubmit={(e) => {
                e.preventDefault()
                props.transition('check', e.target)
              }}>
                <h5>Please enter your desired email and password</h5>
                <input name='email' type='email' placeholder='Email' required />
                <input name='password' type='password' placeholder='password' required />
                <Button>Submit</Button>
              </form>
            )
          }, {
            'check': [
              (prev, target) => {
                const email = target.email.value
                const data = new FormData(target)
                return {data: data, email: email}
              }, 'name'
            ]
          }
        ],
        'name': [
          props => {
            return (
              <form onSubmit={(e) => {
                e.preventDefault()
                const {data} = props
                data.set('name', e.target.name.value)
                data.set('salary', e.target.salary.value)
                onDone(data)
              }}>
                <h5>{props.email} just needs a name and a salary to finish up</h5>
                <input type='text' name='name' placeholder='Name' required />
                <input type='number' name='salary' placeholder='1234' required />
                <button>Submit</button>
              </form>
            )
          }
        ]
      }, props)}
    </div>
  )
}
