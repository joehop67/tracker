/**
 * Dependencies
 */
import React from 'react'
import {Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
DropdownItem} from 'reactstrap'

/**
 * NavBar component
 * 
 * Displays dropdown menu in right corner if user is logged in
 * if not, displays sign up and login links
 * 
 * Props: User: Object, user object for dropdown menu
 * 
 * @param {Object} props
 * @api public
 */

export default (props) => {
  return (
    <header>
      <style jsx>{`
        :global(nav.navbar) {
          flex-direction: row;
        }
        :global(.dropdown-menu) {
          z-index: 9999;
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
              ? <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {props.user.current_user}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <a href='/profile/user'>Profile</a>
                    </DropdownItem>
                    <DropdownItem>
                      <a href='/budgets'>Budgets</a>
                    </DropdownItem>
                    <DropdownItem>
                      Expenses
                    </DropdownItem>
                    <DropdownItem>
                      Groups
                    </DropdownItem>
                    <DropdownItem>
                      Requests
                    </DropdownItem>
                    <DropdownItem>
                      Partner
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => {
                      document.cookie = 'token=;expires=0;path=/;'
                      document.location = '/'
                    }}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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