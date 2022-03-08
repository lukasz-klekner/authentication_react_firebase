import { Link } from 'react-router-dom'
import { useContext } from 'react'

import AuthContext from '../../context/authContext'
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
