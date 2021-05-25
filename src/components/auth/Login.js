import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { loginUser } from '../../lib/api'

function Login() {

  const history = useHistory()
  const { formData, handleChange, formError, setFormError } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await loginUser(formData)
      // history.push('/memories')
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
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" placeholder="e.g. alinic@bossman.com" />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="e.g. famgrapejuiceismyfav" />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login