import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import {
  ContactContext,
  ContactDispatchContext,
} from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'
import { GET_CONTACTS, CONTACT_ERROR } from '../../context/types'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const dispatch = useContext(ContactDispatchContext)
  const { contacts, filtered, loading } = contactContext

  useEffect(() => {
    getContacts()
    //eslint-disable-next-line
  }, [])

  const getContacts = async () => {
    try {
      //Update Database
      const res = await axios.get('/api/contacts')
      //Update Context State based on response from server (the new record)
      dispatch({ type: GET_CONTACTS, payload: res.data })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }

  return (
    <>
      {contacts !== null && !loading ? (
        <>
          {' '}
          {filtered !== null
            ? filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                // Mongo DB doesn't have id but _id
                <ContactItem key={contact._id} contact={contact} />
              ))}{' '}
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Contacts
