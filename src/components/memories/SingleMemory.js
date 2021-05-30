import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom' 
import ReactMapGl, { Marker } from 'react-map-gl'

import Error from '../common/Error'
import { baseUrl, memoriesPath, commentPath, headers } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import { publicToken, mapboxStyleUrl } from '../../lib/mapbox'
import { subSetViewport } from '../../lib/mapbox'

function SingleMemory() {

  const { id } = useParams()

  const [ memory, setMemory ] = React.useState(null)
  const [ isError, setIsError ] = React.useState(false)
  const [ hasComments, setHasComments ] = React.useState(false)

  const isLoading = !memory && !isError

  //* for comments/error state
  const [ formComment, setFormComment ] = React.useState({
    text: '',
  })
  const [formError, setFormError] = React.useState(formComment)

  //* For map content-------------------
  const [ viewport, setViewport ] = React.useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '500px',
    height: '500px',
    zoom: 14,
  })

  //* For page content render
  React.useEffect( () => {

    const getData = async () => {

      try {

        const res = await axios.get(`${baseUrl}${memoriesPath}/${id}`)
        setMemory(res.data)

        // * setting zoom value depending on stored values
        const [ [centerLongitude, centerLatitude], zoomValue ] = subSetViewport(res.data)
        
        setViewport({
          ...viewport,
          // ! I've remove Number because the model currently validates number so we wouln't have otherwise
          longitude: (centerLongitude),
          latitude: (centerLatitude),
          zoom: zoomValue,
        })

      } catch (err) {
        setIsError(true)
      }

    }

    getData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[hasComments])


  const handleChange = (e) => {
    setFormComment({ ...formComment, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    // * to prevent empty comments submissions
    if (formComment.text) {
      try {

        await axios.post(
          `${baseUrl}${memoriesPath}/${id}/${commentPath}`,
          formComment, 
          headers()
        )

        // * reset comment input
        e.target.value = ''

        // * force useEffect render on comment submission
        setHasComments(!hasComments)

        // * reset comment forms to blank
        setFormComment({ ...formComment, text: '' })
        setFormError('')
  
      } catch (err) {
        setFormError({ ...formError, text: err.response.data.errMessage })
      }

    } else {
      return
    }
  }


  //* Delete a comment 
  const handleDelete = async (e) => {

    e.preventDefault()

    try {

      await axios.delete(
        `${baseUrl}${memoriesPath}/${id}/${commentPath}/${e.target.name}`, 
        headers()
      )

      setHasComments(!hasComments)
      setFormError({ ...formComment, text: '' })

      // ! I don't think it's necessary to blank out the comment form when a comment gets deleted,
      // ! say if the user was typing a comment and realised wanted to delete a previous one 
      // ! which are are currently redrafting now. It would mess it up.
      // setFormComment({ ...formComment, text: '' })
  
    } catch (err) {
      setFormError({ ...formError, text: err.response.data.errMessage })
    }

  }




  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>

          {/* // version 2 - basic styling added */}
          <div className="card">    
            <div className="columns">
              <div className="column">
                <p className="column">{memory.title}</p>
                <h2 className="column">{memory.location.userInput}</h2>
                <div className="column is-60">{memory.description}</div>
                <div className="columns is-mobile">

                  <div className="column">
                    <p className="bd-notification is-info"> <img height ="540px" width="810px"  src={memory.image} alt={memory.title} /></p>
                  </div>

                  <div className="column">
                    <div className="bd-notification is-info">

                      <ReactMapGl {...viewport} 
                        mapboxApiAccessToken={publicToken}
                        mapStyle={mapboxStyleUrl}
                        onViewportChange={viewport => {
                          setViewport(viewport)
                        }}
                      >

                        <Marker
                          latitude={memory.location.coordinates[1]}
                          longitude={memory.location.coordinates[0]}
                        >
                          <div>
                            <img
                              height="40px"
                              width="40px"
                              src="https://i.imgur.com/6IzPeVa.png"
                            />
                          </div>
                        </Marker>

                      </ReactMapGl>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
          <div className="container">
            <div className="columns">
              
              <form
                className="column is-half is-offset-one-quarter box"
                onSubmit={handleSubmit}
                onKeyUp={(
                  (e) => {
                    if (e.key === 'Enter') handleSubmit
                  }
                )}
              >

                <div className="field" htmlFor="text">
                  <label className="label">Comments</label>
                  <div className="control">

                    <input
                      className={`input ${formError.text ? 'is-danger' : ''}`}
                      placeholder="Type your comments here.."
                      name="text"
                      value={formComment.text || ''}
                      onChange={handleChange}
                    />

                  </div>
                  {formError.text && <p className="help is-danger">Oops, something went wrong. Check if you are logged in.</p>}
                </div>

                <div className="field">
                  <button
                    type="submit"
                    className="button is-info is-fullwidth"
                  >
                    Submit comment
                  </button>
                </div>
                
              </form>
            </div>
          </div>

          <div className="comments">
            {memory.comments && memory.comments.map( comment => {

              <div key={comment._id}>

                <p>{comment.text}</p>

                { isOwner(comment.user) &&
                  <button
                    name={comment._id}
                    onClick={handleDelete}
                    className=" button is-info is-small is outline"
                  >
                    Delete comment
                  </button>
                }

              </div>
            }
            )}
          </div>

        </>      )}

    </section>
  )
}

export default SingleMemory