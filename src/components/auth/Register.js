import React, { useState, useContext, useEffect } from 'react'
import { AlertDispatchContext } from '../../context/alert/alertContext'
import {
  AuthContext,
  AuthDispatchContext,
} from '../../context/auth/authContext'
import {
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../../context/types'
import axios from 'axios'

const Register = (props) => {
  const setAlertDispatch = useContext(AlertDispatchContext)
  const { dispatch, loadUser } = useContext(AuthDispatchContext)
  const { error, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'User already exists') {
      setAlertDispatch(error, 'danger')
      dispatch({ type: CLEAR_ERRORS })
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = user

  const registerDispatch = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post('api/users', formData, config) // Proxy value in package.json so no need for localhost:5000
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlertDispatch('Please enter all fields', 'danger')
    } else if (password !== password2) {
      setAlertDispatch('Passwords do not match', 'danger')
    } else {
      registerDispatch({
        name,
        email,
        password,
      })
    }
  }
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' value={name} onChange={onChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required // html version of validation
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              minLength='6' // html version of validation
              required // html version of validation
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Confirm Password</label>
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required // html version of validation
              minLength='6' // html version of validation
            />
          </div>
          <input
            type='submit'
            value='Register'
            className='btn btn-primary btn-block'
          />
        </form>
      </h1>
    </div>
  )
}

export default Register
