import React from 'react'
import ReactMapGl from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

function MapboxSearch() {

  const publicToken = 'pk.eyJ1IjoiZGF0YWJveSIsImEiOiJja3A1bzY3MTIwM3JoMm5vZm51bmM1Y3FuIn0.zPC8jQhM2p3S_pIpJIKa9Q'
  const mapRef = React.useRef()

  //* Display map size, and position/zoom within the map
  const [ viewport, setViewport ] = React.useState({
    latitude: 54.405,
    longitude: 9.431,
    width: '500px',
    height: '500px',
    zoom: 2,
  })

  const handleViewportChange = React.useCallback(
    (viewport) => setViewport(viewport),
    []
  )

  const handleResult = (e) => {
    console.log('handleResult: ')
    console.log(e)
  }

  return (

    <section className="geocoder">
      <div className="card">    
        <div className="columns">
          <div className="column">
            <div className="column">
              <p className="bd-notification is-info">

                <ReactMapGl 
                  ref={mapRef}
                  {...viewport} 
                  mapboxApiAccessToken={publicToken}
                  onViewportChange={handleViewportChange}
                >
                  <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={publicToken}
                    position="top-left"
                    onResult={handleResult}
                  />

                </ReactMapGl>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default MapboxSearch