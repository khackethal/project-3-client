import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  React.useEffect(() => {
    console.log('HomePage mounted.')
  }, [])

  return (
    < section className="hero is-info is-large">
      <div className="hero-head">
      </div>


      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title">
            MemoryMap
          </p>
          <p className="subtitle">
            A spatial log of your cherished memories
          </p>
        </div>
      </div>

      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li className="is-active has-text-info">
                <a className="navbar-item">
                  <Link to="/register" >Register</Link>
                </a>
              </li>
              <li>
                <a className="navbar-item">
                  <Link to="/about" >About</Link>
                  {/* About */}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section >
  )
}

export default Home