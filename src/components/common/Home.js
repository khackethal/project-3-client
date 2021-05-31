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
      <div className="hero-body home-background">
        <div className="container has-text-centered">
          <p className="title">
            MemoryMap
          </p>
          <p className="subtitle">
            A spatial log for your cherished memories
          </p>
        </div>
      </div>

      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li className="is-active has-text-info">


                <Link to="/register" >Register</Link>

              </li>
              <li>

                <Link to="/about" >About</Link>

              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section >
  )
}

export default Home