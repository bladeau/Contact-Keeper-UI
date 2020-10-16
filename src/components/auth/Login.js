import React, { useState, useContext, useEffect } from 'react'
import {
  AuthDispatchContext,
  AuthContext,
} from '../../context/auth/authContext'
import { AlertDispatchContext } from '../../context/alert/alertContext'
import { LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS } from '../../context/types'
import axios from 'axios'

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user
  const { dispatch, loadUser } = useContext(AuthDispatchContext)
  const setAlertDispatch = useContext(AlertDispatchContext)
  const { error, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'Invalid Credentials') {
      setAlertDispatch(error, 'danger')
      dispatch({ type: CLEAR_ERRORS })
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const loginDispatch = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post('api/auth', formData, config) // Proxy value in package.json so no need for localhost:5000
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlertDispatch('Please fill in all fields', 'danger')
    } else {
      loginDispatch({ email, password })
    }
  }
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </form>
      </h1>
    </div>
  )
}

export default Login
