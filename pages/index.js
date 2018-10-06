import React from 'react'
import { Jumbotron, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import jwt from 'jwt-decode'

export default class Homepage extends React.Component {
  constructor (props) {
    super(props)
  }

  static async getInitialProps ({req, res}) {
    const token = req.headers.cookie.split('token=')[1]
    const user = {user: jwt(token)}
    return user
  }

  render() {
    return (
      <div className='home'>
        <style jsx>{`
          .home {
            background: #e7dfdd;
            height: 100%;
          }
          .welcome {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to bottom, #b5bdc8 0%,#828c95 36%,#28343b 100%);
            padding: 2rem;
          }
          .centered {
            width: 75%;
          }
          h1 {
            font-weight: 400;
          }
          :global(.btn-container button) {
            margin-right: 2rem;
          }
          .section-card {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
        <Navbar />
        <div className='welcome'>
          <div className='centered'>
            <Jumbotron>
              <h1>Welcome to Tracker</h1>
              <hr className='my-2' />
              <p className='lead'>A tool that will hopefully be useful to at least myself</p>
              <div className='btn-container'>
                <Button>Try It Now</Button>
                <Button>See a demo</Button>
              </div>
            </Jumbotron>
          </div>
        </div>
        <div className='bottom-matter'>
          <BottomMatter />
        </div>
        <hr />
        <div className='section-card'>
          <Section />
        </div>
        <Footer />
      </div>
    )
  }
}

function BottomMatter (props) {
  return (
    <div className='container'>
      <style jsx>{`
          .row-head {
            text-align: center;
          }
          .row .col-sm {
            border-right: 1px solid #000;
            padding-top: 2rem;
          }
          .row .col-sm.nb {
            border-right: 0px;
          }
        `}</style>
      <div className='row'>
        <div className='col-sm'>
          <h1 className='row-head'>A tool for me</h1>
          <hr />
          This is a tool I built for my own use. Not to tell my life story,
          but I recently moved out on my own and as a "youngin" looking to start
          a life on his own, independantly, that also means I need to learn how to
          manage my finances on my own. Now, I learn everything using computers,
          and I love programming, so why not learn the only way I know how by
          programming my own financial tracker! What could possibly go wrong!
        </div>
        <div className='col-sm'>
          <h1 className='row-head'>A tool for you</h1>
          <hr />
          I mean, by all means use this too! If it's useful to me, it might be
          useful for you as well! If you do use it, be sure to let me know what
          you think and anything you'd like me to add or anything I need to fix.
          You can find the source code for everything on github at <a href='http://github.com/joehop67/tracker-web'>Tracker Web (frontend)</a> and
          <a href='http://github.com/joehop67/tracker-serve'>Tracker Serve (Backend)</a>. If you want to contribute,
          or use the code for anything you may need, please feel free to contribute and/or fork this project.
        </div>
        <div className='col-sm nb'>
          <h1 className='row-head'>A tool for us</h1>
          <hr />
          The entire point of this app was to make it easier for couples and groups
          to keep track of their finances! So if you and a group of friends or you and
          your significant other need a place to keep track of your money and budget and
          whatnot, then please do use this app! And give me feedback while you're at it!
        </div>
      </div>
    </div>
  )
}

function Section (props) {
  return (
    <div className='section'>
      <style jsx>{`
        .section {
          width: 318px;
          margin: 2rem;
        }  
      `}</style>
      <Card>
        <CardImg top width="100%" src="/static/planning.png" alt="Card image cap" />
        <CardBody>
          <CardTitle>Plan Smart</CardTitle>
          <CardSubtitle>Mind your budget</CardSubtitle>
          <CardText>This tool makes it easier to manage your finances and map your expenses with your budget</CardText>
          <Button>Try it now</Button>
        </CardBody>
      </Card>
    </div>
  )
}
