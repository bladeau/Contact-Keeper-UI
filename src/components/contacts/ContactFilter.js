import React, { useContext, useRef, useEffect } from 'react'
import {
  ContactContext,
  ContactDispatchContext,
} from '../../context/contact/contactContext'
import { CLEAR_FILTER, FILTER_CONTACTS } from '../../context/types'

const ContactFilter = () => {
  const dispatch = useContext(ContactDispatchContext)
  const { filtered } = useContext(ContactContext)
  const text = useRef('')

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  )
}

export default ContactFilter
