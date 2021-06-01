import React from 'react'

function About() {
  React.useEffect(() => {
    console.log('The About Page has mounted')
  }, [])

  return (
    
    <section className="hero is-info is-fullheight-with-navbar about-background">
             <div className="title is-2 has-text-centered has-background-black has-text-white">about</div>
      <div className="hero-body has-text-centered">
        <div className="columns about">
          <div className="column is-6 has-background-black ">
            
           

            A platform to connect with places and cities, through people. 
            <hr/>
            Share memories, on a space-based platform, track down urban legends, ancestry, & much more.
           



          
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
