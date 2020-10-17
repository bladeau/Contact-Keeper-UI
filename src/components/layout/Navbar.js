import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  AuthContext,
  AuthDispatchContext,
} from '../../context/auth/authContext'

import { LOGOUT, CLEAR_CONTACTS } from '../../context/types'

import { ContactDispatchContext } from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const { dispatch: dispatchAuth } = useContext(AuthDispatchContext)

  const dispatchContacts = useContext(ContactDispatchContext)

  const clearContacts = () => {
    dispatchContacts({ type: CLEAR_CONTACTS })
  }

  const logout = () => {
    dispatchAuth({ type: LOGOUT })
    clearContacts()
  }

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  )

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> Contact Keeper
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
}
export default Navbar
