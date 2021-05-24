import React from 'react'


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
              <li className="is-active">
                <a>Memory Index</a>
              </li>  
              <li>
                <a>About</a>  
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section >
  )
}

export default Home