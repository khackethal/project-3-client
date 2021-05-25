import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Error from '../common/Error'

function AllMemories() {
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


  
  return (
    <>
      <h1>All Memories</h1>
      <div className="container">
        <div className="column is-multiline"></div>
        { isError && <Error />}
        { isLoading && <p>...loading</p>}
        { memories && (memories.map(memory => 
          <div className="card" key={memory.name}>
            <h3>{memory.title}</h3>
            <p>{memory.location}</p>
            <p>{memory.date}</p>

            <Link to={`/memories/${memory._id}`}>
              <img height ="540px" width="810px"  src={memory.imageUrl} alt={memory.name} />
            </Link>

          </div>
        ))}
      </div>
    </>
  )
}


export default AllMemories