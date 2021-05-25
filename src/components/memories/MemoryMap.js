import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Error from '../auth/Error'


import { useRef, useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'

function MemoryMap() {
  const [ memories, setAllMemories ] = React.useState(null)
  const [ isError, setIsError ] = React.useState(false)
  const isLoading = !memories && !isError


  React.useEffect(() => {
    const getData = async () => {
      try { 
        const res = await axios.get('/api/memories')
        setAllMemories(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[])

  //* For map content-------------------
  const [ viewport, setViewport ] = useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '100vw',
    height: '100vh',
    zoom: 6,

  })

  const [ selectedMemory, setSelectedMemory ] = React.useState(null)



  
  return (
    <>

      <div>
        <ReactMapGl {...viewport} mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
        >

          { memories && memories.map(memory => 
            <Marker key={memory.name} latitude={Number(memory.latitude)} longitude={Number(memory.longitude)}>
              
              <button className="mapButton" onClick={ e  => {
                e.preventDefault()
                setSelectedMemory(memory) }} >

                <img height="40px" width="40px" src="http://assets.stickpng.com/thumbs/5888925dbc2fc2ef3a1860ad.png" alt="red location pin"/>
              </button>
            </Marker>
          
          )}

          { selectedMemory && (
            <Popup latitude={Number(selectedMemory.latitude)} longitude={Number(selectedMemory.longitude)}
              // onClose={() => {
              //   setSelectedMemory(null) }}
            >
              <div>
                <h2>{selectedMemory.title}</h2>
                <p>{selectedMemory.location}</p>

                <Link to={`/memories/${selectedMemory._id}`}>
                  <img width="400px" height="400px" src={selectedMemory.imageUrl} alt={selectedMemory.location} />
            
                </Link>
                <br></br>
                <button onClick={ e => {
                  e.preventDefault()
                  setSelectedMemory(null)
                }}>close</button>
              </div>
            </Popup>
          ) }      
        </ReactMapGl>
      </div>
    </>
  )
}


export default MemoryMap