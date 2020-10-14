import React, { useReducer } from 'react'
import { ContactContext, ContactDispatchContext } from './contactContext'
import contactReducer from './contactReducer'

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'professional',
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'Sara@gmail.com',
        phone: '222-111-1111',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'Harry@gmail.com',
        phone: '333-111-1111',
        type: 'professional',
      },
      {
        id: 4,
        name: 'abc test',
        email: 'abc@gmail.com',
        phone: '444-111-1111',
        type: 'personal',
      },
      {
        id: 5,
        name: 'efg test',
        email: 'efg@gmail.com',
        phone: '555-111-1111',
        type: 'personal',
      },
    ],
    current: null,
    filtered: null,
  }
  const [state, dispatch] = useReducer(contactReducer, initialState)

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
      }}
    >
      <ContactDispatchContext.Provider value={dispatch}>
        {props.children}
      </ContactDispatchContext.Provider>
    </ContactContext.Provider>
  )
}

export default ContactState
