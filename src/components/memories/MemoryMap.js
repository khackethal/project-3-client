import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'

import { baseUrl, memoriesPath } from '../../lib/api'
import { publicToken, mapboxStyleUrl } from '../../lib/mapbox'

function MemoryMap() {

  const [ searchTerm, setSearchTerm ] = React.useState(null)
  const [ selectedMemory, setSelectedMemory ] = React.useState(null)
  const [ memories, setMemories ] = React.useState(null)

  const [ inputHeight, setInputHeight ] = React.useState(40)

  const navHeight = JSON.parse(localStorage.getItem('navHeight'))
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight - (navHeight + inputHeight)

  const [ isError, setIsError ] = React.useState(false)
  const isLoading = !memories && !isError

  //* For map content-------------------
  const [viewport, setViewport] = React.useState({
    latitude: 50,
    longitude: 0,
    width: viewportWidth,
    height: viewportHeight,
    zoom: 0,
  })

  function handleResize() {

    const newWidth = window.innerWidth
    const newHeight = window.innerHeight - (navHeight + inputHeight)

    setViewport({ ...viewport,
      width: newWidth,
      height: newHeight,
    })
  }

  React.useEffect(() => {

    window.addEventListener('resize', handleResize)

    const getData = async () => {

      try {
        const res = await axios.get(`${baseUrl}${memoriesPath}`)
        setMemories(res.data)
        // console.log(res.data.location.coordinates[0])

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport])


  //* search functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const getInputHeight = (e) => {
    const inputHeight = e.nativeEvent.path[1].offsetHeight
    setInputHeight(inputHeight)
  }
  
  // ! problem with this function. memories coming in but not coming out, therefore no pins being displayed
  const filteredMemories =  memories?.filter((memory) => {
    return (
      memory.title.toLowerCase().includes(searchTerm) ||
      // ! disbaled the line below to bypass error and display map
      // memory.location.toLowerCase().includes(searchTerm) ||
      memory.location.userInput.toLowerCase().includes(searchTerm) ||
      memory.date.includes(searchTerm) ||
      memory.tags.includes(searchTerm)
    )
  })

  return (
    <>
      { isLoading && <p>...loading</p>}
      {console.log('filteredMemories: ', filteredMemories)}

      <div onFocus={getInputHeight}>
        <input
          className="input"
          type="text"
          placeholder="Search memories.."
          onChange={handleSearch}
          value={searchTerm || ''}
        />
      </div>


      <div onClick={handleResize}>

        <ReactMapGl {...viewport} 
          mapboxApiAccessToken={publicToken}
          // mapStyle={mapboxStyleUrl}
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
        >

          { filteredMemories && filteredMemories.map(memory => {
            {console.log('memory: ', memory)}
            <Marker
              key={memory._id}
              latitude={memory.location.coordinates[1]}
              longitude={memory.location.coordinates[0]}
            >
              
              <button
                className="mapButton"
                onClick={ (e) => {
                  e.preventDefault()
                  setSelectedMemory(memory) 
                }}
              >
                <img
                  height="40px"
                  width="40px"
                  src="https://i.imgur.com/6IzPeVa.png"
                  alt="red location pin"
                />
              </button>
            </Marker>
          }

          )}

          {selectedMemory && (
            <Popup
              latitude={selectedMemory.location.coordinates[1]}
              longitude={selectedMemory.location.coordinates[0]}
            >

              <div>
                <h2>{selectedMemory.title}</h2>
                <p>{selectedMemory.location.userInput}</p>

                <Link to={`${memoriesPath}/${selectedMemory._id}`}>
                  <img
                    width="400px"
                    height="400px"
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                  />
                </Link>

                <br></br>

                <button
                  onClick= { () => {
                    setSelectedMemory(null)
                  }}>
                    Close
                </button>

              </div>

            </Popup>

          )}

        </ReactMapGl>

      </div>

    </>
  )
}
export default MemoryMap