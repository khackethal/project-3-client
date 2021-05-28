import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function Navbar() {

  const history = useHistory()
  const location = useLocation()

  const [isOpen, setIsOpen] = React.useState(false)
  const isLogged = isAuthenticated()

  React.useEffect( () => {
    setIsOpen(false)
  },[location.pathname])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (

    <nav className="navbar is-info">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="https://i.pinimg.com/originals/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.png" alt="logo"></img>
          </a>

          <span
            className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
            data-target="navbarMenuHeroB"
            onClick={handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>

        </div>
        <div
          id="navbarMenuHeroB"
          className={`navbar-menu ${isOpen ? 'is-active' : '' }`}
        >
          <div className="navbar-end">

            <a className="navbar-item">
              <Link to="/" >Home</Link>
            </a>

            <a className="navbar-item">
              <Link to="/newmemory" >New Memory</Link>
            </a>
            
            <a className="navbar-item">
              <Link to="/memories" >Memory Index</Link>
            </a>

            <a className="navbar-item">
              <Link to="/memories/map" >Memory Map</Link>
            </a>

            <a className="navbar-item">
              <Link to="/about" >About</Link> 
            </a>

            {!isLogged &&
              <a className="navbar-item">
                <Link to="/register" >Register</Link> 
              </a>
            }

            {!isLogged &&
              <a className="navbar-item">
                <Link to="/login" >Login</Link> 
              </a>
            }

            {isLogged &&
              <a
                className="navbar-item"
                onClick={handleLogout}
              >
                Logout
              </a>
            }

            <a className="navbar-item">
              <Link to="/api" >Api Test</Link> 
            </a>

          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
