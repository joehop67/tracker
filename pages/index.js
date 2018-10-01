import React from 'react'
import { Jumbotron, Navbar, NavbarBrand, NavItem, NavLink, Nav, Button} from 'reactstrap'

export default class Homepage extends React.Component {
  render() {
    return (
      <div className='home'>
        <style jsx>{`
          .home {
            background: #e7dfdd;
            height: 100%;
          }
          :global(nav.navbar) {
            flex-direction: row;
          }
          :global(ul.navbar-nav) {
            flex-direction: row;
          }
          :global(li.nav-item) {
            margin-left: 2rem;
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
        `}</style>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Tracker</NavbarBrand>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Login</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
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
        <BottomMatter />
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
