import React from 'react'
import axios from 'axios'
import Error from '../auth/Error.js'
import { useParams } from 'react-router-dom' 

 

import { useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDFnb2tsdDA4YXgydW90cXpjY2Fyc2oifQ.hMGNb-QI2MKxWxTRBNOIBg'

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

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[id])



  //* For map content-------------------

  //* For map component
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  // initial mount
  React.useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  // move map
  React.useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })


  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>
          <h1>{memory.title}</h1>
          <h2>{memory.location}</h2>
          <p>{memory.description}</p>
          <img height ="540px" width="810px"  src={memory.imageUrl} alt={memory.name} />

          <div>
            <div className="sidebar"> nope
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
          </div>
        </>
      )}


    </section>
  )
}

export default SingleMemory