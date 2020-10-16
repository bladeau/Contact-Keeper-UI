import React, { useContext, useEffect } from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import { AuthDispatchContext } from '../../context/auth/authContext'

const Home = () => {
  const { loadUser } = useContext(AuthDispatchContext)

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
