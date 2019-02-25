import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const LoginForm = ({
  handleSubmit,
  message,
  username,
  password,
  user,
  setUsername,
  setPassword
}) => {
  const { reset: resetUser, ...userInput } = useField('text', 'Username', username, setUsername)
  const { reset: resetPass, ...passInput } = useField('password', 'Password', password, setPassword)



  if (user === null) {

    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message}/>
        <form onSubmit={handleSubmit}>
          <div>
            käyttäjätunnus
            <input {...userInput} />
          </div>
          <div>
            salasana
            <input {...passInput}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return null
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm