import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../context/authContext'
import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  const newPasswordRef = useRef()
  const { replace } = useHistory()

  const { token } = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault()

    const password = newPasswordRef.current.value

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyARJaMZLR8ruq328Q0xewNMbcjFNExtlkU',
      {
        method: 'POST',
        body: JSON.stringify({
          method: 'POST',
          idToken: token,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).then((res) => replace('/'))
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
