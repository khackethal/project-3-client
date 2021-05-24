import React from 'react'
import axios from 'axios'
import Error from '../auth/Error.js'
import { useParams } from 'react-router-dom'


function SingleMemory() {
  const [ memory, setSingleMemory ] = React.useState(null)
  const { id } = useParams()
  const [ isError, setIsError ] = React.useState(false)
  const isLoading = !memory && !isError

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

  console.log(memory)


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
        </>
      )}


    </section>
  )
}

export default SingleMemory