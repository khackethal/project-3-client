import React from 'react'
import { useHistory } from 'react-router'

import MapboxSearch from '../mapbox/MapboxSearch'
import ImageUploadField from './ImageUploadField'
import { useForm } from '../../hooks/useForm'
import { createMemory, memoriesPath } from '../../lib/api'


function NewMemory() {

  function formatTagArray(tags) {
    if (typeof tags === 'string') {
      const tagsArray = tags.replace(/[^a-zA-Z0-9]/g, ' ').split(' ')
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
    location: '',
    user: '',
  })

  const handleNestedChange = (e) => {

    const getBoundaryBox = (e) => {
      if (e.bbox) return e.bbox
    }

    handleChange(
      {
        target:
        {
          name: 'location',
          value: {
            ...formData.location,
            userInput: e.place_name,
            coordinates: e.center,
            boundaryBox: getBoundaryBox(e),
            placeType: e.place_type[0],
          },
        },
      })
  }

  const handleTags = (e) => {

    // * reformatting tags
    const newTags = formatTagArray(e.target.value)

    setFormData({
      ...formData,
      tags: newTags,
    })
  }

  const handleDanger = (e) => {

    const emptyField = (e.target.value.length === 0)
    const requiredFields = ['title', 'date', 'description']

    if (requiredFields.includes(e.target.name) && emptyField) {
      setFormError({ ...formError, [e.target.name]: 'Required field.' })
    }

    if (formError.errMessage) {
      setFormError({ ...formError, errMessage: '' })
    }
  }

  const handleUpload = (file) => {
    handleChange({ target: { name: 'image', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createMemory(formData)
      history.push(`${memoriesPath}/${res.data._id}`)
    } catch (err) {
      setFormError({ ...formError, errMessage: err.response.data.errMessage })
    }
  }

  return (
    <div className="new-memory-background">
      <div className="title is-2 has-text-centered has-background-black has-text-white">
        new memory
      </div>
      <section>

        <div className="container">
          <div className="columns is-multiline is-variable is-1-mobile is-0-tablet is-2-desktop is-8-widescreen is-3-fullhd">
            <form
              className="column is-half is-offset-one-sixth box has-background-black"
              onSubmit={handleSubmit}
            >

              <div className="field" htmlFor="title">
                <label className="label has-text-white">Title</label>
                <div className="control">

                  <input
                    className={`input ${formError.title || formError.errMessage ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="e.g. My cherished memory"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleDanger}
                    required
                  />

                </div>

                {formError.title
                  &&
                  <p className="help is-danger">
                    {formError.title}
                  </p>
                }

              </div>

              <div className="field" htmlFor="title">
                <label className="label has-text-white">Where did it take place?</label>
                <div className="control">

                  <input
                    className={`input ${formError.location || formError.errMessage ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Find address on map"
                    name="location"
                    onChange={(e) => {
                      handleNestedChange(e)
                      setFormError({ ...formError, location: '' })
                    }}
                    value={formData.location.userInput || ''}
                    onSubmit={handleDanger}
                    required
                    disabled
                  />

                </div>

                {formError.location
                  &&
                  <p className="help is-danger">
                    {formError.location}
                  </p>
                }

              </div>


              <div className="field" htmlFor="title">
                <label className="label has-text-white">
                  Memory Date
                </label>
                <div className="control">

                  <input
                    className={`input ${formError.date || formError.errMessage ? 'is-danger' : ''}`}
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                  />

                </div>
                {formError.date && <p className="help is-danger">{formError.date}</p>}
              </div>

              <div className="field" htmlFor="title">
                <label className="label has-text-white">Description</label>
                <div className="control">

                  <input
                    className={`input ${formError.description || formError.errMessage ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="e.g. Roses are red, violets are blue"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleDanger}
                    required
                  />

                </div>
                
                {formError.description
                  &&
                  <p className="help is-danger">
                    {formError.description}
                  </p>
                }
                
              </div>

              <div className="field" htmlFor="title">
                <label className="label has-text-white">Tags</label>
                <div className="control">

                  <input
                    className={`input ${formError.errMessage ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="e.g. crazy, miraculous, romantic"
                    name="tags"
                    onChange={handleTags}
                  />

                </div>
              </div>

              <div>
                <ImageUploadField onUpload={handleUpload} />
              </div>

              <div className="field">
                <button type="submit" className="button is-warning is-fullwidth">
                  Send Memory
                </button>
              </div>

              <figure>
                <img className="image is-256x256" src="https://imgur.com/bWMKvl8.png" />
              </figure>
            </form>

            <div className="column is-half">
              {formError.errMessage && <p className="help is-danger">{formError.errMessage}</p>}
              <MapboxSearch onResult={handleNestedChange} />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default NewMemory
