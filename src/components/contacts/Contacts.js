import React, { useContext } from 'react'
import { ContactContext } from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const { contacts, filtered } = contactContext

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>
  }

  return (
    <>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map((contact) => (
            // Mongo DB doesn't have id but _id
            <ContactItem key={contact._id} contact={contact} />
          ))}
    </>
  )
}

export default Contacts
