import React from 'react'
import {Navbar, NavbarBrand, NavItem, NavLink, Nav} from 'reactstrap'

export default (props) => {
  return (
    <header>
      <style jsx>{`
        :global(nav.navbar) {
          flex-direction: row;
        }
        :global(ul.navbar-nav) {
          flex-direction: row;
        }
        :global(li.nav-item) {
          margin-left: 2rem;
        }
        .nav {
          display: flex;
          flex-direction: row;
        }
      `}</style>
      <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Tracker</NavbarBrand>
            <Nav className='ml-auto' navbar>
              {props.user
              ? <NavItem>
                  <NavLink onClick={() => {
                    document.cookie = 'token=;expires=0;'
                    document.location = '/'
                  }}>Logout</NavLink>
                </NavItem>
              : <span className='nav'>
                  <NavItem>
                    <NavLink href='/register'>Sign Up</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href='/login'>Login</NavLink>
                  </NavItem>
                </span>}
            </Nav>
      </Navbar>
    </header>
  )
}