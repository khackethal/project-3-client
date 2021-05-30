import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'

import { baseUrl, memoriesPath } from '../../lib/api'
import { publicToken, mapboxStyleUrl } from '../../lib/mapbox'

function MemoryMap() {

  const [ searchTerm, setSearchTerm ] = useState(null)
  const [ selectedMemory, setSelectedMemory ] = useState(null)
  const [ memories, setMemories ] = useState(null)

  const [ isError, setIsError ] = useState(false)
  const isLoading = !memories && !isError

  //* For map content-------------------
  const [viewport, setViewport] = useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '100vh',
    height: '100vh',
    zoom: 6,
  })

  useEffect(() => {

    const getData = async () => {

      try {
        const res = await axios.get(`${baseUrl}${memoriesPath}`)
        setMemories(res.data)
        console.log(res.data.location.coordinates[0])

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])



  //* search functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const filteredMemories =  memories?.filter((memory) => {
    return (
      memory.title.toLowerCase().includes(searchTerm) ||
      memory.location.userInput.toLowerCase().includes(searchTerm) ||
      memory.date.includes(searchTerm) ||
      memory.tags.includes(searchTerm)
    )
  })
  return (
    <>
      { isLoading && <p>...loading</p>}
      { console.log('window.innerHeight: ', window.innerHeight) }
      { console.log('window.innerWidth: ', window.innerWidth) }

      <input
        className="input"
        type="text"
        placeholder="Search memories.."
        onChange={handleSearch}
        value={searchTerm || ''}
      />

      <div>

        <ReactMapGl {...viewport} 
          mapboxApiAccessToken={publicToken}
          mapStyle={mapboxStyleUrl}
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
        >

          { filteredMemories && filteredMemories.map(memory => 
            <Marker key={memory.title} latitude={Number(memory.location.coordinates[1])} longitude={Number(memory.location.coordinates[0])}>
              <button className="mapButton" onClick={e => {
                e.preventDefault()
                setSelectedMemory(memory) 
              }}
              >
                <img height="40px" width="40px" src="https://i.imgur.com/6IzPeVa.png" alt="red location pin"/>
              </button>
            </Marker>

          )}

          {selectedMemory && (
            <Popup latitude={Number(selectedMemory.location.coordinates[1])} longitude={Number(selectedMemory.location.coordinates[0])}
              // onClose={() => {
              //   setSelectedMemory(null) }}
            >
              <div>
                <h2>{selectedMemory.title}</h2>
                <p>{selectedMemory.location.userInput}</p>
                <Link to={`/memories/${selectedMemory._id}`}>
                  <img width="400px" height="400px" src={selectedMemory.image} alt={selectedMemory.title} />
                </Link>
                <br></br>
                <button onClick= { (e) => {
                  setSelectedMemory(null)
                }}>Close</button>
              </div>
            </Popup>
          )}
        </ReactMapGl>
      </div>
    </>
  )
}
export default MemoryMap