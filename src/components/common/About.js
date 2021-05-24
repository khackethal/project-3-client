import React from 'react'

function About() {
  React.useEffect(() => {
    console.log('The About Page has mounted')
  }, [])

  return (
    <section className="hero is-info is-fullheight-with-navbar is-danger">
      <div className="hero-body has-text-centered">
        <div className="container">
          <p className="title">
            About
            <hr />

            Through encourageing sharing memories on a space-based platform, this initiative aims to connect strangers. Users can upload fond memories assigned to where they took place, and discover new places, and the histories of people around them. It is the place to track down ancestry, anecdotes, and much, much more.
            <hr /> A platform to connect with a place or city more genuine and raw than ever before seen.

            {/* Our purpose : return the humanity to austere urban landscapes, allowing people to share meaningful personal experiences on a map. People will be able to tag a place on a map and upload a personal experience related to said place. Other people will be able to comment on the experiences. The experience will be tagged with the type of experience but more importantly the time of the experience, creating a time travelling google map. Users can search by location, type and time, creating an alternate travel guide for the curious. */}
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
