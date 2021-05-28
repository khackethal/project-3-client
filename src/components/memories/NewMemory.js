// {integrate api and convert adress and then send to api}
import React from 'react'
import { useHistory } from 'react-router'
import { useForm } from '../../hooks/useForm'
import { createMemory, baseUrl, memoriesPath, headers } from '../../lib/api'
import axios from 'axios'
import ImageUploadField from './ImageUploadField'



function NewMemory() {

  const history = useHistory()
  const [formData, setFormData] = React.useState({
    title: '',
    image: 'sample image',
    description: '',
    tags: '',
  })

  const [formError, setFormError] = React.useState(formData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpload = (files) => {
    handleChange({ target: { name: 'image', value: files } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      // const res = await createMemory(formData)

      const res = await axios.post(`${baseUrl}${memoriesPath}`, formData, { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGFmZTAxYjhlZWZjMTUyMTBjNGQ2MTAiLCJpYXQiOjE2MjIxMzg5MDcsImV4cCI6MTYyMjE4MjEwN30.i2cGwt_PdnKxno16BYOP_LtasWRwgblsuigP_AeV2aA' }, 
      })
    
      

      console.log(res.data)
      history.push(`${baseUrl}${memoriesPath}/${res.data._id}`)
    } catch (err) {
      console.log(err)
      // console.log(err.response.data.errMessage)
      // setFormError(err.res.data.errors)   
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
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>
              {formError.title && <p className="help is-danger">{formError.title}</p>}
            </div>


            <div className="field" htmlFor="location">
              <label className="label">Location</label>
              <div className="control">
                <input
                  className={`input ${formError.location ? 'is-danger' : ''}`}
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                  value={formData.location}
                />
              </div>
              {formError.location && (
                <p className="help is-danger">{formError.location}</p>
              )}
            </div>



            {/* <div className="field">
              <label className="label">Image URL</label>
              <div className="control">
                <input
                  className={`input ${formError.imageUrl ? 'is-danger' : ''}`}
                  placeholder="Image URL"
                  name="imageUrl"
                  onChange={handleChange}
                  value={formData.imageUrl}
                />
              </div>
              {formError.imageUrl && <p className="help is-danger">{formError.imageUrl}</p>}
            </div> */}

            <div className="field">
              <ImageUploadField
                onUpload={handleUpload}
              />
            
              {/* 
            <div className="field" htmlFor="imageUrl">
              <label className="label">Image Upload</label>
              <div className="control">
                <input
                  name="file" type="file"
                  className="file-upload" data-cloudinary-field="image_id"
                  data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
                />
              </div> */}
              {formError.image && <p className="help is-danger">{formError.image}</p>}
            </div>




            <div className="field" htmlFor="description">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className={`textarea ${formError.desription ? 'is-danger' : ''}`}
                  placeholder="Describe the memory...."
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
              {formError.description && (
                <p className="help is-danger">{formError.description}</p>
              )}
            </div>



            {/* <div className="field" htmlFor="date">
              <label className="label">Date</label>
              <div className="control">
                <textarea
                  className={`input ${formError.date ? 'is-danger' : ''}`}
                  placeholder="Date"
                  name="date"
                  onChange={handleChange}
                  value={formData.date}
                />
              </div>
              {formError.date && (
                <p className="help is-danger">{formError.date}</p>
              )}
            </div> */}



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


// function showUploadWidget() {
  //   cloudinary.openUploadWidget({
  //     cloudName: "dhtnqavlg",
  //     uploadPreset: "dv9geidh",
  //     sources: [
  //       "url",
  //       "image_search",
  //       "facebook",
  //       "instagram",
  //       "camera",
  //       "local"
  //     ],
  //     googleApiKey: "<image_search_google_api_key>",
  //     showAdvancedOptions: true,
  //     cropping: true,
  //     multiple: false,
  //     defaultSource: "local",
  //     styles: {
  //       palette: {
  //         window: "#FFFFFF",
  //         sourceBg: "#F7F3F3",
  //         windowBorder: "#C5C0B2",
  //         tabIcon: "#BB3107",
  //         inactiveTabIcon: "#8C6D2F",
  //         menuIcons: "#E2D5B0",
  //         link: "#E2D5B0",
  //         action: "#FFFFFF",
  //         inProgress: "#00ffcc",
  //         complete: "#33ff00",
  //         error: "#cc3333",
  //         textDark: "#790707",
  //         textLight: "#2F2020"
  //       },
  //       fonts: {
  //         default: null,
  //         ''IBM Plex Sans', sans-serif': {
  //           url: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans',
  //           active: true
  //         }
  //       }
  //     }
  //   },
  //   (err, info) => {
  //     if (!err) {
  //       console.log('Upload Widget event - ', info)
  //     }
  //   })
  // }