// {integrate api and convert adress and then send to api}
import React from 'react'
import { useHistory } from 'react-router'
import { useForm } from '../../hooks/useForm'
// import { createMemory } from '../../lib/api'

function NewMemoryPage() {
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
      const res = await NewMemory(formdata)
      history.push(`/memories/${res.data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <section className="section">
      <div className="contasiner">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box is-inverted"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                className {`input ${formErrors.name ? 'is-danger' : ''}`}
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
            

          </form>
        </div>
      </div>
    </section>
  )

}