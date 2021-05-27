import React from 'react'
import axios from 'axios'
import Error from '../common/Error'
import { useParams } from 'react-router-dom' 
import ReactMapGl, { Marker } from 'react-map-gl'


import { useState } from 'react'

function ApiTest() {
  const [ memory, setSingleMemory ] = React.useState(null)
  const { id } = useParams()
  const [ isError, setIsError ] = React.useState(false)
  const isLoading = !memory && !isError
  const [ latitude, setLatitude ] = React.useState(null)
  const [ longitude, setLongitude ] = React.useState(null)

  

  //* For normal page content

  React.useEffect( () => {
    const getData = async () => {
      try {
        const result = await axios.get('http://open.mapquestapi.com/geocoding/v1/address?key=	kigSTGPns5XZHY23SQS8A2MRiDfG3FwM&location=london,uk')
        setSingleMemory(result.data)
        // console.log(result.data.results[0].locations[1].displayLatLng.lat)
        setViewport({ ...viewport, latitude: (Number(result.data.results[0].locations[1].displayLatLng.lat)), longitude: (Number(result.data.results[0].locations[1].displayLatLng.lng)) })
        setLatitude((result.data.results[0].locations[1].displayLatLng.lat))
        setLongitude((result.data.results[0].locations[1].displayLatLng.lng))
      } catch (err) {
        setIsError(true)
      }
    }
    getData()

  },[id])


  //* For map content-------------------
  const [ viewport, setViewport ] = useState({
    latitude: 54.405,
    longitude: 9.431,
    width: '500px',
    height: '500px',
    zoom: 10,

  })

  console.log('latitude', latitude)
  console.log('longitude', longitude)


  
  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>

          <div className="card">    
            <div className="columns">
              <div className="column">
                {/* <p className="column">{memory.title}</p>
                <h2 className="column">{memory.location}</h2>
                <div className="column is-60">{memory.description}</div>
                <div className="columns is-mobile">

                  <div className="column">
                    <p className="bd-notification is-info"> <img height ="540px" width="810px"  src={memory.imageUrl} alt={memory.name} /></p>
                  </div> */}

                {/* <input></input>
                  <button>Search</button>

                  <p>latitude ${}</p> */}

                <div className="column">
                  <p className="bd-notification is-info">
                    <ReactMapGl {...viewport} 
                      mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
                      mapStyle="mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i"
                      onViewportChange={viewport => {
                        setViewport(viewport)
                      }}
                    >

                      <Marker 
                        latitude={Number(latitude)} 
                        longitude={Number(longitude)}>
                        <div>
                          <img height="40px" width="40px" src="https://i.imgur.com/6IzPeVa.png" />
                        </div>
                      </Marker> 
                      

                    </ReactMapGl>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* </div>   */}
        </>
      )}


    </section>
  )
}

export default ApiTest