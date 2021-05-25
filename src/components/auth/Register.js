import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm.js'
import { registerUser } from '../../lib/api'

function Register() {

  const history = useHistory()
  // const [isEmpty, setIsEmpty] = React.useState(true)
  const { formData, handleChange, formError, setFormError } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleValidity = () => {
    console.log('click')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      history.push('/memories')
    } catch (err) {
      const errorName = err.response.data.name
      const errorMessage = err.response.data.message
      setFormError([errorName,errorMessage])
    }
  }

  return (
    <>
      <form
        className="column is-half is-offset-one-quarter"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className=
                {`input 
                ${formError[0] === 'NotUnique' ? 'is-danger' : ''}
                `}
              type="text"
              placeholder="e.g. dreamer666"
              name="username"
              onChange={handleChange}
            />
          </div>
          <p
            className=
              {`help 
              ${formError[0] === 'NotUnique' ? 'is-danger' : ''}
              `}
          >{formError[1]}</p>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className=
                {`input 
                ${formError[0] === 'NotUnique' ? 'is-danger' : ''}
                `}
              type="email"
              placeholder="Email input"
              name="email"
              // onChange={handleSubmit}
              onChange={handleValidity}
            />
          </div>
          {/* <p className="help is-danger">This email is invalid</p> */}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className=
                {`input 
                ${ (formData.password === '') || (formError[0] === 'NoMatch') ? 'is-danger' : ''}
                `}
              type="password"
              placeholder="e.g. soulfuldreamyclouds"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password Confirmation</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className=
                {`input 
                ${formData.password === '' || (formError[0] === 'NoMatch')
                &&
                'is-danger'}`}
              type="password"
              placeholder="e.g. soulfuldreamyclouds"
              name="passwordConfirmation"
              onChange={handleChange}
            />
          </div>
          {(formError[0] === 'NoMatch') ?
            <p className="help is-danger">Passwords not matching</p>
            :
            ''
          }
        </div>

        <button type="submit" className="button is-fullwidth">
          Register
        </button>
      </form>
    </>
  )
}

export default Register