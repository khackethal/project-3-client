import { useState, useRef, useCallback, useEffect } from 'react'
// import { useParams } from 'react-router-dom' 
import axios from 'axios'

// import mapboxgl from 'mapbox-gl'
import ReactMapGl, { FlyToInterpolator, WebMercatorViewport } from 'react-map-gl'
import { easeCubic } from 'd3-ease'

import Geocoder from 'react-map-gl-geocoder'





function ApiTest() {

  const [encodedAddress,setEncodedAddress] = useState('')
  const [boundaryBox, setBoundaryBox] = useState([[],[]])
  const [centerCoordinates, setCenterCoordinates] = useState([])

  const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const publicToken = 'pk.eyJ1IjoiZGF0YWJveSIsImEiOiJja3A1bzY3MTIwM3JoMm5vZm51bmM1Y3FuIn0.zPC8jQhM2p3S_pIpJIKa9Q'
  const endUrl = `.json?access_token=${publicToken}`

  const mapRef = useRef()



  //* Display map size, and position/zoom within the map
  const [ viewport, setViewport ] = useState({
    latitude: 54.405,
    longitude: 9.431,
    width: '500px',
    height: '500px',
    zoom: 2,
  })

  const handleChange = (e) => {
    const address = e.target.value
    setEncodedAddress(encodeURI(address))
  }

  // const handleSubmit = (e) => {

  //   e.preventDefault()

  //   try {
  //     const getData = async () => {

  //       const res = await axios.get(`${apiUrl}${encodedAddress}${endUrl}`)

  //       console.log('res.data: ', res.data)

  //       const centerLongitude = res.data.features[0].center[0]
  //       const centerLatitude = res.data.features[0].center[1]

  //       setCenterCoordinates([centerLongitude,centerLatitude])

  //       const minLongitude = res.data.features[0].bbox[0]
  //       const minLatitude = res.data.features[0].bbox[1]
  //       const maxLongitude = res.data.features[0].bbox[2]
  //       const maxLatitude = res.data.features[0].bbox[3]

  //       setBoundaryBox([[minLongitude, minLatitude], [maxLongitude, maxLatitude]])

  //       const setMap = () => {

  //         const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
  //           .fitBounds(boundaryBox, {
  //             padding: 20,
  //             offset: [0, -100],
  //           })

  //         setViewport({
  //           ...viewport,
  //           latitude: latitude,
  //           longitude: longitude,
  //           zoom: zoom,
  //           transitionDuration: 2000,
  //           transitionInterpolator: new FlyToInterpolator(),
  //           transitionEasing: easeCubic,
  //         })
  //       }
  //       setMap()
  //     }

  //     getData()

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleViewportChange = useCallback((viewport) => setViewport(viewport), [])



  const handleResult = (e) => {

    const centerLongitude = e.result.center[0]
    const centerLatitude = e.result.center[1]
    setCenterCoordinates([centerLongitude,centerLatitude])

    const minLongitude = e.result.bbox[0]
    const minLatitude = e.result.bbox[1]
    const maxLongitude = e.result.bbox[2]
    const maxLatitude = e.result.bbox[3]
    setBoundaryBox([[minLongitude, minLatitude], [maxLongitude, maxLatitude]])
  }

  
  return (
    <section>
      <>{console.log('centerCoordinates: ', centerCoordinates)}</>
      <>{console.log('boundaryBox: ', boundaryBox)}</>
      <div className="card">    
        <div className="columns">
          <div className="column">
            <div className="column">
              <p className="bd-notification is-info">

                {/* <form
                  className="column is-half is-offset-one-quarter"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="input"
                    type="text" 
                    name="searchAddress"
                    placeholder="e.g. Lincoln Memorial Circle NW"
                    onChange={handleChange}
                  />

                  <button className="button is-link">Search</button>

                </form> */}
                {/* 
                <Geocoder
                  accessToken={publicToken}
                  onSelect={handleChange}
                ></Geocoder> */}


                <ReactMapGl 
                  ref={mapRef}
                  {...viewport} 
                  mapboxApiAccessToken={publicToken}
                  // mapStyle="mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i"
                  onViewportChange={handleViewportChange}
                >
                  
                  <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={publicToken}
                    position="top-right"

                    onResult={handleResult}
                    // inputValue={handleInput}
                    // onKeyPress={handleKeyPress}
                  />

                  {/* <Marker 
                    longitude={}
                    latitude={} 
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

export default ApiTest