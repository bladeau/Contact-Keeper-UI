import React, { useReducer } from 'react'
import { ContactContext, ContactDispatchContext } from './contactContext'
import contactReducer from './contactReducer'

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    errors: null,
  }
  const [state, dispatch] = useReducer(contactReducer, initialState)

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
      }}
    >
      <ContactDispatchContext.Provider value={dispatch}>
        {props.children}
      </ContactDispatchContext.Provider>
    </ContactContext.Provider>
  )
}

export default ContactState
