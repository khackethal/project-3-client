import { useState, useRef, useCallback } from 'react'
import ReactMapGl from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

function MapGeocoder() {

  const publicToken = 'pk.eyJ1IjoiZGF0YWJveSIsImEiOiJja3A1bzY3MTIwM3JoMm5vZm51bmM1Y3FuIn0.zPC8jQhM2p3S_pIpJIKa9Q'
  const mapRef = useRef()

  //* Display map size, and position/zoom within the map
  const [ viewport, setViewport ] = useState({
    latitude: 54.405,
    longitude: 9.431,
    width: '500px',
    height: '500px',
    zoom: 2,
  })

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport),
    []
  )

  const handleResult = (e) => {
    console.log('e: ', e)
  }
  
  return (
    <section>
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

                  {/* <Marker 
                    longitude={longitude}
                    latitude={latitude} 
                  >
                    <div>
                      <img height="40px" width="40px" src="https://i.imgur.com/6IzPeVa.png" />
                    </div>
                  </Marker>  */}

                </ReactMapGl>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default MapGeocoder