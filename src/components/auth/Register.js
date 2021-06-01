import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm.js'
import { userCheck, registerUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Register() {

  const history = useHistory()

  // * check if email && username are unique
  const [isUniqueId, setIsUniqueId] = React.useState(true)

  // * check password match
  const [isPasswordMatch, setIsPasswordMatch] = React.useState(true)

  // * useform hook
  const { formData, handleChange, formError, setFormError } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleValidity = () => {
    setFormError({ ...formError, email: 'This email is invalid.' })
  }

  const handlePassMatch = async () => {
    if (
      (formData.password !== formData.passwordConfirmation)
      &&
      (formData.passwordConfirmation !== '')
    ) {
      setIsPasswordMatch(false)
      setFormError({ ...formError, passwordConfirmation: 'Passwords do not match.' })
    } else if (formData.password === formData.passwordConfirmation) {
      setIsPasswordMatch(true)
      setFormError({ ...formError, passwordConfirmation: '' })
    }
  }

  const handleUnique = async () => {
    try {
      await userCheck({
        username: formData.username,
        email: formData.email,
      })
      setIsUniqueId(true)
      setFormError({ ...formError, username: '' })
    } catch (err) {
      const errorMessage = err.response.data.errMessage.username
      setIsUniqueId(false)
      setFormError({ ...formError, username: errorMessage })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(e)

    try {
      const res = await registerUser(formData)
      setToken(res.data.token)
      history.push('/memories')
    } catch (err) {
      const errorMessage = err.response.data.errMessage
      console.log('errMessage: ', errorMessage)
      console.log('err.response: ', err.response)
      setFormError({ ...formError, ...errorMessage })
    }
  }

  return (
    <>
      <div className="title is-2 has-text-centered has-background-black has-text-white">register</div>
      <p>{console.log('formError: ', formError)}</p>
      <section className="container">
        <div className="columns is-vcentered">
          <div className="column is-half is-centered">
            <form className="card is-centered is-one-quarter-desktop is-one-third-widescreen is-half-fullhd has-background-info"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className=
                      {`input 
                ${!isUniqueId ? 'is-danger' : ''}
                `}
                    type="text"
                    placeholder="e.g. dreamer666"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleUnique}
                  />
                </div>
                <p className="help is-danger">
                  {!isUniqueId && 'Invalid credentials, try something else.'}
                </p>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className=
                      {`input 
                ${!isUniqueId || formError.username ? 'is-danger' : ''}
                `}
                    type="email"
                    placeholder="Email input"
                    name="email"
                    onChange={handleChange}
                    onInvalid={handleValidity}
                    onBlur={handleUnique}
                  />
                </div>
                <p className="help is-danger">
                  {formError.email}
                </p>

              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${!isPasswordMatch ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="e.g. soulfuldreamyclouds"
                    name="password"
                    onChange={handleChange}
                    onBlur={handlePassMatch}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${!isPasswordMatch ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="e.g. soulfuldreamyclouds"
                    name="passwordConfirmation"
                    onChange={handleChange}
                    onBlur={handlePassMatch}
                  />
                </div>
                <p className="help is-danger">
                  {!isPasswordMatch && 'Passwords not matching'}
                </p>
              </div>

              <button type="submit" className="button is-fullwidth  has-text-white has-background-info-dark">
                Register
              </button>
            </form>
          </div>
          <div className="column is-half">
            <figure className="image">
              <img src="https://imgur.com/DCugnIH.png" />
            </figure>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register