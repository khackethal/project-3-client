import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function Navbar() {

  const [isOpen, setIsOpen] = React.useState(false)
  const isLogged = isAuthenticated()

  // React.useEffect({

  // },[])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    removeToken()
  }

  return (

    <nav className="navbar is-info">
      <>{console.log('isLogged: ', isLogged)}</>
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <Link to="/" ><img src="https://i.pinimg.com/originals/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.png" alt="logo"></img> </Link>
          </a>

          <span
            className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
            data-target="navbarMenuHeroB"
            onClick={handleClick}
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
              <Link to="/memories" >Memory Index</Link>
            </a>

            <a className="navbar-item">
              <Link to="/newmemory" >New Memory</Link>
            </a>

            <a className="navbar-item">
              <Link to="/memories/map" >Memory Map</Link>
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
              <a className="navbar-item">
                <Link
                  onClick={handleLogout}
                  to="/"
                >
                  Logout
                </Link> 
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
