import React, { useState, useContext } from 'react'
import { AlertDispatchContext } from '../../context/alert/alertContext'

const Register = () => {
  const setAlertDispatch = useContext(AlertDispatchContext)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = user

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlertDispatch('Please enter all fields', 'danger')
    } else if (password !== password2) {
      setAlertDispatch('Passwords do not match', 'danger')
    } else {
      console.log('register submit')
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
