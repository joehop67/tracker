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
      `}</style>
      <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Tracker</NavbarBrand>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/login'>Login</NavLink>
              </NavItem>
            </Nav>
      </Navbar>
    </header>
  )
}