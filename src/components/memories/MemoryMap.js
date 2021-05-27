import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'

function MemoryMap() {
  
  const [ memories, setAllMemories ] = useState(null)
  const [ isError, setIsError ] = useState(false)
  const isLoading = !memories && !isError
  const [ searchTerm, setSerachTerm ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/memories')
        setAllMemories(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  //* For map content-------------------
  const [viewport, setViewport] = useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '100vw',
    height: '100vh',
    zoom: 6,

  })

  const [ selectedMemory, setSelectedMemory ] = useState(null)

  //* search functions
  const handleInput = (e) => {
    setSerachTerm(e.target.value)
  }

  //* had a button to clear here as well but I think it looks really ugly, uncomment function and button to see
  //* might solve with styling, but also don't think we stirctly need it?
  // const handleClear = () => {
  //   setSerachTerm('')
  // }

  const filteredMemories =  memories?.filter((memory) => {
    return (
      memory.title.toLowerCase().includes(searchTerm) ||
      memory.location.toLowerCase().includes(searchTerm) ||
      memory.date.includes(searchTerm) ||
      memory.tags.includes(searchTerm)
    
    )
  })



  return (
    <>
      { isLoading && <p>...loading</p>}
      <input
        className="input"
        type="text"
        placeholder="Search memories.."
        onChange={handleInput}
        value={searchTerm}
      />
      {/* <button className="button" onClick={handleClear}>
        Clear
      </button> */}
      <div>
        <ReactMapGl {...viewport} 
          mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
          mapStyle="mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i"
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
        >

          { filteredMemories && filteredMemories.map(memory => 
            <Marker key={memory.name} latitude={Number(memory.latitude)} longitude={Number(memory.longitude)}>

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
            <Popup latitude={Number(selectedMemory.latitude)} longitude={Number(selectedMemory.longitude)}
              // onClose={() => {
              //   setSelectedMemory(null) }}
            >
              <div>
                <h2>{selectedMemory.title}</h2>
                <p>{selectedMemory.location}</p>

                <Link to={`/memories/${selectedMemory._id}`}>
                  <img width="400px" height="400px" src={selectedMemory.image} alt={selectedMemory.location} />

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