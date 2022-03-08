import { createContext, useState } from 'react'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const userIsLoggedIn = !!token

  const login = (token) => {
    setToken(token)
  }

  const logout = () => {
    setToken(null)
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
