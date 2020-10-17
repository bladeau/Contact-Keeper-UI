import React, { useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { ContactDispatchContext } from '../../context/contact/contactContext'
import {
  CLEAR_CURRENT,
  DELETE_CONTACT,
  SET_CURRENT,
  CONTACT_ERROR,
} from '../../context/types'

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact

  const dispatch = useContext(ContactDispatchContext)

  const onDelete = async () => {
    try {
      await axios.delete(`/api/contacts/${_id}`)

      dispatch({
        type: DELETE_CONTACT,
        payload: _id,
      })

      clearCurrent()
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}
export default ContactItem
