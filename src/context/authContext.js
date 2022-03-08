import { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('auth'))
  const history = useHistory()

  const userIsLoggedIn = !!token

  const login = (token) => {
    setToken(token)
    localStorage.setItem('auth', token)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('auth')
    history.push('/')
  }

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
