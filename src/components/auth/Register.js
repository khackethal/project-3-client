import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm.js'
import { userCheck, registerUser } from '../../lib/api'

function Register() {

  const history = useHistory()

  // * email format validation field only
  const [isValidEmail, setIsValidEmail] = React.useState(true)

  // *
  const [isUniqueId, setIsUniqueId] = React.useState([true,''])
  const [isPasswordMatch, setIsPasswordMatch] = React.useState(true)

  // * useform hook
  const { formData, handleChange, formError, setFormError } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleValidity = () => {
    setIsValidEmail(false)
  }

  const handlePassMatch = async () => {
    if (formData.password !== formData.passwordConfirmation) {
      setIsPasswordMatch(false)
    } else if (formData.password === formData.passwordConfirmation) {
      setIsPasswordMatch(true)
    }
  }

  const handlEmptyInput = (e) => {
    if (e.target.name) {
      console.log('stuff')
    }
  }

  const handleUnique = async () => {
    try {
      await userCheck({
        username: formData.username,
        email: formData.email,
      })
      setIsUniqueId([true,''])
    } catch (err) {
      const errorMessage = err.response.data.errMessage
      setIsUniqueId([false,errorMessage])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(e)

    try {
      await registerUser(formData)
      history.push('/memories')
    } catch (err) {
      const errorName = err.response.data.errName
      const errorMessage = err.response.data.errMessage
      setFormError([errorName,errorMessage])
    }
  }

  return (
    <>
      <p>{console.log('formError: ', formError)}</p>
      <p>{console.log('type: ', typeof formError)}</p>
      <p>{console.log('length: ', formError.length)}</p>
      <p>{console.log(formError[0] + ' ' + formError[1])}</p>
      <p>{console.log('validity: ', isValidEmail)}</p>
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
                ${!isUniqueId[0] ? 'is-danger' : ''}
                `}
              type="text"
              placeholder="e.g. dreamer666"
              name="username"
              onChange={handleChange}
              onBlur={handleUnique}
            />
          </div>
          <p
            className=
              {`help 
              ${!isUniqueId[0] ? 'is-danger' : ''}
              `}
          >{!isUniqueId[0] && isUniqueId[1]}</p>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className=
                {`input 
                ${!isUniqueId[0] || !isValidEmail ? 'is-danger' : ''}
                `}
              type="email"
              placeholder="Email input"
              name="email"
              onChange={handleChange}
              onInvalid={handleValidity}
              onBlur={handleUnique}
            />
          </div>
          {/* <p className="help is-danger">This email is invalid</p> */}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
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
              className=
                {`input 
                ${!isPasswordMatch
                &&
                'is-danger'}`}
              type="password"
              placeholder="e.g. soulfuldreamyclouds"
              name="passwordConfirmation"
              onChange={handleChange}
              onBlur={handlePassMatch}
            />
          </div>
          {(!isPasswordMatch) && <p className="help is-danger">Passwords not matching</p>}
        </div>

        <button type="submit" className="button is-fullwidth">
          Register
        </button>
      </form>
    </>
  )
}

export default Register