import React, { useReducer } from 'react'
import { AuthContext, AuthDispatchContext } from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'

import { USER_LOADED, AUTH_ERROR, LOGOUT } from '../types'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  }

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth')

      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
      }}
    >
      <AuthDispatchContext.Provider value={{ dispatch, loadUser }}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

export default AuthState
