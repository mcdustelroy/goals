import React, { useContext } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

const Header = ({toast}) => {
  const { logout, login, reset, state: { user } } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    reset()
    navigate('/')
    toast('You are now logged out', {position: toast.POSITION.TOP_CENTER})
  }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Goalsetter</Link>
        </div>
        <ul>
            {user ?
            <li>
              <button className='btn' onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            : 
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
            } 
      </ul>
    </header>
  )
}

export default Header 