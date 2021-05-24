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
        const result = await axios.get(`api/memories/${id}`)
        setSingleMemory(result.data)

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[])


  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>
          <h1>{memory.name}</h1>
          <h2>{memory.area}</h2>
          <p>{memory.description}</p>
          <img height ="540px" width="810px"  src={memory.image} alt={memory.name} />
        </>
      )}



    </section>
  )
}

export default SingleMemory