import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function Navbar() {

  const history = useHistory()
  const location = useLocation()

  const [isOpen, setIsOpen] = React.useState(false)
  const isLogged = isAuthenticated()

  React.useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  const getHeight = (e) => {
    const navHeight = e.nativeEvent.path[4].offsetHeight
    localStorage.setItem('navHeight', JSON.stringify(navHeight))
  }


  return (

    <nav
      className="navbar is-info"
      onLoad={getHeight}
    >

      <div className="container">

        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src="https://i.imgur.com/48rU2yo.png" alt="logo"></img>
          </Link>

          <div className="container has-text-centered">
            <p className="title ">
              memory.map
            </p>

          </div>

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
          className={`navbar-menu ${isOpen ? 'is-active' : ''}`}
        >


          <Link to="/memories" className="navbar-item">
            Memory Index
          </Link>

          {isLogged &&
            <Link to="/newmemory" className="navbar-item">
              New Memory
            </Link>
          }

          <Link to="/memories/map" className="navbar-item">
            Map
          </Link>


          {!isLogged &&
            <Link to="/register" className="navbar-item">
              Register
            </Link>
          }

          {!isLogged &&
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          }

          {isLogged &&
            <Link
              to="/"
              className="navbar-item"
              onClick={handleLogout}
            >
              Logout
            </Link>
          }

        </div>
      </div>
    </nav>
  )
}
export default Navbar
