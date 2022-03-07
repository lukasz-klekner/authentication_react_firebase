import { useState, useRef } from 'react'

import classes from './AuthForm.module.css'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    setIsLoading(true)
    if (isLogin) {
    } else {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARJaMZLR8ruq328Q0xewNMbcjFNExtlkU`,
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        setIsLoading(false)
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!'

            alert(errorMessage)
          })
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
