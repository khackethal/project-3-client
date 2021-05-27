import React from 'react'
import axios from 'axios'
import Error from '../common/Error'
import { useParams } from 'react-router-dom' 
import ReactMapGl, { Marker } from 'react-map-gl'


import { useState } from 'react'

function SingleMemory() {
  const [ memory, setSingleMemory ] = React.useState(null)
  const { id } = useParams()
  const [ isError, setIsError ] = React.useState(false)
  const isLoading = !memory && !isError

  

  //* For normal page content

  React.useEffect( () => {
    const getData = async () => {
      try {
        const result = await axios.get(`/api/memories/${id}`)
        setSingleMemory(result.data)
        setViewport({ ...viewport, latitude: (Number(result.data.latitude)), longitude: (Number(result.data.longitude)) })

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[id])


  //* For map content-------------------
  const [ viewport, setViewport ] = useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '500px',
    height: '500px',
    zoom: 12,

  })



  
  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>
          {/* // version 1 - unstyled */}
          {/* <div className="card">
            <div className="column">
              <p className="bd-notification-">{memory.title}</p>
              <h2>{memory.location}</h2>
            
              <div className="container">
              <div className="column is-half">
                <p>{memory.description}</p>
              </div>

              <div className="column is-half">
                <img height ="540px" width="810px"  src={memory.imageUrl} alt={memory.name} />
              </div>
              </div>

              <div>
                <ReactMapGl {...viewport} mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
                  onViewportChange={viewport => {
                    setViewport(viewport)
                  }}
                >

                  <Marker latitude={Number(memory.latitude)} longitude={Number(memory.longitude)}>
                    <div>
                      <img height="40px" width="40px" src="https://i.imgur.com/6IzPeVa.png" />
                    </div>
                  </Marker>
                    

                </ReactMapGl>
              </div>
            </div>
          </div> */}
{/* 
        // version 2 - basic styling added */}
          <div className="card">    
            <div className="columns">
              <div className="column">
                <p className="column">{memory.title}</p>
                <h2 className="column">{memory.location}</h2>
                <div className="column is-60">{memory.description}</div>
                <div className="columns is-mobile">

                  <div className="column">
                    <p className="bd-notification is-info"> <img height ="540px" width="810px"  src={memory.imageUrl} alt={memory.name} /></p>
                  </div>

                  <div className="column">
                    <p className="bd-notification is-info">
                      <ReactMapGl {...viewport} 
                        mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
                        mapStyle="mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i"
                        onViewportChange={viewport => {
                          setViewport(viewport)
                        }}
                      >

                        <Marker latitude={Number(memory.latitude)} longitude={Number(memory.longitude)}>
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
          </div>  
        </>
      )}


    </section>
  )
}

export default SingleMemory