import React from 'react'
import { useHistory } from 'react-router'

import ImageUpload from './ImageUpload'
import { useForm } from '../../hooks/useForm'
import { createMemory, memoriesPath } from '../../lib/api'
import MapGeocoder from '../mapbox/MapGeocoder'

function NewMemory() {

  function formatTagArray(tags) {
    if (typeof tags === 'string') {
      const tagsArray = tags.replace(/[^a-zA-Z0-9]/g,' ').split(' ')
      const sanitisedTagsArray = tagsArray.filter(tag => tag !== '')
      return sanitisedTagsArray
    }
    return tags
  }

  const history = useHistory()

  const { formData, setFormData, handleChange, formError, setFormError } = useForm({
    title: '',
    date: '',
    image: '',
    description: '',
    tags: [],
    location: {
      userInput: '',
      coordinates: [0,0],
      boundaryBox: [0,0,0,0],
    },
    user: '',
  })

  const handleBlur = (e) => {

    const emptyField = (e.target.value.length === 0)
    const requiredFields = ['title', 'date', 'description']

    if (requiredFields.includes(e.target.name) && emptyField) {
      setFormError({ ...formError, [e.target.name]: 'Required field.' })
    }
  }

  const handleImageUpload = (files) => {
    handleChange({ target: { name: 'image', value: files } })
  }

  const handleResult = (e) => {
    console.log('handleResult: ')
    console.log(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // * reformatting tags
    const newTags = formatTagArray(formData.tags)

    // * Get userId
    // const

    setFormData({
      ...formData,
      tags: newTags,
      location: {
        // userInput: 'set address here'
        // coordinates: [longitude,latitude],
      },
    })
    
    try {

      const res = await createMemory(formData)
      console.log('res.data: ', res.data)

      history.push(`${memoriesPath}/${res.data._id}`)

    } catch (err) {
      console.log('err: ', err)
      console.log('err.response.data.errMessage: ', err.response.data.errMessage)

      setFormError({ ...formError, errorMessage: err.response.data.errMessage })   
    }
  }







  return (
    <section className="section">

      <>{console.log('formData: ', formData)}</>
      <>{console.log('formError: ', formError)}</>

      <div className="container">
        <div className="columns">

          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >

            <div className="field" htmlFor="title">
              <label className="label">Title</label>
              <div className="control">

                <input
                  className={`input ${formError.title ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="e.g. My cherished memory"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

              </div>
              {formError.title && <p className="help is-danger">{formError.title}</p>}
            </div>

            <div className="field" htmlFor="title">
              <label className="label">Where did it happen?</label>
              <div className="control">

                <input
                  className={`input ${formError.location ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Find address on map"
                  name="address"
                  onChange={handleChange}
                  required
                  disabled
                />

              </div>
              {formError.title && <p className="help is-danger">{formError.title}</p>}
            </div>


            <div className="field" htmlFor="title">
              <label className="label">Memory Date</label>
              <div className="control">

                <input
                  className={`input ${formError.date ? 'is-danger' : ''}`}
                  type="date"
                  name="date"
                  onChange={handleChange}
                  required
                />

              </div>
              {formError.date && <p className="help is-danger">{formError.date}</p>}
            </div>

            <div className="field" htmlFor="title">
              <label className="label">Description</label>
              <div className="control">

                <input
                  className={`input ${formError.description ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="e.g. Roses are red, violets are blue"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

              </div>
              {formError.description && <p className="help is-danger">{formError.description}</p>}
            </div>

            <div className="field" htmlFor="title">
              <label className="label">Tags</label>
              <div className="control">

                <input
                  className="input"
                  type="text"
                  placeholder="e.g. dreamy, poop, romantic"
                  name="tags"
                  onChange={handleChange}
                />

              </div>
            </div>

            <div>
              <ImageUpload upLoad={handleImageUpload} />
            </div>

            <div className="field">
              <button type="submit" className="button is-warning is-fullwidth">
                Send Memory
              </button>
            </div>

            <MapGeocoder NewMemoryCallback={handleResult} />

          </form>

        </div>
      </div>
    </section>
  )
}

export default NewMemory