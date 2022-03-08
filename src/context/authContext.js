import { createContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  return adjExpirationTime - currentTime
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('expirationTime')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 60000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')

    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
  }
}

let logoutTimer

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken()

  let initialToken
  if (tokenData) {
    initialToken = tokenData.token
  }
  const [token, setToken] = useState(initialToken)
  const history = useHistory()

  const userIsLoggedIn = !!token

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')

    history.push('/')

    if (logoutTimer) clearTimeout(logoutTimer)
  }, [])

  const login = (token, expirationTime) => {
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logout, remainingTime)
  }

  useEffect(() => {
    if (tokenData) logoutTimer = setTimeout(logout, tokenData.duration)
  }, [tokenData, logout])

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
