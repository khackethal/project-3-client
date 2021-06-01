import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Error from '../common/Error'
import { baseUrl, memoriesPath } from '../../lib/api'
function AllMemories() {

  const [ memories, setMemories ] = React.useState(null)
  const [ isError, setIsError ] = React.useState(false)
  const [ searchTerm, setSearchTerm ] = React.useState('')
  const isLoading = !memories && !isError

  
  React.useEffect(() => {

    const getData = async () => {

      try { 

        const res = await axios.get(`${baseUrl}${memoriesPath}`)
        setMemories(res.data)

      } catch (err) {
        setIsError(true)
      }

    }

    getData()

  },[])

  //* search functions
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

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
      <h1>All Memories</h1>
      <div className="container">
        <div className="column is-multiline"></div>
        { isError && <Error />}
        { isLoading && <p>...loading</p>}

        <p>Search</p>

        <input
          className="input"
          type="text"
          placeholder="Search memories.."
          onChange={handleInput}
          value={searchTerm}
        />

        <button className="button is-link is-small is-outlined" onClick={handleClear}>
          Clear
        </button>

        { filteredMemories && (filteredMemories.map(memory => 
          <div className="card" key={memory._id}>

            <h3>{memory.title}</h3>
            <p>{memory.location.userInput}</p>
            <p>{memory.date}</p>

            <Link to={`/memories/${memory._id}`}>
              <img height ="540px" width="810px"  src={memory.image} alt={memory.title} />
            </Link>

          </div>
        ))}

      </div>
    </>
  )
}
export default AllMemories