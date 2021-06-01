import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  React.useEffect(() => {
    console.log('HomePage mounted.')
  }, [])







  return (
    < section className="hero is-large">
      <div className="hero-head">
      </div>
      <div className="hero-body home-background">
      </div>

      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li className="is-active has-text-info">


                <Link to="/register" >Register</Link>

              </li>

              <li>
                {/* <div className="modal is-active">
                  <div className="modal-background"/>
                  <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">About</p>
                        <button className="delete" aria-label="close"></button>
                      </header>
                      <section className="modal-card-body">



                        A platform to connect with places and cities, through people.
                      <hr />
            Share memories, on a space-based platform, track down urban legends, ancestry, & much more.





                    </section>
                      <footer className="modal-card-foot">
                      </footer>
                    </div>
                  </div>
                </div> */}

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