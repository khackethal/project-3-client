// {integrate api and convert adress and then send to api}
import React from 'react'
import { useHistory } from 'react-router'
import { useForm } from '../../hooks/useForm'
import { createMemory } from '../../lib/api'

function NewMemory() {

  const history = useHistory()

  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    title: '',
    location: '',
    longitude: '',
    latitude: '',
    date: '',
    imageUrl: '',
    description: '',
    tags: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createMemory(formdata)
      console.log('res.data: ', res.data)
      history.push(`/memories/${res.data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box is-black"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className={`input ${formErrors.title ? 'is-danger' : ''}`}
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={formdata.title}
                />
              </div>
              {formErrors.title && <p className="help is-danger">{formErrors.title}</p>}
            </div>


            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <input
                  className={`input ${formErrors.location ? 'is-danger' : ''}`}
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                  value={formdata.location}
                />
              </div>
              {formErrors.location && (
                <p className="help is-danger">{formErrors.location}</p>
              )}
            </div>



            <div className="field">
              <label className="label">Image URL</label>
              <div className="control">
                <input
                  className={`input ${formErrors.image ? 'is-danger' : ''}`}
                  placeholder="Image URL"
                  name="image"
                  onChange={handleChange}
                  value={formdata.image}
                />
              </div>
              {formErrors.image && <p className="help is-danger">{formErrors.image}</p>}
            </div>

            <div className="field">
              <label className="label">Image Upload</label>
              <div className="control">
{/* image upload field */}


              </div>
              {formErrors.image && <p className="help is-danger">{formErrors.image}</p>}
            </div>




            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className={`textarea ${formErrors.tastingNotes ? 'is-danger' : ''}`}
                  placeholder="Describe the memory...."
                  name="description"
                  onChange={handleChange}
                  value={formdata.description}
                />
              </div>
              {formErrors.description && (
                <p className="help is-danger">{formErrors.description}</p>
              )}
            </div>



            <div className="field">
              <button type="submit" className="button is-warning is-fullwidth">
                Submit Memory
              </button>
            </div>


          </form>
                  


        </div>
      </div>
    </section>
  )

}

export default NewMemory